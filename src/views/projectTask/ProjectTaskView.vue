<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <DxToolbar>
          <DxItemToolbar :options="saveButtonOptions" location="after" locate-in-menu="auto" widget="dxButton" />
        </DxToolbar>
        <DxForm :form-data="projectTask" :col-count="2" v-if="showWhenLoad">
          <DxGroupItem caption="Información de la Tarea" :col-count="2">
            <DxSimpleItem data-field="projectName">
              <DxLabel text="Proyecto" />
            </DxSimpleItem>
            <DxSimpleItem data-field="name">
              <DxLabel text="Nombre" />
            </DxSimpleItem>
            <DxSimpleItem data-field="description" caption="Descripción">
              <DxLabel text="Descripción" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                displayExpr: 'value',
                items: projectTaskType,
              }"
              data-field="catalogTaskTypeId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Tipo de Tarea" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                displayExpr: 'value',
                items: projectTaskState,
              }"
              data-field="catalogTaskStateId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Estado de Tarea" />
            </DxSimpleItem>
            <DxSimpleItem data-field="order" caption="Orden">
              <DxLabel text="Orden" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxGroupItem caption="Tiempos de Tarea" :col-count="2">
            <DxSimpleItem
              :editor-options="{ type: 'datetime', onValueChanged: setFullDates }"
              data-field="startDate"
              editor-type="dxDateBox"
            >
              <DxLabel text="Fecha de Inicio" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{ type: 'datetime', onValueChanged: setFullDates }"
              data-field="endDate"
              editor-type="dxDateBox"
            >
              <DxLabel text="Fecha de Fin" />
            </DxSimpleItem>
            <DxSimpleItem :editor-options="{ disabled: true }" data-field="durationHour">
              <DxLabel text="Duración" />
            </DxSimpleItem>
            <DxSimpleItem data-field="closeDate" editor-type="dxDateBox">
              <DxLabel text="Fecha de Cierre" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxSimpleItem data-field="progress">
            <DxLabel text="Progreso" />
          </DxSimpleItem>
        </DxForm>

        <DxDataGrid
          id="dataGridTaskActivity"
          :data-source="taskActivities"
          :show-borders="true"
          :repaint-changes-only="true"
          :remote-operations="true"
          v-if="showWhenLoad"
          key-expr="id"
        >
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
            <DxPopup :show-title="true" :width="700" :height="525" title="Información de la Actividad" />
            <DxGridForm>
              <DxItem :col-count="1" :col-span="2" item-type="group">
                <DxItem data-field="employeeId" />
                <DxItem data-field="description" />
              </DxItem>

              <DxItem :col-count="2" :col-span="2" item-type="group" caption="Tiempos de la actividad">
                <DxItem data-field="startDate" />
                <DxItem data-field="endDate" />
                <DxItem data-field="totalTimeHour" />
              </DxItem>
            </DxGridForm>
          </DxEditing>
          <DxColumn :width="150" data-field="employeeId" caption="Empleado">
            <DxLookup :data-source="employees" value-expr="employeeId" display-expr="employeName" />
            <DxRequiredRule />
          </DxColumn>
          <DxColumn :width="0" data-field="projectTaskId" caption="Tarea"> </DxColumn>
          <DxColumn :width="200" data-field="description" caption="Descripción"> </DxColumn>
          <DxColumn :width="150" data-field="startDate" caption="Fecha de Inicio" data-type="datetime"> </DxColumn>
          <DxColumn :width="150" data-field="endDate" caption="Fecha de Fin" data-type="datetime"> </DxColumn>
          <DxColumn :width="100" data-field="totalTimeHour" caption="Duración" data-type="number"> </DxColumn>
        </DxDataGrid>

        <DxToast v-model:visible="isVisible" v-model:message="message" v-model:type="type" />
        <DxLoadIndicator id="large-indicator" :height="60" :width="60" :visible="loadIndicatorVisible" />
      </div>
    </div>
  </div>
</template>
<script>
import { DxForm, DxSimpleItem, DxGroupItem, DxLabel, DxItem } from "devextreme-vue/form";

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
  DxForm as DxGridForm,
} from "devextreme-vue/data-grid";

import { DxToast } from "devextreme-vue/toast";
import DxToolbar, { DxItem as DxItemToolbar } from "devextreme-vue/toolbar";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import CustomStore from "devextreme/data/custom_store";

