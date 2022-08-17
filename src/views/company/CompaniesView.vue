<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxDataGrid
            id="dataGridCompanies"
            :data-source="dataSource"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
            key-expr="id"
            @editorPreparing="onEditorPreparing"
            @exporting="onExporting"
          >
            <DxHeaderFilter :visible="true" />
            <DxGroupPanel :visible="true" />
            <DxGrouping :auto-expand-all="true" />
            <DxExport :enabled="true" :allow-export-selected-data="true" />
            <DxSelection mode="multiple" />
            <DxSearchPanel
              :visible="true"
              :width="240"
              placeholder="Search..."
            /> 
            <DxFilterRow :visible="true" />
            <DxPaging :page-size="10" enabled="true" />
            <DxScrolling column-rendering-mode="virtual" />
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
              <DxPopup :show-title="true" :width="700" :height="525" title="Información de Compañia" />
              <DxForm>
                <DxItem :col-count="1" :col-span="2" item-type="group">
                  <DxItem data-field="name" />
                  <DxItem data-field="catalogTypeId" />
                  <DxItem data-field="numberId" />
                </DxItem>

                <DxItem :col-count="2" :col-span="2" item-type="group" caption="Otros">
                  <DxItem data-field="catalogRegionCountryId" />
                  <DxItem data-field="catalogRegionStateId" />
                  <DxItem data-field="catalogRegionCityId" />
                  <DxItem data-field="address" />
                </DxItem>
              </DxForm>
            </DxEditing>

            <DxColumn data-field="numberId" data-type="number" caption="Num. Ident." :width="150" />
            <DxColumn data-field="name" caption="Nombre" :width="150">
              <DxHeaderFilter :allow-search="true" />
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="0" data-field="catalogTypeId" caption="Tipo de Identificación">
              <DxLookup :data-source="catalogTypes" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn
              :width="150"
              :set-cell-value="setCountryValue"
              data-type="string"
              data-field="catalogRegionCountryId"
              caption="Países"
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
            <DxColumn :width="0" data-field="address" caption="Dirección" />

            <DxMasterDetail :enabled="true" template="master-detail" />

            <template #master-detail="{ data: company }">
              <SubsidiaryDetail :template-data="company" />
            </template>

            <!--DxColumn data-field="TotalFilial" />
            <DxColumn data-field="TotalUsers" /-->
          </DxDataGrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
import {
  DxDataGrid,
  DxScrolling,
  DxRequiredRule,
  DxPaging,
  DxEditing,
  DxPager,
  DxPopup,
  DxLookup,
  DxForm,
  DxColumn,
  DxFilterRow,
  DxHeaderFilter,
  DxSearchPanel,
  DxMasterDetail,
  DxExport,
  DxSelection,
  DxGroupPanel,
  DxGrouping,
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

import SubsidiaryDetail from "../subsidiary/SubsidiaryDetailTemplate.vue";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");
const companiesRepository = RepositoryFactory.get("companies");

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URLCompanies = `${BASE_DOMAIN}/api/Company`;

const countries = await catalogRepository.Get("NAME", "COUNTRIES");
const states = await catalogRepository.Get("NAME", "STATES");
const cities = await catalogRepository.Get("NAME", "CITY");
//const catalogTypes = await catalogRepository.Get("NAME", "IDENTIFICATIONTYPE");

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "CompaniesView",
  components: {
    BreadCrumb,
    DxDataGrid,
    DxScrolling,
    DxPaging,
    DxPager,
    DxRequiredRule,
    DxEditing,
    DxPopup,
    DxLookup,
    DxForm,
    DxItem,
    DxColumn,
    DxFilterRow,
    DxHeaderFilter,
    DxSearchPanel,
    DxMasterDetail,
    SubsidiaryDetail,
    DxExport,
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
          return this.getCompanies(params);
        },
        insert: (values) => {
          return this.createCompany(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateCompany(values);
        },
        remove: (key) => {
          return this.deleteCompany(key);
        }
      }),
      country: countries.data.data,
      state: states.data.data,
      city: cities.data.data,
      catalogTypes: {},
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
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Empresas");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Empresas.xlsx");
        });
      });
      e.cancel = true;
    },
    getCompanies: async function (params) {
      const { data } = await companiesRepository.GetWithFilter(params);
      return data.data;
    },
    createCompany: async function (company) {
      const { data } = await companiesRepository.Create(company);
      return data;
    },
    updateCompany: async function (company) {
      const { data } = await companiesRepository.Update(company);
      return data;
    },
    deleteCompany: async function (id) {
      const { data } = await companiesRepository.Delete(id);
      return data;
    },
    getIdentificationTypes: async function(){
      const { data } = await catalogRepository.Get("NAME", "IDENTIFICATIONTYPE");
      this.catalogTypes = data.data;
    },
  },
  async created(){
    await this.getIdentificationTypes();
  },
};
</script>

<style>
#dataGridCompanies {
  height: 450px;
  width: 100%;
  padding-left: 10px;
}
/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridCompanies {
    height: 760px;
  }
}
</style>
