<template>
  <div>
    <DxDataGrid
      id="dataGridProjectManager"
      :data-source="managers"
      :show-borders="true"
      :showColumnHeaders="false"
      :repaint-changes-only="true"
      :remote-operations="true"
      @row-inserting="insertManager"
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
      <DxPaging :page-size="10" enabled="true" />
      <DxPager
        :visible="true"
        :allowed-page-sizes="pageSizes"
        :display-mode="displayMode"
        :show-navigation-buttons="showNavButtons"
      />
      <DxScrolling row-rendering-mode="virtual" />
      <DxEditing :refresh-mode="full" :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup">
        <DxPopup :show-title="true" :width="700" :height="525" title="Asignacion de Supervisor" />
        <DxForm>
          <DxItem :col-count="1" :col-span="1" item-type="group">
            <DxItem data-field="employeeId" />
            <DxItem data-field="startDate" />
            <DxItem data-field="endDate" />
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn :width="0" data-field="projectId"> </DxColumn>

      <DxColumn :width="150" data-field="employeeId" caption="Empleado">
        <DxLookup :data-source="employees" value-expr="id" display-expr="names" />
        <DxRequiredRule />
      </DxColumn>
      <DxColumn :width="150" data-field="startDate" caption="Fecha de Inicio" data-type="datetime">
        <DxRangeRule
          :max="maxDate"
          :min="minDate"
          message="La fecha de inicio del administrador se encuentra fuera de los tiempos del proyecto."
        />
        <DxCustomRule
          :validation-callback="startDateManagerValidation"
          message="La fecha de inicio del administrador ya se encuentra dentro de la programacion de otro administrador."
        />
      </DxColumn>
      <DxColumn :width="150" data-field="endDate" caption="Fecha de Fin" data-type="datetime">
        <DxCustomRule
          :validation-callback="endDateManagerValidation"
          message="La fecha de fin del administrador ya se encuentra dentro de la programacion de otro administrador."
        />
        <DxRangeRule
          :max="maxDate"
          :min="minDate"
          message="La fecha de fin del administrador se encuentra fuera de los tiempos del proyecto."
        />
      </DxColumn>
    </DxDataGrid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxPaging,
  DxPager,
  DxFilterRow,
  DxHeaderFilter,
  DxSearchPanel,
  DxExport,
  DxSelection,
  DxGroupPanel,
  DxGrouping,
  DxRequiredRule,
  DxEditing,
  DxPopup,
  DxLookup,
  DxForm,
  DxCustomRule,
  DxRangeRule,
} from "devextreme-vue/data-grid";

import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const employeeRepository = RepositoryFactory.get("employees");
const projectManagerRepository = RepositoryFactory.get("projectManagers");

import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPaging,
    DxPager,
    DxFilterRow,
    DxHeaderFilter,
    DxSearchPanel,
    DxExport,
    DxSelection,
    DxGroupPanel,
    DxGrouping,
    DxEditing,
    DxRequiredRule,
    DxPopup,
    DxLookup,
    DxForm,
    DxItem,
    DxCustomRule,
    DxRangeRule,
  },
  props: {
    dataProject: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      managers: new CustomStore({
        key: "id",
        load: () => {
          return this.getManagers();
        },
        insert: (values) => {
          return this.createManager(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateManager(values);
        },
        remove: (key) => {
          return this.deleteManager(key);
        },
      }),
      employees: {},
      maxDate: new Date(this.dataProject.endDate),
      minDate: new Date(this.dataProject.startDate),
      manager: {},
    };
  },
  methods: {
    getEmployees: async function () {
      const { data } = await employeeRepository.Get("SUBSIDIARYID", this.dataProject.subsidiaryId);
      this.employees = data.data;
    },
    getManagers: async function () {
      const { data } = await projectManagerRepository.Get("PROJECTID", this.dataProject.id);
      this.manager = data.data;
      data.totalCount = data.data.length;
      return data;
    },
    createManager: async function (manager) {
      manager.projectId = this.dataProject.id;
      const { data } = await projectManagerRepository.Create(manager);
      return data;
    },
    updateManager: async function (manager) {
      const { data } = await projectManagerRepository.Update(manager);
      return data;
    },
    deleteManager: async function (id) {
      const { data } = await projectManagerRepository.Delete(id);
      return data;
    },
    startDateManagerValidation: function (params) {
      console.log("params", params);
      return params.data.id == undefined
        ? this.manager.filter((x) => x.startDate <= params.data.startDate && x.endDate >= params.data.startDate)
            .length == 0
        : true;
    },
    endDateManagerValidation: function (params) {
      return params.data.id == undefined
        ? this.manager.filter((x) => x.startDate <= params.data.endDate && x.endDate >= params.data.endDate).length == 0
        : true;
    },
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Administradores");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Administradores.xlsx");
        });
      });
      e.cancel = true;
    },
  },
  async created() {
    await this.getEmployees();
  },
};
</script>

<style>
.master-detail-caption {
  padding: 0 0 5px 10px;
  font-size: 14px;
  font-weight: bold;
}
#dataGridProjectManager {
  height: 450px;
  width: 100%;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridProjectManager {
    height: 760px;
  }
}
</style>
