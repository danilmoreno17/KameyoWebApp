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
        <DxForm id="formProject" :form-data="project" :col-count="2" v-if="showWhenLoad">
          <DxGroupItem caption="Información del Proyecto" :col-count="2">
            <DxSimpleItem data-field="name">
              <DxLabel text="Nombre" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                items: subsidiary,
                displayExpr: 'name',
                disabled: true,
              }"
              data-field="subsidiaryId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Subsidiaria" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                items: customer,
                displayExpr: 'name',
                disabled: true,
              }"
              data-field="customerId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Cliente" />
            </DxSimpleItem>
            <DxSimpleItem data-field="description" caption="Descripción">
              <DxLabel text="Descripción" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                items: contact,
                displayExpr: 'names',
              }"
              data-field="mainContactId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Contacto Principal" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                displayExpr: 'value',
                items: projectType,
              }"
              data-field="catalogProjectTypeId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Tipo de Proyecto" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                displayExpr: 'value',
                items: projectCategory,
              }"
              data-field="catalogProjectCategoryId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Categoria de Proyecto" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                displayExpr: 'value',
                items: projectState,
              }"
              data-field="catalogProjectStateId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Estado de Proyecto" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{ disabled: true }"
              data-field="costHourMenCustomer"
              editor-type="dxNumberBox"
            >
              <DxLabel text="Costo Hora Cliente" />
            </DxSimpleItem>
            <DxSimpleItem data-field="costHourMenProject" editor-type="dxNumberBox">
              <DxLabel text="Costo Hora Proyecto" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxGroupItem caption="Tiempos del Proyecto" :col-count="2">
            <DxSimpleItem :editor-options="{ type: 'datetime' }" data-field="startDate" editor-type="dxDateBox">
              <DxLabel text="Fecha de Inicio" />
            </DxSimpleItem>
            <DxSimpleItem :editor-options="{ type: 'datetime' }" data-field="endDate" editor-type="dxDateBox">
              <DxLabel text="Fecha de Fin" />
            </DxSimpleItem>
            <DxSimpleItem data-field="durationHour">
              <DxLabel text="Duración" />
            </DxSimpleItem>
            <DxSimpleItem data-field="closeDate" editor-type="dxDateBox">
              <DxLabel text="Fecha de Cierre" />
            </DxSimpleItem>
          </DxGroupItem>
        </DxForm>
        <DxTabPanel id="tabPanelProject" v-if="showWhenLoad">
          <DxItem title="Recursos" template="resource-tab" />
          <template #resource-tab>
            <ResourceTab :data-project="project" />
          </template>
          <DxItem title="Tareas" template="task-tab" />
          <template #task-tab>
            <TaskTab :data-project="project" />
          </template>
          <DxItem title="Actividades" template="activity-tab" />
          <template #activity-tab>
            <ActivityTab :data-project="project" />
          </template>
          <DxItem title="Bolsa Horas" template="hourbank-tab" />
          <template #hourbank-tab>
            <HourBankTab :data-project="project" />
          </template>
          <DxItem title="Administradores" template="projectmanager-tab" />
          <template #projectmanager-tab>
            <ManagerTab :data-project="project" />
          </template>
        </DxTabPanel>
        <DxToast v-model:visible="isVisible" v-model:message="message" v-model:type="type" />
        <DxLoadIndicator id="large-indicator" :height="60" :width="60" :visible="loadIndicatorVisible" />
      </div>
    </div>
  </div>
</template>

<script>
//import "devextreme/dist/css/dx.light.css";

import { DxForm, DxSimpleItem, DxGroupItem, DxLabel } from "devextreme-vue/form";

import { DxToast } from "devextreme-vue/toast";
import TaskTab from "./TaskTab.vue";
import ActivityTab from "./ActivityTab.vue";
import ResourceTab from "./ResourceTab.vue";
import HourBankTab from "./HourBankTab.vue";
import ManagerTab from "./ManagerTab.vue";
import DxToolbar, { DxItem as DxItemToolbar } from "devextreme-vue/toolbar";
import { DxTabPanel, DxItem } from "devextreme-vue/tab-panel";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";

