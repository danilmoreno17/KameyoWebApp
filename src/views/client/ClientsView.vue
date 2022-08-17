<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxDataGrid
            id="dataGridClients"
            :data-source="dataSource"
            key-expr="id"
            :show-borders="true"
            @editorPreparing="onEditorPreparing"
            @exporting="onExporting"
          >
            <DxHeaderFilter :visible="true" />
            <DxGroupPanel :visible="true" />
            <DxGrouping :auto-expand-all="true" />
            <DxExport :enabled="true" :allow-export-selected-data="true" />
            <DxSelection mode="multiple" />
            <DxSearchPanel :visible="true" :width="240" placeholder="Search..." />
            <DxFilterRow :visible="true" />
            <DxPaging :page-size="10" enabled="true" />
            <DxScrolling column-rendering-mode="virtual" />
            <DxPager
              :visible="true"
              :allowed-page-sizes="pageSizes"
              :display-mode="displayMode"
              :show-navigation-buttons="showNavButtons"
            />
            <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup">
              <DxPopup :show-title="true" :width="700" :height="525" title="Client Info" />
              <DxForm>
                <DxItem :col-count="1" :col-span="2" item-type="group">
                  <DxItem data-field="name" />
                  <DxItem data-field="numberId" />
                  <DxItem data-field="address" />
                  <DxItem data-field="phone" />
                  <DxItem data-field="deadlinebilling" />
                  <DxItem data-field="costHourMen" />
                </DxItem>

                <DxItem :col-count="2" :col-span="2" item-type="group" caption="Others">
                  <DxItem data-field="subsidiaryId" />
                  <DxItem data-field="catalogTypeId" />
                  <DxItem data-field="catalogRegionCountryId" />
                  <DxItem data-field="catalogRegionStateId" />
                  <DxItem data-field="catalogRegionCityId" />
                  <DxItem data-field="catalogIndustryTypeId" />
                  <DxItem data-field="catalogIndustrySubTypeId" />
                  <DxItem data-field="catalogCurrencyId" />
                </DxItem>
              </DxForm>
            </DxEditing>

            <DxColumn :width="150" data-field="numberId" caption="Numero de Iden." />
            <DxColumn :width="150" data-field="name" caption="Nombre" cell-template="cell-link-template">
              <DxRequiredRule />
              <DxHeaderFilter :allow-search="true" />
            </DxColumn>
            <DxColumn :width="0" data-field="address" caption="Direccion" />
            <DxColumn :width="0" data-field="deadlinebilling" data-type="number" caption="Fecha Limite de Facturacion">
              <DxRangeRule :max="maxDay" :min="minDay" message="El numero debe estar comprendido entre 0 - 30." />
            </DxColumn>
            <DxColumn
              :width="150"
              data-field="costHourMen"
              data-type="number"
              format="currency"
              caption="Costo Hora"
            />
            <DxColumn :width="0" data-field="phone" data-type="tel" caption="Telefono" />

            <DxColumn :width="150" data-field="subsidiaryId" caption="Filial">
              <DxLookup :data-source="subsidiary" value-expr="id" display-expr="name" />
            </DxColumn>

            <DxColumn :width="150" data-field="catalogTypeId" caption="Tipo de Iden.">
              <DxLookup :data-source="catalog" value-expr="id" display-expr="value" />
            </DxColumn>

            <DxColumn
              :width="150"
              :set-cell-value="setCountryValue"
              data-type="string"
              data-field="catalogRegionCountryId"
              caption="Pais"
            >
              <DxLookup :data-source="country" value-expr="id" display-expr="value" />
              <DxHeaderFilter :allow-search="true" />
            </DxColumn>

            <DxColumn
              :width="0"
              :set-cell-value="setStateValue"
              data-field="catalogRegionStateId"
              data-type="string"
              caption="Estado"
            >
              <DxLookup :data-source="getFilteredStates" value-expr="id" display-expr="value" />

              <DxHeaderFilter :allow-search="true" />
            </DxColumn>

            <DxColumn :width="0" data-field="catalogRegionCityId" caption="Ciudad">
              <DxLookup :data-source="getFilteredCities" value-expr="id" display-expr="value" />

              <DxHeaderFilter :allow-search="true" />
            </DxColumn>

            <DxColumn :width="0" data-field="catalogIndustryTypeId" caption="Tipo de Industria">
              <DxLookup :data-source="industrytype" value-expr="id" display-expr="value" />
              <DxHeaderFilter :allow-search="true" />
            </DxColumn>

            <DxColumn :width="0" data-field="catalogIndustrySubTypeId" caption="Tipo de SubIndustria">
              <DxLookup :data-source="industrysubtype" value-expr="id" display-expr="value" />
              <DxHeaderFilter :allow-search="true" />
            </DxColumn>

            <DxColumn :width="120" data-field="catalogCurrencyId" caption="Moneda">
              <DxLookup :data-source="currency" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxMasterDetail :enabled="true" template="masterDetailClient" />
            <template #masterDetailClient="{ data: client }">
              <DetailClient :template-data="client" />
            </template>

            <template #cell-link-template="{ data }">
              <cellLink
                :cell-data="data"
                :routePath="{
                  name: 'clientView',
                  params: { id: data.data.id },
                }"
              />
            </template>
          </DxDataGrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  DxDataGrid,
  DxScrolling,
  DxPaging,
  DxEditing,
  DxPager,
  DxPopup,
  DxForm,
  DxColumn,
  DxLookup,
  DxFilterRow,
  DxHeaderFilter,
  DxSearchPanel,
  DxMasterDetail,
  DxRequiredRule,
  DxExport,
  DxSelection,
  DxGroupPanel,
  DxGrouping,
  DxRangeRule,
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";
import BreadCrumb from "@/components/BreadCrumb.vue";
import DetailClient from "../contact/ContactDetailTemplate.vue";
import CustomStore from "devextreme/data/custom_store";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");
const customerRepository = RepositoryFactory.get("customers");
const subsidiaryRepository = RepositoryFactory.get("subsidiaries");

