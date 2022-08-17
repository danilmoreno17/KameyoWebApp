<template>
  <div>
    <DxDataGrid
      id="dataGridProjectTask"
      :data-source="tasks"
      :show-borders="true"
      :repaint-changes-only="true"
      :remote-operations="true"
      @row-inserting="insertTask"
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
      <DxEditing :refresh-mode="full" :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup">
        <DxPopup :show-title="true" :width="700" :height="525" title="Información de la Tarea" />
        <DxForm>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxItem data-field="name" />
            <DxItem data-field="description" />
            <DxItem data-field="order" />
          </DxItem>

          <DxItem :col-count="2" :col-span="2" item-type="group" caption="Tiempos de la tarea">
            <DxItem data-field="catalogTaskTypeId" />
            <DxItem data-field="catalogTaskStateId" />
            <DxItem data-field="startDate" />
            <DxItem data-field="endDate" />
            <DxItem data-field="durationHour" />
            <DxItem data-field="closeDate" />
            <DxItem data-field="progress" />
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn :width="150" data-field="name" caption="Nombre" cell-template="cell-link-template">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn :width="0" data-field="projectId"> </DxColumn>
      <DxColumn :width="200" data-field="description" caption="Descripción"> </DxColumn>
      <DxColumn :width="0" :set-cell-value="setOrden" data-field="order" caption="Orden" data-type="number"> </DxColumn>
      <DxColumn :width="0" data-field="catalogTaskTypeId" caption="Tipo de Tarea">
        <DxLookup :data-source="projectTaskType" value-expr="id" display-expr="value" />
      </DxColumn>
      <DxColumn :width="150" data-field="catalogTaskStateId" caption="Estado de Tarea">
        <DxLookup :data-source="projectTaskState" value-expr="id" display-expr="value" />
      </DxColumn>
      <DxColumn
        :width="150"
        :set-cell-value="setFullDates"
        data-field="startDate"
        caption="Fecha de Inicio"
        data-type="datetime"
      >
        <DxRangeRule
          :max="maxDate"
          :min="minDate"
          message="La fecha de inicio de la tarea se encuentra fuera de los tiempos del proyecto."
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
          :max="maxDate"
          :min="minDate"
          message="La fecha de fin de la tarea se encuentra fuera de los tiempos del proyecto."
        />
        <DxCustomRule
          :validation-callback="endDateValidation"
          message="La fecha de fin no puede ser menor o igual a la fecha de inicio."
        />
      </DxColumn>
      <DxColumn :width="100" :allow-editing="false" data-field="durationHour" caption="Duración" data-type="number">
      </DxColumn>
      <DxColumn :width="150" data-field="closeDate" caption="Fecha de Cierre" data-type="datetime">
        <DxCustomRule
          :validation-callback="closeDateValidation"
          message="La fecha de cierre no puede ser menor o igual a la fecha de fin."
        />
      </DxColumn>
      <DxColumn :width="100" data-field="progress" caption="Progreso" data-type="number"> </DxColumn>
      <template #cell-link-template="{ data }">
        <cellLink
          :cell-data="data"
          :routePath="{
            name: 'projectTaskView',
            params: { id: data.data.id },
          }"
        />
      </template>
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
  DxFormat,
  DxCustomRule,
  DxRangeRule,
} from "devextreme-vue/data-grid";

import { DxItem } from "devextreme-vue/form";
import cellLink from "@/components/DataGrid/CellLinkTemplate.vue";
import CustomStore from "devextreme/data/custom_store";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");
const projectTaskRepository = RepositoryFactory.get("projectTasks");

const projectTaskTypes = await catalogRepository.Get("NAME", "PROJECTTASKTYPE");
const projectTaskStates = await catalogRepository.Get("NAME", "PROJECTTASKSTATE");

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
    DxFormat,
    DxCustomRule,
    DxRangeRule,
    cellLink,
  },
  props: {
    dataProject: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      tasks: new CustomStore({
        key: "id",
        load: () => {
          return this.getTasks();
        },
        insert: (values) => {
          return this.createTask(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateTask(values);
        },
        remove: (key) => {
          return this.deleteTask(key);
        },
      }),
      projectTaskType: projectTaskTypes.data.data,
      projectTaskState: projectTaskStates.data.data,
      onlyPositiveFormat: { signDisplay: "never" },
      maxDate: new Date(this.dataProject.endDate),
      minDate: new Date(this.dataProject.startDate),
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
      setOrden(rowData, value) {
        var intvalue = Math.abs(Math.round(value));
        this.defaultSetCellValue(rowData, intvalue);
      },
    };
  },
  methods: {
    insertProjectTask: async function (e) {
      console.log(e);
    },
    getTasks: async function () {
      const { data } = await projectTaskRepository.Get("PROJECTID", this.dataProject.id);
      data.totalCount = data.data.length;
      return data;
    },
    createTask: async function (task) {
      task.projectId = this.dataProject.id;
      const { data } = await projectTaskRepository.Create(task);
      return data;
    },
    updateTask: async function (task) {
      const { data } = await projectTaskRepository.Update(task);
      return data;
    },
    deleteTask: async function (id) {
      const { data } = await projectTaskRepository.Delete(id);
      return data;
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
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Tareas");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Tareas.xlsx");
        });
      });
      e.cancel = true;
    },
  },
  async created() {},
};
</script>

<style>
.master-detail-caption {
  padding: 0 0 5px 10px;
  font-size: 14px;
  font-weight: bold;
}
#dataGridProjectTask {
  height: 450px;
  width: 100%;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridProjectTask {
    height: 760px;
  }
}
</style>
