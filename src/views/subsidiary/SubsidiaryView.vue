<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxDataGrid
            id="dataGridSubsidiary"
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
              <DxPopup :show-title="true" :width="700" :height="525" title="Subsidiary Info" />
              <DxForm>
                <DxItem :col-count="1" :col-span="2" item-type="group">
                  <DxItem data-field="name" />
                  <DxItem data-field="catalogTypeId" />
                  <DxItem data-field="numberId" />
                  <DxItem data-field="companyId" />
                  <DxItem data-field="pctPartIndrctCommissions" />
                </DxItem>

                <DxItem :col-count="2" :col-span="2" item-type="group" caption="Home Address">
                  <DxItem data-field="catalogRegionCountryId" />
                  <DxItem data-field="catalogRegionStateId" />
                  <DxItem data-field="catalogRegionCityId" />
                  <DxItem data-field="address" />
                </DxItem>
              </DxForm>
            </DxEditing>

            <DxColumn :width="150" data-field="numberId" data-type="number" caption="No. Identificación" />
            <DxColumn :width="0" data-field="catalogTypeId" caption="Tipo Identificación">
              <DxLookup :data-source="catalogTypes" value-expr="id" display-expr="value" />
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
              <DxLookup :data-source="getFilteredStates" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="150" data-field="catalogRegionCityId" data-type="string" caption="Ciudad">
              <DxLookup :data-source="getFilteredCities" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="150" data-field="address" caption="Dirección" />
            <DxColumn
              :width="300"
              data-field="pctPartIndrctCommissions"
              caption="Porcentaje de Participacion Indirecta"
              data-type="number"
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
const subsidiaryRepository = RepositoryFactory.get("subsidiaries");
const companiesRepository = RepositoryFactory.get("companies");

const countries = await catalogRepository.Get("NAME", "COUNTRIES");
const states = await catalogRepository.Get("NAME", "STATES");
const cities = await catalogRepository.Get("NAME", "CITY");
const catalogTypes = await catalogRepository.Get("NAME", "IDENTIFICATIONTYPE");
const companies = await companiesRepository.GetWithPagination({});

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "SubsidiaryView",
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
          return this.getSubsidiaries(params);
        },
        insert: (values) => {
          return this.createSubsidiary(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateSubsidiary(values);
        },
        remove: (key) => {
          return this.deleteSubsidiary(key);
        },
      }),
      country: countries.data.data,
      state: states.data.data,
      city: cities.data.data,
      company: companies.data.data,
      catalogTypes: catalogTypes.data.data,
      setCountryValue(rowData, value) {
        rowData.catalogRegionStateId = null;
        rowData.catalogRegionCityId = null;
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
      if (e.parentType === "dataRow" && e.dataField === "catalogRegionCountryId") {
        //e.editorOptions.disabled = typeof e.row.data.catalogRegionCountryId !== "string";
      }
    },
    getFilteredStates: (options) => ({
      store: states.data.data,
      filter: options.data ? ["parentId", "=", options.data.catalogRegionCountryId] : null,
    }),
    getFilteredCities: (options) => ({
      store: cities.data.data,
      filter: options.data ? ["parentId", "=", options.data.catalogRegionStateId] : null,
    }),
    getSubsidiaries: async function (params) {
      const { data } = await subsidiaryRepository.GetWithFilter(params);
      return data.data;
    },
    createSubsidiary: async function (subsidiary) {
      const { data } = await subsidiaryRepository.Create(subsidiary);
      return data;
    },
    updateSubsidiary: async function (subsidiary) {
      const { data } = await subsidiaryRepository.Update(subsidiary);
      return data;
    },
    deleteSubsidiary: async function (id) {
      const { data } = await subsidiaryRepository.Delete(id);
      return data;
    },
  },
};
</script>

<style>
#dataGridSubsidiary {
  height: 450px;
  width: 100%;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridSubsidiary {
    height: 760px;
  }
}
</style>