import cellLink from "@/components/DataGrid/CellLinkTemplate.vue";

import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

const countries = await catalogRepository.Get("NAME", "COUNTRIES");
const states = await catalogRepository.Get("NAME", "STATES");
const cities = await catalogRepository.Get("NAME", "CITY");

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "ClientsView",
  components: {
    BreadCrumb,
    DxDataGrid,
    DxScrolling,
    DxPaging,
    DxPager,
    DxEditing,
    DxPopup,
    DxForm,
    DxItem,
    DxColumn,
    DxLookup,
    DxFilterRow,
    DxHeaderFilter,
    DxSearchPanel,
    DxMasterDetail,
    cellLink,
    DetailClient,
    DxRequiredRule,
    DxExport,
    DxSelection,
    DxGroupPanel,
    DxGrouping,
    DxRangeRule,
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
          return this.getClients(params);
        },
        insert: (values) => {
          return this.createClient(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateClient(values);
        },
        remove: (key) => {
          return this.deleteClient(key);
        },
      }),
      country: countries.data.data,
      state: states.data.data,
      city: cities.data.data,
      industrytype: {},
      industrysubtype: {},
      currency: {},
      subsidiary: {},
      catalog: {},
      setCountryValue(rowData, value) {
        rowData.catalogRegionStateId = null;
        rowData.catalogRegionCityId = null;
        this.defaultSetCellValue(rowData, value);
      },
      setStateValue(rowData, value) {
        rowData.catalogRegionCityId = null;
        this.defaultSetCellValue(rowData, value);
      },
      minDay: 1,
      maxDay: 31,
    };
  },
  methods: {
    onEditorPreparing(e) {
      if (e.parentType === "dataRow" && e.dataField === "catalogRegionCountryId") {
        //e.editorOptions.disabled = typeof e.row.data.catalogRegionCountryId !== "string";
      }
    },
    getClients: async function (params) {
      const { data } = await customerRepository.GetWithFilter(params);
      return data.data;
    },
    createClient: async function (client) {
      const { data } = await customerRepository.Create(client);
      return data;
    },
    updateClient: async function (client) {
      const { data } = await customerRepository.Update(client);
      return data;
    },
    deleteClient: async function (id) {
      const { data } = await customerRepository.Delete(id);
      return data;
    },
    getIndustryTpes: async function () {
      const { data } = await catalogRepository.Get("NAME", "INDUSTRYTYPE");
      this.industrytype = data.data;
    },
    getIndustrySubtypes: async function () {
      const { data } = await catalogRepository.Get("NAME", "INDUSTRYSUBTYPE");
      this.industrysubtype = data.data;
    },
    getCurrencies: async function () {
      const { data } = await catalogRepository.Get("NAME", "CURRENCY");
      this.currency = data.data;
    },
    getSubsidiaries: async function () {
      const { data } = await subsidiaryRepository.GetWithPagination({});
      this.subsidiary = data.data;
    },
    getCatalogs: async function () {
      const { data } = await catalogRepository.Get("NAME", "IDENTIFICATIONTYPE");
      this.catalog = data.data;
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
      const worksheet = workbook.addWorksheet("Clientes");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Clientes.xlsx");
        });
      });
      e.cancel = true;
    },
  },
  async created() {
    await this.getIndustryTpes()
      .then(() => this.getIndustrySubtypes())
      .then(() => this.getCurrencies())
      .then(() => this.getSubsidiaries())
      .then(() => this.getCatalogs());
  },
};
</script>

<style>
#dataGridClients {
  height: 450px;
  width: 100%;
  padding-left: 10px;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridClients {
    height: 760px;
  }
}
</style>