const catalogRepository = RepositoryFactory.get("catalogs");
const projectTaskRepository = RepositoryFactory.get("projectTasks");
const projectResourceRepository = RepositoryFactory.get("projectResources");
const taskActivityRepository = RepositoryFactory.get("taskActivities");

export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxLabel,
    DxItem,
    DxToolbar,
    DxItemToolbar,
    DxToast,
    DxLoadIndicator,
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
    DxGridForm,
    BreadCrumb,
  },
  data() {
    return {
      projectTask: {},
      projectTaskType: {},
      projectTaskState: {},
      employees: {},
      taskActivities: new CustomStore({
        key: "id",
        load: () => {
          return this.getTaskActivities();
        },
        insert: (values) => {
          return this.createTaskActivity(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateTaskActivity(values);
        },
        remove: (key) => {
          return this.deleteTaskActivity(key);
        },
      }),
      saveButtonOptions: {
        text: "Grabar",
        onClick: async () => {
          let projectTaskInput = {
            id: this.projectTask.id,
            projectId: this.projectTask.projectId,
            name: this.projectTask.name,
            description: this.projectTask.description,
            catalogTasktTypeId: this.projectTask.catalogTasktTypeId,
            order: this.projectTask.order,
            startDate: this.projectTask.startDate,
            endDate: this.projectTask.endDate,
            closeDate: this.projectTask.closeDate,
            durationHour: this.projectTask.durationHour,
            progress: this.projectTask.progress,
            catalogTaskStateId: this.projectTask.catalogTaskStateId,
          };
          this.updateProjectTask(projectTaskInput);
          //console.log(projectTaskInput);
        },
      },
      showWhenLoad: false,
      isVisible: false,
      message: "",
      type: "info",
      loadIndicatorVisible: false,
    };
  },
  methods: {
    getProjectTaskById: async function (id) {
      this.loadIndicatorVisible = true;
      const { data } = await projectTaskRepository.Get("ID", id);
      this.projectTask = data.data[0];
      this.showWhenLoad = true;
      this.loadIndicatorVisible = false;
    },
    getTaskActivities: async function () {
      const { data } = await taskActivityRepository.Get("PROJECTTASKID", this.projectTask.id);
      data.totalCount = data.data.length;
      return data;
    },
    createTaskActivity: async function (taskActivity) {
      taskActivity.projectTaskId = this.projectTask.id;
      const { data } = await taskActivityRepository.Create(taskActivity);
      return data;
    },
    updateTaskActivity: async function (taskActivity) {
      const { data } = await taskActivityRepository.Update(taskActivity);
      return data;
    },
    deleteTaskActivity: async function (id) {
      const { data } = await taskActivityRepository.Delete(id);
      return data;
    },
    getTaskTypes: async function () {
      const { data } = await catalogRepository.Get("NAME", "PROJECTTASKTYPE");
      this.projectTaskType = data.data;
    },
    getTaskStates: async function () {
      const { data } = await catalogRepository.Get("NAME", "PROJECTTASKSTATE");
      this.projectTaskState = data.data;
    },
    getEmployees: async function () {
      const { data } = await projectResourceRepository.Get("PROJECTID", this.projectTask.projectId);
      this.employees = data.data;
    },
    updateProjectTask: async function (ProjectTask) {
      const { data } = await projectTaskRepository
        .Update(ProjectTask)
        .then(function (response) {
          return response;
        })
        .catch(function (err) {
          return err.response;
        });
      this.type = data.succeeded ? "success" : "error";
      this.message = data.succeeded ? "La Tarea fue actualizada exitosamente." : data.errors[0].message;
      this.isVisible = true;
    },
    setFullDates: function (params) {
      const diffTime = Math.abs(new Date(this.projectTask.endDate) - new Date(this.projectTask.startDate));
      const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
      this.projectTask.durationHour = diffHours;
    },
  },
  async created() {
    var projectTaskId = this.$route.params.id;
    await this.getProjectTaskById(projectTaskId)
      .then(() => this.getTaskTypes())
      .then(() => this.getTaskStates())
      .then(() => this.getEmployees());
  },
};
</script>
<style>
#large-indicator {
  vertical-align: middle;
  margin: auto;
}

#dataGridTaskActivity {
  height: 450px;
  width: 100% !important;
  max-width: 100% !important;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridTaskActivity {
    height: 760px;
  }
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #tabPanelProjectTask {
    height: 760px;
  }
}
</style>
