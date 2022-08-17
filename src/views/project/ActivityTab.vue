<template>
  <div>
    <DxDataGrid
      id="dataGridTaskActivity"
      :data-source="activities"
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
      <DxPaging :page-size="10" enabled="true" />
      <DxScrolling row-rendering-mode="virtual" />
      <DxEditing :refresh-mode="full" :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup">
        <DxPopup :show-title="true" :width="700" :height="525" title="Información de la Actividad" />
        <DxForm>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxItem data-field="projectTaskId" />
            <DxItem data-field="employeeId" />
            <DxItem data-field="description" />
          </DxItem>

          <DxItem :col-count="2" :col-span="2" item-type="group" caption="Tiempos de la actividad">
            <DxItem data-field="startDate" />
            <DxItem data-field="endDate" />
            <DxItem data-field="totalTimeHour" />
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn :width="150" data-field="employeeId" caption="Empleado">
        <DxLookup :data-source="employees" value-expr="employeeId" display-expr="employeName" />
        <DxRequiredRule />
      </DxColumn>
      <DxColumn :width="150" data-field="projectTaskId" caption="Tarea" :set-cell-value="setTaskValue">
        <DxLookup :data-source="tasks" value-expr="id" display-expr="name" />
        <DxRequiredRule />
      </DxColumn>
      <DxColumn :width="200" data-field="description" caption="Descripción"> </DxColumn>
      <DxColumn
        :width="150"
        :set-cell-value="setFullDates"
        data-field="startDate"
        caption="Fecha de Inicio"
        data-type="datetime"
      >
        <DxRangeRule
          :max="taskEndDate"
          :min="taskStartDate"
          message="La fecha de inicio de la actividad se encuentra fuera de los tiempos de la tarea."
        />
        <DxCustomRule
          :validation-callback="startDateValidation"
          message="La fecha de inicio no puede ser mayor o igual a la fecha de fin."
        />
      </DxColumn>
      <DxColumn
        :width="150"
        :set-cell-value="setFullDates"
        data-field="endDate"
        caption="Fecha de Fin"
        data-type="datetime"
      >
        <DxRangeRule
          :max="taskEndDate"
          :min="taskStartDate"
          message="La fecha de fin de la actividad se encuentra fuera de los tiempos de la tarea."
        />
        <DxCustomRule
          :validation-callback="endDateValidation"
          message="La fecha de fin no puede ser menor o igual a la fecha de inicio."
        />
      </DxColumn>
      <DxColumn :width="100" :allow-editing="false" data-field="totalTimeHour" caption="Duración" data-type="number">
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

const projectResourceRepository = RepositoryFactory.get("projectResources");
const projectTaskRepository = RepositoryFactory.get("projectTasks");
const taskActivityRepository = RepositoryFactory.get("taskActivities");

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
      activities: new CustomStore({
        key: "id",
        load: () => {
          return this.getActivities();
        },
        insert: (values) => {
          console.log("insert", values);
          return this.createActivity(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateActivity(values);
        },
        remove: (key) => {
          return this.deleteActivity(key);
        },
      }),
      employees: {},
      tasks: {},
      taskStartDate: null,
      taskEndDate: null,
      setFullDates(rowData, value, currentRowData) {
        if (currentRowData.startDate != undefined && value != undefined) {
          const diffTime = Math.abs(value - new Date(currentRowData.startDate));
          const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
          rowData.totalTimeHour = diffHours;
        }
        if (currentRowData.endDate != undefined && value != undefined) {
          const diffTime = Math.abs(new Date(currentRowData.endDate) - value);
          const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
          rowData.totalTimeHour = diffHours;
        }
        this.defaultSetCellValue(rowData, value);
      },
    };
  },
  methods: {
    setTaskValue(rowData, value) {
      rowData.startDate = null;
      rowData.endDate = null;
      this.tasks.forEach((task) => {
        if (task.id == value) {
          this.taskStartDate = new Date(task.startDate);
          this.taskEndDate = new Date(task.endDate);
        }
      });
      rowData.projectTaskId = value;
    },
    getEmployees: async function () {
      const { data } = await projectResourceRepository.Get("PROJECTID", this.dataProject.id);
      this.employees = data.data;
      console.log(this.employees);
    },
    getTasks: async function () {
      const { data } = await projectTaskRepository.Get("PROJECTID", this.dataProject.id);
      this.tasks = data.data;
      console.log("tasks", this.tasks);
    },
    getActivities: async function () {
      const { data } = await taskActivityRepository.Get("PROJECTID", this.dataProject.id);
      data.totalCount = data.data.length;
      return data;
    },
    createActivity: async function (activity) {
      const { data } = await taskActivityRepository.Create(activity);
      return data;
    },
    updateActivity: async function (activity) {
      const { data } = await taskActivityRepository.Update(activity);
      return data;
    },
    deleteActivity: async function (id) {
      const { data } = await taskActivityRepository.Delete(id);
      return data;
    },
    insertActivity: function (e) {
      console.log(e.data);
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
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Actividades");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Actividades.xlsx");
        });
      });
      e.cancel = true;
    },
  },
  async created() {
    await this.getEmployees();
    await this.getTasks();
  },
};
</script>

<style>
.master-detail-caption {
  padding: 0 0 5px 10px;
  font-size: 14px;
  font-weight: bold;
}
#dataGridTaskActivity {
  height: 450px;
  width: 100%;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridTaskActivity {
    height: 760px;
  }
}
</style>
