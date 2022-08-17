<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxDataGrid
            id="dataGridEmployee"
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
            <DxEditing
              :refresh-mode="full"
              :allow-updating="true"
              :allow-adding="true"
              :allow-deleting="true"
              mode="popup"
            >
              <DxPopup :show-title="true" :width="700" :height="525" title="Employee Info" />
              <DxForm>
                <DxItem :col-count="2" :col-span="2" item-type="group">
                  <DxItem data-field="names" />
                  <DxItem data-field="lastName" />
                  <DxItem data-field="parentId" />
                  <DxItem data-field="subsidiaryId" />

                  <DxItem data-field="catalogEmployeeTypeId" />
                  <DxItem data-field="catalogPositionId" />
                  <DxItem data-field="catalogAreaId" />
                  <DxItem data-field="catalogDepartmentId" />
                  <DxItem data-field="catalogCostCenterId" />
                  <DxItem data-field="catalogCurrencyId" />
                  <DxItem data-field="costHour" />
                  <DxItem data-field="phoneOffice" />
                  <DxItem data-field="phoneOfficeExt" />
                  <DxItem data-field="phoneMobile" />
                  <DxItem data-field="calculateFactor" />
                </DxItem>
              </DxForm>
            </DxEditing>

            <DxColumn :width="150" data-field="names" caption="Nombres" cell-template="cell-link-template">
              <DxRequiredRule />
            </DxColumn>

            <DxColumn :width="150" data-field="lastName" caption="Apellidos" />
            <DxColumn :width="150" data-field="parentId" caption="Jefe">
              <DxLookup :data-source="jefe" value-expr="id" display-expr="names" />
            </DxColumn>
            <DxColumn :width="150" data-field="subsidiaryId" caption="Filial">
              <DxRequiredRule />
              <DxLookup :data-source="subsidiary" value-expr="id" display-expr="name" />
            </DxColumn>
            <DxColumn :width="150" data-field="catalogAreaId" caption="Area">
              <DxLookup :data-source="area" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="0" data-field="catalogDepartmentId" caption="Departamento">
              <DxLookup :data-source="department" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="0" data-field="catalogCostCenterId" caption="Centro de Costo">
              <DxLookup :data-source="costcenter" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="150" data-field="catalogPositionId" caption="Posicion">
              <DxLookup :data-source="position" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="0" data-field="catalogCurrencyId" caption="Moneda">
              <DxLookup :data-source="currency" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="150" data-field="catalogEmployeeTypeId" caption="Tipo Empleado">
              <DxLookup :data-source="employeeType" value-expr="id" display-expr="value" />
            </DxColumn>
            <DxColumn :width="0" data-field="costHour" data-type="number" format="currency" caption="Costo Hora" />
            <DxColumn :width="0" data-field="phoneOffice" data-type="tel" caption="Telefono Oficina">
              <DxPatternRule
                :pattern="pattern"
                message='El número de telefono debe tener el siguiente formato:  "(555) 555-5555" !'
              />
            </DxColumn>
            <DxColumn :width="0" data-field="phoneOfficeExt" data-type="number" caption="Ext." />
            <DxColumn :width="0" data-field="phoneMobile" data-type="tel" caption="Movil">
              <DxPatternRule
                :pattern="pattern"
                message='El número de telefono debe tener el siguiente formato:  "(555) 555-5555" !'
              />
            </DxColumn>
            <DxColumn :width="0" data-field="calculateFactor" data-type="number" caption="Factor de Calculo" />
            <template #cell-link-template="{ data }">
              <cellLink
                :cell-data="data"
                :routePath="{
                  name: 'employeeView',
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
  DxPatternRule,
  DxRequiredRule,
  DxPager,
  DxHeaderFilter,
  DxPaging,
  DxFilterRow,
  DxEditing,
  DxPopup,
  DxLookup,
  DxForm,
  DxExport,
  DxSelection,
  DxGroupPanel,
  DxGrouping,
  DxSearchPanel,
} from "devextreme-vue/data-grid";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";
import cellLink from "@/components/DataGrid/CellLinkTemplate.vue";

import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogsRepository = RepositoryFactory.get("catalogs");
const subsidiariesRepository = RepositoryFactory.get("subsidiaries");
const employeesRepository = RepositoryFactory.get("employees");

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "EmployeeView",
  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPager,
    DxPaging,
    DxEditing,
    DxHeaderFilter,
    DxRequiredRule,
    DxPatternRule,
    DxPopup,
    DxLookup,
    DxFilterRow,
    DxForm,
    DxItem,
    BreadCrumb,
    DxExport,
    DxSelection,
    DxGroupPanel,
    DxGrouping,
    DxSearchPanel,
    cellLink,
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
          return this.getEmployees(params);
        },
        insert: (values) => {
          return this.createEmployee(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateEmployee(values);
        },
        remove: (key) => {
          return this.deleteEmployee(key);
        },
      }),
      area: {},
      department: {},
      costcenter: {},
      position: {},
      currency: {},
      employeeType: {},
      subsidiary: {},
      jefe: {},
      pattern: /^\(\d{3}\) \d{3}-\d{4}$/i,
    };
  },

  methods: {
    getCatalogs: async function (field, value) {
      const { data } = await catalogRepository.Get(field, value);
      //console.log("data", data);
      return data.data;
    },
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Empleados");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Empleados.xlsx");
        });
      });
      e.cancel = true;
    },
    getEmployees: async function (params) {
      const { data } = await employeesRepository.GetWithFilter(params);
      return data.data;
    },
    createEmployee: async function (employee) {
      const { data } = await employeesRepository.Create(employee);
      return data;
    },
    updateEmployee: async function (employee) {
      const { data } = await employeesRepository.Update(employee);
      return data;
    },
    deleteEmployee: async function (id) {
      const { data } = await employeesRepository.Delete(id);
      return data;
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
    getCurrencies: async function () {
      const { data } = await catalogsRepository.Get("NAME", "CURRENCY");
      this.currency = data.data;
    },
    getCostCenters: async function () {
      const { data } = await catalogsRepository.Get("NAME", "COSTCENTER");
      this.costcenter = data.data;
    },
    getEmployeeTypes: async function () {
      const { data } = await catalogsRepository.Get("NAME", "EMPLOYEETYPE");
      this.employeeType = data.data;
    },
    getSubsidiaries: async function () {
      const { data } = await subsidiariesRepository.GetWithPagination({});
      this.subsidiary = data.data;
    },
    getParentEmployees: async function () {
      const { data } = await employeesRepository.Get("PARENTID", "NULL");
      this.jefe = data.data;
    },
  },
  async created() {
    await this.getAreas();
    await this.getDepartments();
    await this.getPositions();
    await this.getCurrencies();
    await this.getCostCenters();
    await this.getEmployeeTypes();
    await this.getSubsidiaries();
    await this.getParentEmployees();
  },
};
</script>

<style>
#dataGridEmployee {
  height: 450px;
  width: 100%;
  padding-left: 10px;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridEmployee {
    height: 760px;
  }
}
</style>