const projectsRepository = RepositoryFactory.get("projects");
const catalogRepository = RepositoryFactory.get("catalogs");
const customersRepository = RepositoryFactory.get("customers");
const contactsRepository = RepositoryFactory.get("contacts");
const subsidiariesRepository = RepositoryFactory.get("subsidiaries");

const projectTypes = await catalogRepository.Get("NAME", "PROJECTTYPE");
const projectCategories = await catalogRepository.Get("NAME", "PROJECTCATEGORY");
const projectStates = await catalogRepository.Get("NAME", "PROJECTSTATE");

export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxLabel,
    DxToolbar,
    DxItemToolbar,
    DxTabPanel,
    DxItem,
    DxToast,
    DxLoadIndicator,
    TaskTab,
    ActivityTab,
    ResourceTab,
    HourBankTab,
    ManagerTab,
    BreadCrumb,
  },
  data() {
    return {
      project: {},
      projectType: projectTypes.data.data,
      projectCategory: projectCategories.data.data,
      projectState: projectStates.data.data,
      customer: {},
      contact: {},
      subsidiary: {},
      saveButtonOptions: {
        text: "Grabar",
        onClick: async () => {
          let projectInput = {
            id: this.project.id,
            name: this.project.name,
            customerId: this.project.customerId,
            description: this.project.description,
            mainContactId: this.project.mainContactId,
            catalogProjectTypeId: this.project.catalogProjectTypeId,
            catalogProjectCategoryId: this.project.catalogProjectCategoryId,
            catalogProjectStateId: this.project.catalogProjectStateId,
            startDate: this.project.startDate,
            endDate: this.project.endDate,
            durationHour: this.project.durationHour,
            closeDate: this.project.closeDate,
            costHourMenCustomer: this.project.costHourMenCustomer,
            costHourMenProject: this.project.costHourMenProject,
          };
          this.updateProject(projectInput);
        },
      },
      showWhenLoad: false,
      loadIndicatorVisible: true,
      isVisible: false,
      message: "",
      type: "info",
    };
  },

  methods: {
    getProjectById: async function (id) {
      const { data } = await projectsRepository.Get("ID", id);
      var taskActivities = [];
      data.data[0].projectTasks.forEach((element) => {
        taskActivities.push(...element.taskActivities);
      });
      data.data[0].taskActivities = taskActivities;
      this.project = data.data[0];
      this.showWhenLoad = true;
      this.loadIndicatorVisible = false;
    },
    getSubsidiaries: async function () {
      const { data } = await subsidiariesRepository.GetWithPagination({});
      this.subsidiary = data.data;
    },
    getCustomers: async function () {
      const { data } = await customersRepository.GetWithPagination({});
      this.customer = data.data;
    },
    getCustomersBySubsidiaryId: async function (SubsidiaryId) {
      const { data } = await customersRepository.Get("SUBSIDIARYID", SubsidiaryId);
      return data.data;
    },
    getContactsByCustomerId: async function () {
      const { data } = await contactsRepository.Get("CUSTOMERID", this.project.customerId);
      this.contact = data.data;
    },
    updateProject: async function (Project) {
      const { data } = await projectsRepository
        .Update(Project)
        .then(function (response) {
          return response;
        })
        .catch(function (err) {
          return err.response;
        });
      this.type = data.succeeded ? "success" : "error";
      this.message = data.succeeded ? "El proyecto fue actualizado exitosamente." : data.errors[0].message;
      this.isVisible = true;
    },
  },
  async created() {
    var projectId = this.$route.params.id;
    await this.getProjectById(projectId)
      .then(() => this.getSubsidiaries())
      .then(() => this.getCustomers())
      .then(() => this.getContactsByCustomerId());
  },
};
</script>
<style>
#formProject {
  width: 100%;
}

#large-indicator {
  vertical-align: middle;
  margin: auto;
}

#tabPanelProject {
  height: 450px;
  width: 100%;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #tabPanelProject {
    height: 760px;
  }
}
</style>
