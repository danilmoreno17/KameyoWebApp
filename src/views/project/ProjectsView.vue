<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxDataGrid
            id="dataGridProject"
            :data-source="dataSource"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
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
            <DxEditing :refresh-mode="full" :allow-adding="true" :allow-deleting="true" mode="popup">
              <DxPopup :show-title="true" :width="700" :height="525" title="Información del Proyecto" />
              <DxForm>
                <DxItem :col-count="2" :col-span="2" item-type="group">
                  <DxItem data-field="name" />
                  <DxItem data-field="subsidiaryId" />
                  <DxItem data-field="customerId" />
                  <DxItem data-field="mainContactId" />
                  <DxItem data-field="description" />
                  <DxItem data-field="catalogProjectTypeId" />
                  <DxItem data-field="catalogProjectCategoryId" />
                  <DxItem data-field="catalogProjectStateId" />
                  <DxItem data-field="costHourMenCustomer" />
                  <DxItem data-field="costHourMenProject" />
                </DxItem>

                <DxItem :col-count="2" :col-span="2" item-type="group" caption="Tiempos del proyecto">
                  <DxItem data-field="startDate" />
                  <DxItem data-field="endDate" />
                  <DxItem data-field="durationHour" />
                  <DxItem data-field="closeDate" />
                </DxItem>
              </DxForm>
            </DxEditing>
            <DxColumn :width="150" data-field="name" caption="Nombre" cell-template="cell-link-template">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="150" data-field="subsidiaryId" caption="Subsidiaria" :set-cell-value="setSubsidiaryValue">
              <DxLookup :data-source="subsidiary" value-expr="id" display-expr="name" />
            </DxColumn>
            <DxColumn :width="150" data-field="customerId" caption="Cliente" :set-cell-value="setCustomerValue">
              <DxLookup :data-source="getFilteredCustomers" value-expr="id" display-expr="name" />
            </DxColumn>
            <DxColumn :width="150" data-field="mainContactId" caption="Contacto Principal">
              <DxLookup :data-source="getFilteredContacts" value-expr="id" display-expr="names" />
            </DxColumn>
            <DxColumn :width="200" data-field="description" caption="Descripción">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="0" data-field="catalogProjectTypeId" caption="Tipo de Proyecto">
              <DxLookup :data-source="projectType" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="0" data-field="catalogProjectCategoryId" caption="Categoria de Proyecto">
              <DxLookup :data-source="projectCategory" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="0" data-field="catalogProjectStateId" caption="Estado de Proyecto">
              <DxLookup :data-source="projectState" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn
              :width="150"
              data-field="startDate"
              caption="Fecha de Inicio"
              data-type="datetime"
              :set-cell-value="setFullDates"
            >
              <DxCustomRule
                :validation-callback="startDateValidation"
                message="La fecha de inicio no puede ser mayor o igual a la fecha de fin."
              />
            </DxColumn>
            <DxColumn
              :width="150"
              data-field="endDate"
              caption="Fecha de Fin"
              data-type="datetime"
              :set-cell-value="setFullDates"
            >
              <DxCustomRule
                :validation-callback="endDateValidation"
                message="La fecha de fin no puede ser menor o igual a la fecha de inicio."
              />
            </DxColumn>
            <DxColumn
              :width="100"
              :allow-editing="false"
              data-field="durationHour"
              caption="Duración"
              data-type="number"
            >
            </DxColumn>
            <DxColumn :width="150" data-field="closeDate" caption="Fecha de Cierre" data-type="datetime">
              <DxCustomRule
                :validation-callback="closeDateValidation"
                message="La fecha de cierre no puede ser menor o igual a la fecha de fin."
              />
            </DxColumn>
            <DxColumn
              :width="0"
              :calculate-cell-value="getCostHourMenCustomer"
              :allow-editing="false"
              data-field="costHourMenCustomer"
              data-type="number"
              format="currency"
              caption="Costo Hora Cliente"
            />
            <DxColumn
              :width="0"
              :set-cell-value="setCostHourMenProject"
              data-field="costHourMenProject" 
              data-type="number"
              format="currency"
              caption="Costo Hora Proyecto"
            />
            <template #cell-link-template="{ data }">
              <cellLink
                :cell-data="data"
                :routePath="{
                  name: 'projectView',
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
  DxColumn,
  DxScrolling,
  DxRequiredRule,
  DxPager,
  DxPaging,
  DxFilterRow,
  DxHeaderFilter,
  DxEditing,
  DxPopup,
  DxLookup,
  DxForm,
  DxExport,
  DxSelection,
  DxGroupPanel,
  DxGrouping,
  DxSearchPanel,
  DxCustomRule,
} from "devextreme-vue/data-grid";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";
import cellLink from "@/components/DataGrid/CellLinkTemplate.vue";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");
const subsidiariesRepository = RepositoryFactory.get("subsidiaries");
const customersRepository = RepositoryFactory.get("customers");
const contactsRepository = RepositoryFactory.get("contacts");
const projectsRepository = RepositoryFactory.get("projects");

