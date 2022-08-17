<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxDataGrid
            id="dataGridProjectTask"
            :data-source="dataSource"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
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
              <DxPopup
                :show-title="true"
                :width="700"
                :height="525"
                title="Información de la Tarea"
              />
              <DxForm>
                <DxItem :col-count="1" :col-span="2" item-type="group">
                  <DxItem data-field="name" />
                  <DxItem data-field="projectId" />
                  <DxItem data-field="description" />
                  <DxItem data-field="order" />
                </DxItem>

                <DxItem
                  :col-count="2"
                  :col-span="2"
                  item-type="group"
                  caption="Tiempos de la tarea"
                >
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
            <DxColumn
              :width="150"
              data-field="name"
              caption="Nombre"
              cell-template="cell-link-template"
            >
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="150" data-field="projectId" caption="Proyecto">
              <DxRequiredRule />
              <DxLookup
                :data-source="project"
                value-expr="id"
                display-expr="name"
              />
            </DxColumn>
            <DxColumn
              :width="200"
              data-field="description"
              caption="Descripción"
            >
            </DxColumn>
            <DxColumn
              :width="0"
              data-field="order"
              caption="Orden"
              data-type="number"
            >
            </DxColumn>
            <DxColumn
              :width="0"
              data-field="catalogTaskTypeId"
              caption="Tipo de Tarea"
            >
              <DxLookup
                :data-source="projectTaskType"
                value-expr="id"
                display-expr="value"
              />
            </DxColumn>
            <DxColumn
              :width="150"
              data-field="catalogTaskStateId"
              caption="Estado de Tarea"
            >
              <DxLookup
                :data-source="projectTaskState"
                value-expr="id"
                display-expr="value"
              />
            </DxColumn>
            <DxColumn
              :width="150"
              data-field="startDate"
              caption="Fecha de Inicio"
              data-type="date"
            >
            </DxColumn>
            <DxColumn
              :width="150"
              data-field="endDate"
              caption="Fecha de Fin"
              data-type="date"
            >
            </DxColumn>
            <DxColumn
              :width="100"
              data-field="durationHour"
              caption="Duración"
              data-type="number"
            >
            </DxColumn>
            <DxColumn
              :width="150"
              data-field="closeDate"
              caption="Fecha de Cierre"
              data-type="date"
            >
            </DxColumn>
            <DxColumn
              :width="100"
              data-field="progress"
              caption="Progreso"
              data-type="number"
            >
            </DxColumn>
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
} from "devextreme-vue/data-grid";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";
import cellLink from "@/components/DataGrid/CellLinkTemplate.vue";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");
const projectTaskRepository = RepositoryFactory.get("projectTasks");
const projectRepository = RepositoryFactory.get("projects");

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "ProjectTasksView",
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
    cellLink,
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
          return this.getProjectTasks(params);
        },
        insert: (values) => {
          return this.createProjectTask(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateProjectTask(values);
        },
        remove: (key) => {
          return this.deleteProjectTask(key);
        },
      }),
      projectTaskType: {},
      projectTaskState: {},
      project:{},
    };
  },
  methods: {
    sendRequest(url, method = "GET", data = {}) {
      const params = Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
      if (method === "GET") {
        console.log("params", params);
        return fetch(`${url}?${params}`, {
          method,
        }).then((result) =>
          result.json().then((json) => {
            if (result.ok) return json.data;
            throw json.Message;
          })
        );
      }
      return fetch(url, {
        method,
        body: data.values,
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      }).then((result) => {
        if (result.ok) {
          return result.text().then((text) => text && JSON.parse(text));
        }
        return result.json().then((json) => {
          throw json.Message;
        });
      });
    },
    getProjectTasks: async function (params) {
      const { data } = await projectTaskRepository.GetWithFilter(params);
      return data.data;
    },
    createProjectTask: async function (projectTask) {
      const { data } = await projectTaskRepository.Create(projectTask);
      return data;
    },
    updateProjectTask: async function (projectTask) {
      const { data } = await projectTaskRepository.Update(projectTask);
      return data;
    },
    deleteProjectTask: async function (id) {
      const { data } = await projectTaskRepository.Delete(id);
      return data;
    },
    getProjects: async function () {
      const { data } = await projectRepository.GetWithPagination({});
      this.project = data.data;
    },
    getProjectTaskTypes: async function(){
      const { data } = await catalogRepository.Get("NAME", "PROJECTTASKTYPE");
      this.projectTaskType = data.data;
    },
    getProjectTaskStates: async function(){
      const { data } = await catalogRepository.Get("NAME", "PROJECTTASKSTATE");
      this.projectTaskState = data.data;
    },
  },
  async created() {
    await this.getProjects();
    await this.getProjectTaskTypes();
    await this.getProjectTaskStates();
  },
};
</script>

<style></style>
