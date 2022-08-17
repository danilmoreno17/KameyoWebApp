<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxDataGrid
            id="dataGridContacts"
            :data-source="dataSource"
            :show-borders="true"
            key-expr="id"
            @exporting="onExporting"
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

            <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup">
              <DxPopup :show-title="true" :width="700" :height="525" title="Contact Info" />
              <DxForm>
                <DxItem :col-count="2" :col-span="2" item-type="group">
                  <DxItem data-field="parentId" />
                  <DxItem data-field="customerId" />
                  <DxItem data-field="names" />
                  <DxItem data-field="lastName" />
                  <DxItem data-field="area" />
                  <DxItem data-field="department" />
                  <DxItem data-field="position" />
                  <DxItem data-field="email" />
                  <DxItem data-field="phoneOffice" />
                  <DxItem data-field="phoneOfficeExt" />
                  <DxItem data-field="phoneMobile" />
                </DxItem>
              </DxForm>
            </DxEditing>

            <DxColumn :width="150" data-field="parentId" caption="Jefe">
              <DxLookup :data-source="jefe" value-expr="id" display-expr="names" />
            </DxColumn>
            <DxColumn :width="150" data-field="customerId" caption="Cliente">
              <DxRequiredRule />
              <DxLookup :data-source="cliente" value-expr="id" display-expr="name" />
            </DxColumn>
            <DxColumn :width="150" data-field="names" caption="Nombres">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="150" data-field="lastName" caption="Apellidos" />
            <DxColumn :width="0" data-field="area" caption="Area">
              <DxLookup :data-source="area" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="0" data-field="department" caption="Departamento">
              <DxLookup :data-source="department" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="150" data-field="position" caption="Posicion">
              <DxLookup :data-source="position" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="200" data-field="email" caption="Correo Elect.">
              <DxRequiredRule />
              <DxEmailRule />
            </DxColumn>
            <DxColumn :width="0" data-field="phoneOffice" caption="Telefono">
              <DxRequiredRule />
              <DxPatternRule
                :pattern="pattern"
                message='El número de telefono debe tener el siguiente formato:  "(555) 555-5555" !'
              />
            </DxColumn>
            <DxColumn :width="0" data-field="phoneOfficeExt" caption="Ext." data-type="number" />
            <DxColumn :width="150" data-field="phoneMobile" caption="Movil">
              <DxPatternRule
                :pattern="pattern"
                message='El número de telefono debe tener el siguiente formato:  "(555) 555-5555" !'
              />
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
  DxHeaderFilter,
  DxRequiredRule,
  DxPager,
  DxFilterRow,
  DxPaging,
  DxEmailRule,
  DxEditing,
  DxPopup,
  DxLookup,
  DxForm,
  DxPatternRule,
  DxSearchPanel,
  DxExport,
  DxSelection,
  DxGroupPanel,
  DxGrouping,
} from "devextreme-vue/data-grid";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";

import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogsRepository = RepositoryFactory.get("catalogs");
const contactsRepository = RepositoryFactory.get("contacts");
const customersRepository = RepositoryFactory.get("customers");

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "ContactView",
  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxRequiredRule,
    DxHeaderFilter,
    DxPager,
    DxFilterRow,
    DxPaging,
    DxEditing,
    DxEmailRule,
    DxPopup,
    DxLookup,
    DxForm,
    DxItem,
    DxSearchPanel,
    BreadCrumb,
    DxPatternRule,
    DxExport,
    DxSelection,
    DxGroupPanel,
    DxGrouping,
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

          return this.getContacts(params);
        },
        insert: (values) => {
          return this.createContact(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateContact(values);
        },
        remove: (key) => {
          return this.deleteContact(key);
        },
      }),
      cliente: {},
      jefe: {},
      area: {},
      department: {},
      position: {},
      pattern: /^\(\d{3}\) \d{3}-\d{4}$/i,
    };
  },
  methods: {
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Contactos");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Contactos.xlsx");
        });
      });
      e.cancel = true;
    },
    getContacts: async function (params) {
      const { data } = await contactsRepository.GetWithFilter(params);
      return data.data;
    },
    createContact: async function (contact) {
      const { data } = await contactsRepository.Create(contact);
      return data;
    },
    updateContact: async function (contact) {
      const { data } = await contactsRepository.Update(contact);
      return data;
    },
    deleteContact: async function (id) {
      const { data } = await contactsRepository.Delete(id);
      return data;
    },
    getClients: async function () {
      const { data } = await customersRepository.GetWithPagination({});
      this.cliente = data.data;
    },
    getParentContacts: async function () {
      const { data } = await contactsRepository.Get("PARENTID", "NULL");
      this.jefe = data.data;
    },
    getAreas: async function () {
      const { data } = await catalogsRepository.Get("NAME", "AREA");
      this.area = data.data;
    },
    getDepartments: async function () {
      const { data } = await catalogsRepository.Get("NAME", "DEPARTMEN");
      this.department = data.data;
    },
    getPositions: async function () {
      const { data } = await catalogsRepository.Get("NAME", "POSITION");
      this.position = data.data;
    },
  },
  async created() {
    await this.getClients();
    await this.getParentContacts();
    await this.getAreas();
    await this.getDepartments();
    await this.getPositions();
  },
};
</script>
<style>
#dataGridContacts {
  height: 450px;
  width: 100%;
  padding-left: 10px;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridContacts {
    height: 760px;
  }
}
</style>
