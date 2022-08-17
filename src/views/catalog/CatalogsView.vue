<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxDataGrid
            id="dataGridCatalogs"
            :data-source="dataSource"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
            @exporting="onExporting"
            key-expr="id"
          >
            <DxHeaderFilter :visible="true" />
            <DxGroupPanel :visible="true" />
            <DxGrouping :auto-expand-all="true" />
            <DxExport :enabled="true" :allow-export-selected-data="true" />
            <DxSelection mode="multiple" />
            <DxSearchPanel :visible="true" :width="240" placeholder="Search..." />
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
              <DxPopup :show-title="true" :width="700" :height="525" title="Información del Catálogo" />
              <DxForm>
                <DxItem :col-count="2" :col-span="2" item-type="group">
                  <DxItem data-field="name" />
                  <DxItem data-field="value" />
                  <DxItem data-field="parentId" />
                  <DxItem data-field="description" />
                  <DxItem data-field="order" />
                  <DxItem data-field="isSystemOwner" />
                  <DxItem data-field="status" />
                </DxItem>
              </DxForm>
            </DxEditing>

            <DxColumn :width="150" data-field="name" caption="Nombre">
              <DxRequiredRule />
              <DxLookup :data-source="catalogos" value-expr="name" display-expr="name" />
            </DxColumn>
            <DxColumn :width="150" data-field="parentId" caption="Catálogo Padre">
              <DxLookup :data-source="parents" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="150" data-field="value" caption="Valor">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="200" data-field="description" caption="Descripción"> </DxColumn>

            <DxColumn
              :width="100"
              :set-cell-value="setPositiveNumber"
              data-field="order"
              data-type="number"
              caption="Orden"
            >
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="0" data-field="isSystemOwner" data-type="boolean">
              <DxCheckBox :value="isSystemOwner" />
            </DxColumn>
            <DxColumn
              :width="100"
              :set-cell-value="setPositiveNumber"
              data-field="status"
              data-type="number"
              caption="Estado"
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
  DxHeaderFilter,
  DxSearchPanel,
  DxExport,
  DxSelection,
  DxGroupPanel,
  DxGrouping,
} from "devextreme-vue/data-grid";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");

import { catalogos } from "./tipoCatalogos.js";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "CatalogsView",
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
    DxHeaderFilter,
    DxSearchPanel,
    DxExport,
    DxSelection,
    DxGroupPanel,
    DxGrouping,
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
          return this.getCatalogs(params);
        },
        insert: (values) => {
          this.getCatalogParent();
          return this.createCatalog(values);
        },
        update: (key, values) => {
          values.id = key;
          this.getCatalogParent();
          return this.updateCatalog(values);
        },
        remove: (key) => {
          this.getCatalogParent();
          return this.deleteCatalog(key);
        },
      }),
      parents: {},
      catalogos,
      setPositiveNumber(rowData, value) {
        var intvalue = Math.abs(Math.round(value));
        this.defaultSetCellValue(rowData, intvalue);
      },
    };
  },
  methods: {
    getCatalogs: async function (params) {
      const { data } = await catalogRepository.GetWithFilter(params);
      return data.data;
    },
    createCatalog: async function (subsidiary) {
      const { data } = await catalogRepository.Create(subsidiary);
      return data;
    },
    updateCatalog: async function (subsidiary) {
      const { data } = await catalogRepository.Update(subsidiary);
      return data;
    },
    deleteCatalog: async function (id) {
      const { data } = await catalogRepository.Delete(id);
      return data;
    },
    getCatalogParent: async function () {
      const { data } = await catalogRepository.Get("PARENTID", "NULL");
      this.parents = data.data;
    },
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
    await this.getCatalogParent();
  },
};
</script>

<style>
#dataGridCatalogs {
  height: 450px;
  width: 100%;
  padding-left: 10px;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridCatalogs {
    height: 760px;
  }
}
</style>
