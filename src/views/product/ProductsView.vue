<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxDataGrid
            id="dataGridProducts"
            :data-source="dataSource"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
            key-expr="id"
          >
            <DxFilterRow :visible="true" />
            <DxScrolling row-rendering-mode="virtual" />
            <DxPaging :page-size="10" />
            <DxPager
              :visible="true"
              :allowed-page-sizes="[10, 20, 50]"
              :display-mode="displayMode"
              :show-page-size-selector="true"
              :show-info="false"
              :show-navigation-buttons="true"
            />
            <DxEditing
              :refresh-mode="full"
              :allow-updating="true"
              :allow-adding="true"
              :allow-deleting="true"
              mode="popup"
            >
              <DxPopup
                :show-title="true"
                :width="700"
                :height="525"
                title="Información del Producto"
              />
              <DxForm>
                <DxItem :col-count="1" :col-span="2" item-type="group">
                  <DxItem data-field="name" />
                  <DxItem data-field="catalogTypeId" />
                  <DxItem data-field="description" />
                  <DxItem data-field="price" />
                </DxItem>
              </DxForm>
            </DxEditing>

            <DxColumn :width="150" data-field="name" caption="Nombre">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn
              :width="150"
              data-field="catalogTypeId"
              caption="Tipo de Producto"
            >
              <DxLookup
                :data-source="catalogTypes"
                value-expr="id"
                display-expr="value"
              />
            </DxColumn>
            <DxColumn
              :width="200"
              data-field="description"
              caption="Descripción"
            >
            </DxColumn>

            <DxColumn
              :width="100"
              data-field="price"
              data-type="number"
              format="currency"
              caption="Precio"
            >
            </DxColumn>
          </DxDataGrid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxRequiredRule,
  DxPager,
  DxPaging,
  DxFilterRow,
  DxEditing,
  DxPopup,
  DxLookup,
  DxForm,
} from "devextreme-vue/data-grid";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URLProducts = `${BASE_DOMAIN}/api/Products`;

const productTypes = await catalogRepository.Get("NAME", "PRODUCTTYPE");

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "ProductsView",
  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPager,
    DxPaging,
    DxEditing,
    DxRequiredRule,
    DxPopup,
    DxLookup,
    DxFilterRow,
    DxForm,
    DxItem,
    BreadCrumb,
  },
  data() {
    return {
      dataSource: new CustomStore({
        key: "id",
        load: (loadOptions) => {
          let params = {};
          [
            "skip",
            "take",
            "requireTotalCount",
            "requireGroupCount",
            "sort",
            "filter",
            "totalSummary",
            "group",
            "groupSummary",
          ].forEach((i) => {
            if (i in loadOptions && isNotEmpty(loadOptions[i])) {
              params[i] = JSON.stringify(loadOptions[i]);
            }
          });
          return this.sendRequest(`${URLProducts}/filter`, "GET", params).then(
            (data) => {
              console.log("data", data);
              return data;
            }
          );
        },
        insert: (values) => {
          return this.sendRequest(`${URLProducts}`, "POST", {
            values: JSON.stringify(values),
          });
        },
        update: (key, values) => {
          values.id = key;
          //console.log("values", values);
          return this.sendRequest(`${URLProducts}`, "PUT", {
            key,
            values: JSON.stringify(values),
          });
        },
        remove: (key) => {
          return this.sendRequest(`${URLProducts}/${key}`, "DELETE", {});
        },
        byKey: (key) => {
          return this.sendRequest(`${URLProducts}`, "GET", {
            Field: "ID",
            Value: key,
          }).then((data) => {
            return data;
            //console.log("data", data);
          });
        },
      }),
      catalogTypes: productTypes.data.data,
      priceFormat: {
        style: "currency",
        currency: "USD",
        useGrouping: true,
        minimumSignificantDigits: 3,
      },
    };
  },

  /*async created() {
    States = this.getCatalogs("NAME", "STATES");
  },*/

  methods: {
    sendRequest(url, method = "GET", data = {}) {
      const params = Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
      if (method === "GET") {
        console.log("params", params);
        return fetch(`${url}?${params}`, {
          method,
        }).then((result) =>
          result.json().then((json) => {
            if (result.ok) return json.data;
            throw json.Message;
          })
        );
      }
      return fetch(url, {
        method,
        body: data.values,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((result) => {
        if (result.ok) {
          return result.text().then((text) => text && JSON.parse(text));
        }
        return result.json().then((json) => {
          throw json.Message;
        });
      });
    },
  },
};
</script>

<style>
#dataGridProducts {
  height: 450px;
  width: 100%;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridProducts {
    height: 760px;
  }
}
</style>