const customers = await customersRepository.GetWithPagination({});
const contacts = await contactsRepository.GetWithPagination({});

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "ProjectsView",
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
    DxHeaderFilter,
    DxForm,
    DxItem,
    cellLink,
    BreadCrumb,
    DxExport,
    DxSelection,
    DxGroupPanel,
    DxGrouping,
    DxSearchPanel,
    DxCustomRule,
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
          return this.getProjects(params);
        },
        insert: (values) => {
          return this.createProject(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateProject(values);
        },
        remove: (key) => {
          return this.deleteProject(key);
        },
      }),
      projectType: {},
      projectCategory: {},
      projectState: {},
      customer: {},
      contact: {},
      subsidiary: {},
      setSubsidiaryValue(rowData, value) {
        rowData.customerId = null;
        rowData.mainContactId = null;
        this.defaultSetCellValue(rowData, value);
      },
      setCustomerValue(rowData, value) {
        rowData.mainContactId = null;
        this.defaultSetCellValue(rowData, value);
      },
      setFullDates(rowData, value, currentRowData) {
        if (currentRowData.startDate != undefined && value != undefined) {
          const diffTime = Math.abs(value - new Date(currentRowData.startDate));
          const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
          rowData.durationHour = diffHours;
        }
        if (currentRowData.endDate != undefined && value != undefined) {
          const diffTime = Math.abs(new Date(currentRowData.endDate) - value);
          const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
          rowData.durationHour = diffHours;
        }
        this.defaultSetCellValue(rowData, value);
      },
      setCostHourMenProject(rowData, value) {
        var intvalue = Math.abs(value);
        this.defaultSetCellValue(rowData, intvalue);
      },
    };
  },
  methods: {
    getProjects: async function (params) {
      const { data } = await projectsRepository.GetWithFilter(params);
      return data.data;
    },
    createProject: async function (project) {
      const { data } = await projectsRepository.Create(project);
      return data;
    },
    updateProject: async function (project) {
      const { data } = await projectsRepository.Update(project);
      return data;
    },
    deleteProject: async function (id) {
      const { data } = await projectsRepository.Delete(id);
      return data;
    },
    getFilteredCustomers: (options) => ({
      store: customers.data.data,
      filter: options.data ? ["subsidiaryId", "=", options.data.subsidiaryId] : null,
    }),
    getFilteredContacts: (options) => ({
      store: contacts.data.data,
      filter: options.data ? ["customerId", "=", options.data.customerId] : null,
    }),
    getSubsidiaries: async function () {
      const { data } = await subsidiariesRepository.GetWithPagination({});
      this.subsidiary = data.data;
    },
    getCustomers: async function () {
      const { data } = await customersRepository.GetWithPagination({});
      this.customer = data.data;
    },
    getContacts: async function () {
      const { data } = await contactsRepository.GetWithPagination({});
      this.contact = data.data;
    },
    getProjectTypes: async function () {
      const { data } = await catalogRepository.Get("NAME", "PROJECTTYPE");
      this.projectType = data.data;
    },
    getProjectCategories: async function () {
      const { data } = await catalogRepository.Get("NAME", "PROJECTCATEGORY");
      this.projectCategory = data.data;
    },
    getProjectStates: async function () {
      const { data } = await catalogRepository.Get("NAME", "PROJECTSTATE");
      this.projectState = data.data;
    },
    getCostHourMenCustomer: function (data) {
      return data.customerId != undefined && Object.keys(this.customer).length != 0
        ? this.customer.filter((x) => x.id == data.customerId)[0].costHourMen
        : 0;
    },
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Proyectos");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Proyectos.xlsx");
        });
      });
      e.cancel = true;
    },
    startDateValidation: function (params) {
      return params.data.startDate != undefined && params.data.endDate != undefined
        ? params.data.startDate < params.data.endDate
        : true;
    },
    endDateValidation: function (params) {
      return params.data.startDate != undefined && params.data.endDate != undefined
        ? params.data.endDate > params.data.startDate
        : true;
    },
    closeDateValidation: function (params) {
      return params.data.endDate != undefined && params.data.closeDate != undefined
        ? params.data.endDate < params.data.closeDate
        : true;
    },
  },
  async created() {
    await this.getSubsidiaries();
    await this.getCustomers();
    await this.getContacts();
    await this.getProjectTypes();
    await this.getProjectCategories();
    await this.getProjectStates();
  },
};
</script>

<style>
#dataGridProject {
  height: 450px;
  width: 100%;
  padding-left: 10px;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridProject {
    height: 760px;
  }
}
</style>
