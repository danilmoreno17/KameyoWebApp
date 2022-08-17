<template>
  <div>
    <DxDataGrid
      id="dataGridProjectResource"
      :data-source="resources"
      :show-borders="true"
      :repaint-changes-only="true"
      :remote-operations="true"
      @exporting="onExporting"
      @init-new-row="newRow"
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
      <DxEditing :refresh-mode="full" :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup">
        <DxPopup :show-title="true" :width="700" :height="525" title="Asignacion de Recurso a Proyecto" />
        <DxForm>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxItem data-field="employeeId" />
            <DxItem data-field="catalogEmployeeRolId" />
            <!--DxItem data-field="calculateFactorEmployee" /-->
            <DxItem data-field="calculateFactorProject" />
            <DxItem data-field="participationValue" />
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn :width="0" data-field="projectId" />
      <DxColumn :width="150" :set-cell-value="setEmployeeValue" data-field="employeeId" caption="Empleado">
        <DxLookup :data-source="employees" value-expr="id" display-expr="fullName" item-template="list-item" />
        <DxAsyncRule :validation-callback="employeeValidation" message="El empleado ya fue asignado al proyecto" />
        <DxRequiredRule />
      </DxColumn>
      <DxColumn :width="150" data-field="catalogEmployeeRolId" caption="Rol">
        <DxLookup :data-source="catalogEmployeeRols" value-expr="id" display-expr="value" />
        <DxRequiredRule />
      </DxColumn>
      <DxColumn
        :width="300"
        :calculate-cell-value="getCalculateFactorEmployee"
        :allow-editing="false"
        caption="Factor de Calculo del Empleado"
        data-type="number"
      >
      </DxColumn>
      <DxColumn
        :width="300"
        :set-cell-value="setCalculateFactorProject"
        data-field="calculateFactorProject"
        caption="Factor de Calculo del Proyecto"
        data-type="number"
      >
        <DxAsyncRule
          :validation-callback="factorProjectValidation"
          message="No se puede modificar un factor de calculo del proyecto cuando existe una actividad activa."
        />
      </DxColumn>
      <DxColumn
        :width="300"
        data-field="participationValue"
        caption="Valor de Participacion"
        data-type="number"
      >
      </DxColumn>
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
  DxHeaderFilter,
  DxSearchPanel,
  DxExport,
  DxSelection,
  DxGroupPanel,
  DxGrouping,
  DxEditing,
  DxPopup,
  DxLookup,
  DxForm,
  DxAsyncRule,
} from "devextreme-vue/data-grid";

import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");
const employeeRepository = RepositoryFactory.get("employees");
const projectResourceRepository = RepositoryFactory.get("projectResources");
const taskActivityRepository = RepositoryFactory.get("taskActivities");

import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

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
    DxHeaderFilter,
    DxSearchPanel,
    DxExport,
    DxSelection,
    DxGroupPanel,
    DxGrouping,
    DxForm,
    DxItem,
    DxAsyncRule,
  },
  props: {
    dataProject: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      resources: new CustomStore({
        key: "id",
        load: () => {
          return this.getResources();
        },
        insert: (values) => {
          return this.createResource(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateResource(values);
        },
        remove: (key) => {
          return this.deleteResource(key);
        },
      }),
      employees: {},
      catalogEmployeeRols: {},
      employeeResources: {},
      setCalculateFactorProject(rowData, value) {
        var intvalue = Math.abs(value);
        this.defaultSetCellValue(rowData, intvalue);
      },
    };
  },
  methods: {
    getCatalogEmployeeRols: async function () {
      const { data } = await catalogRepository.Get("NAME", "EMPLOYEEROL");
      this.catalogEmployeeRols = data.data;
    },
    getEmployees: async function () {
      const { data } = await employeeRepository.Get("SUBSIDIARYID", this.dataProject.subsidiaryId);
      this.employees = data.data;
    },
    newRow(event){
      //event.data.calculateFactorProject = this.dataProject.calculateFactor;
    },
    getCalculateFactorEmployee: function (data) {
      return data.employeeId != undefined && this.employees != undefined
        ? this.employees.filter((x) => x.id === data.employeeId)[0].calculateFactor
        : 0;
    },
    getResources: async function () {
      const { data } = await projectResourceRepository.Get("PROJECTID", this.dataProject.id);
      this.employeeResources = data.data;
      data.totalCount = data.data.length;
      return data;
    },
    createResource: async function (resource) {
      resource.projectId = this.dataProject.id;
      const { data } = await projectResourceRepository.Create(resource);
      return data;
    },
    updateResource: async function (resource) {
      const { data } = await projectResourceRepository.Update(resource);
      return data;
    },
    deleteResource: async function (id) {
      const { data } = await projectResourceRepository.Delete(id);
      return data;
    },
    employeeValidation: async function (params) {
      console.log(params);
      console.log(this.employeeResources);
      console.log(params.data.employeeId == undefined);
      return  this.employeeResources.filter((x) => x.employeeId == params.data.employeeId && x.id != params.data.id).length == 0;
    },
    factorProjectValidation: async function (params) {
      const { data } = await taskActivityRepository.Get("PROJECTID", this.dataProject.id);
      return data.data.filter((x) => x.employeeId == params.data.employeeId).length == 0;
    },
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Recursos");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Recursos.xlsx");
        });
      });
      e.cancel = true;
    },
  },
  async created() {
    await this.getEmployees();
    await this.getCatalogEmployeeRols();
  },
};
</script>

<style>
.master-detail-caption {
  padding: 0 0 5px 10px;
  font-size: 14px;
  font-weight: bold;
}
#dataGridProjectResource {
  height: 450px;
  width: 100%;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridProjectResource {
    height: 760px;
  }
}
</style>
