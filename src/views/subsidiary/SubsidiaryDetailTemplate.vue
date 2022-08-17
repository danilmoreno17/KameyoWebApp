<template>
  <div>
    <DxDataGrid
      id="dataGridSubsidiaryTemplate"
      :data-source="dataSource"
      :show-borders="true"
      :repaint-changes-only="true"
      :remote-operations="true"
      key-expr="id"
      @editorPreparing="onEditorPreparing"
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
          title="Subsidiary Info"
        />
        <DxForm>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxItem data-field="name" />
            <DxItem data-field="catalogTypeId" />
            <DxItem data-field="numberId" />
            <DxItem data-field="companyId" />
          </DxItem>

          <DxItem
            :col-count="2"
            :col-span="2"
            item-type="group"
            caption="Home Address"
          >
            <DxItem data-field="catalogRegionCountryId" />
            <DxItem data-field="catalogRegionStateId" />
            <DxItem data-field="catalogRegionCityId" />
            <DxItem data-field="address" />
          </DxItem>
        </DxForm>
      </DxEditing>

      <DxColumn
        :width="150"
        data-field="numberId"
        data-type="number"
        caption="No. Identificación"
      />

      <DxColumn
        :width="0"
        data-field="catalogTypeId"
        caption="Tipo Identificación"
      >
        <DxLookup
          :data-source="catalogTypes"
          value-expr="id"
          display-expr="value"
        />
      </DxColumn>

      <DxColumn :width="150" data-field="name" caption="Nombre">
        <DxRequiredRule />
      </DxColumn>

      <DxColumn :width="150" data-field="companyId" caption="Empresa">
        <DxRequiredRule />
        <DxLookup :data-source="company" value-expr="id" display-expr="name" />
      </DxColumn>

      <DxColumn
        :width="150"
        :set-cell-value="setCountryValue"
        data-type="string"
        data-field="catalogRegionCountryId"
        caption="País"
      >
        <DxLookup :data-source="country" value-expr="id" display-expr="value" />
      </DxColumn>

      <DxColumn
        :width="150"
        :set-cell-value="setStateValue"
        data-field="catalogRegionStateId"
        data-type="string"
        caption="Estado"
      >
        <DxLookup
          :data-source="getFilteredStates"
          value-expr="id"
          display-expr="value"
        />
      </DxColumn>

      <DxColumn
        :width="150"
        data-field="catalogRegionCityId"
        data-type="string"
        caption="Ciudad"
      >
        <DxLookup
          :data-source="getFilteredCities"
          value-expr="id"
          display-expr="value"
        />
      </DxColumn>

      <DxColumn :width="150" data-field="address" caption="Dirección" />
    </DxDataGrid>
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

import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URLSybsidiary = `${BASE_DOMAIN}/api/Subsidiaries`;
const URLCompanies = `${BASE_DOMAIN}/api/Company`;

const countries = await catalogRepository.Get("NAME", "COUNTRIES");
const states = await catalogRepository.Get("NAME", "STATES");
const cities = await catalogRepository.Get("NAME", "CITY");
const catalogTypes = await catalogRepository.Get("NAME", "IDENTIFICATIONTYPE");

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
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
  },
  props: {
    templateData: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  data() {
    return {
      dataSource: new CustomStore({
        key: "id",
        load: (loadOptions) => {
          if (loadOptions.filter) {
            loadOptions.filter.push("and");
            loadOptions.filter.push(["CompanyId", "=", this.templateData.key]);
          } else {
            loadOptions.filter = ["CompanyId", "=", this.templateData.key];
          }

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

          console.log("SubsidiaryDetailTemplate - params -> ", params);

          return this.sendRequest(
            `${URLSybsidiary}/filter`,
            "GET",
            params
          ).then((data) => {
            console.log("data", data);
            return data;
          });
        },
        insert: (values) => {
          return this.sendRequest(`${URLSybsidiary}`, "POST", {
            values: JSON.stringify(values),
          });
        },
        update: (key, values) => {
          values.id = key;
          return this.sendRequest(`${URLSybsidiary}`, "PUT", {
            key,
            values: JSON.stringify(values),
          });
        },
        remove: (key) => {
          return this.sendRequest(`${URLSybsidiary}/${key}`, "DELETE", {});
        },
        byKey: (key) => {
          return this.sendRequest(`${URLSybsidiary}`, "GET", {
            Field: "ID",
            Value: key,
          }).then((data) => {
            return data;
          });
        },
      }),
      country: countries.data.data,
      state: states.data.data,
      city: cities.data.data,
      company: new CustomStore({
        key: "id",
        load: () => {
          return this.sendRequest(`${URLCompanies}/paginated`, "GET", {}).then(
            (data) => {
              return data;
            }
          );
        },
        byKey: (key) => {
          return this.sendRequest(`${URLCompanies}`, "GET", {
            Field: "ID",
            Value: key,
          }).then((data) => {
            return data;
          });
        },
      }),
      catalogTypes: catalogTypes.data.data,
      setCountryValue(rowData, value) {
        this.defaultSetCellValue(rowData, value);
      },
      setStateValue(rowData, value) {
        rowData.catalogRegionCityId = null;
        this.defaultSetCellValue(rowData, value);
      },
    };
  },
  methods: {
    onEditorPreparing(e) {
      if (
        e.parentType === "dataRow" &&
        e.dataField === "catalogRegionCountryId"
      ) {
        //e.editorOptions.disabled = typeof e.row.data.catalogRegionCountryId !== "string";
      }
    },

    async sendRequest(url, method = "GET", data = {}) {
      const params = Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
      if (method === "GET") {
        console.log("params", params);
        const result = await fetch(`${url}?${params}`, {
          method,
        });
        const json = await result.json();
        if (result.ok) return json.data;
        throw json.Message;
      }
      const result_2 = await fetch(url, {
        method,
        body: data.values,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      if (result_2.ok) {
        return result_2.text().then((text) => text && JSON.parse(text));
      }
      const json_1 = await result_2.json();
      throw json_1.Message;
    },

    getFilteredStates: (options) => ({
      store: states.data.data,
      filter: options.data
        ? ["parentId", "=", options.data.catalogRegionCountryId]
        : null,
    }),

    getFilteredCities: (options) => ({
      store: cities.data.data,
      filter: options.data
        ? ["parentId", "=", options.data.catalogRegionStateId]
        : null,
    }),

    getCatalogs: async function (field, value) {
      const { data } = await catalogRepository.Get(field, value);
      return data.data;
    },
  },
};
</script>
<style>
#dataGridSubsidiaryTemplate {
  width: 100%;
}
</style>
