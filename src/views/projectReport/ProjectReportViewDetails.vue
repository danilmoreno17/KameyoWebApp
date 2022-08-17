<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12 cont">
          <DxForm :form-data="projectForm" :items="['name']" :col-count="2">
            <DxGroupItem caption="Información del Proyecto" :col-count="2">
              <DxSimpleItem
                :editor-options="{
                  readOnly: true,
                }"
                data-field="customerName"
              >
                <DxLabel text="Cliente" />
              </DxSimpleItem>
              <DxSimpleItem
                :editor-options="{
                  readOnly: true,
                }"
                data-field="name"
              >
                <DxLabel text="Proyecto" />
              </DxSimpleItem>
              <DxSimpleItem
                :editor-options="{
                  readOnly: true,
                }"
                data-field="status"
              >
                <DxLabel text="Estado" />
              </DxSimpleItem>

              <DxSimpleItem
                :editor-options="{
                  readOnly: true,
                }"
                data-field="projectReportDate"
                editor-type="dxDateBox"
                data-type="datetime"
              >
                <DxLabel text="Fecha de Reporte" editor-type="dxDateBox" />
              </DxSimpleItem>
            </DxGroupItem>
            <DxGroupItem caption="Fechas del Proyecto" :col-count="2">
              <DxSimpleItem
                :editor-options="{
                  readOnly: true,
                  displayFormat: 'yyyy-MM-dd',
                }"
                data-field="customerApprovedDate"
                editor-type="dxDateBox"
              >
                <DxLabel text="Aprobación del cliente" />
              </DxSimpleItem>
              <DxSimpleItem
                :editor-options="{
                  readOnly: true,
                  displayFormat: 'yyyy-MM-dd',
                }"
                data-field="invoicedDate"
                data-type="datetime"
                editor-type="dxDateBox"
              >
                <DxLabel text="Facturación" editor-type="dxDateBox" />
              </DxSimpleItem>
              <DxSimpleItem
                :editor-options="{
                  readOnly: true,
                  displayFormat: 'yyyy-MM-dd',
                }"
                data-field="paidDate"
                editor-type="dxDateBox"
              >
                <DxLabel text="Pago" editor-type="dxDateBox" />
              </DxSimpleItem>
            </DxGroupItem>
            <DxGroupItem :col-count="3">
              <DxButton
                text="Enviar a cliente"
                type="success"
                styling-mode="contained"
                @click="handleApprove(e, 'C')"
                :visible="isProjectManager && visibleButtonSendToCustomer"
              />
              <DxButton
                :width="120"
                text="Aprobar"
                type="success"
                styling-mode="contained"
                @click="handleApprove(e, 'A')"
                :visible="isCustomer && visibleButtonApprove"
              />
              <DxButton
                text="Regresar con observaciones"
                type="danger"
                styling-mode="contained"
                @click="handleApprove(e, 'R')"
                :visible="isCustomer && visibleButtonReject"
              />
              <DxButton
                :width="120"
                text="Facturar"
                type="success"
                styling-mode="contained"
                @click="handleApprove(e, 'F')"
                :visible="isProjectManager && visibleButtonInvoice"
              />
              <DxButton
                :width="120"
                text="Pagar"
                type="success"
                styling-mode="contained"
                @click="handleApprove(e, 'P')"
                :visible="isProjectManager && visibleButtonPaid"
              />
            </DxGroupItem>
          </DxForm>

          <DxDataGrid
            id="dataGridProject"
            :data-source="taskActivities"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
            key-expr="id"
          >
            <DxHeaderFilter :visible="true" />

            <DxColumnChooser :enabled="true" />
            <DxColumnFixing :enabled="true" />
            <DxGroupPanel :visible="true" />
            <DxGrouping :auto-expand-all="true" />
            <DxExport :enabled="true" :allow-export-selected-data="true" />
            <DxSearchPanel :visible="true" :width="240" placeholder="Buscar..." />
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
              :allow-adding="false"
              :allow-updating="['G', 'C'].includes(this.projectReport.state)"
              :allow-deleting="false"
              mode="popup"
            >
              <DxPopupGrid :show-title="true" :width="700" :height="525" title="Información del Proyecto" />
              <DxGridForm>
                <DxItem :col-count="1" :col-span="2" item-type="group">
                  <DxItem data-field="name" />
                </DxItem>
              </DxGridForm>
            </DxEditing>
            <DxColumn :width="150" data-field="description" caption="Descripcion" :allow-editing="false"> </DxColumn>
            <DxColumn :width="150" data-field="consultant" caption="Consultor" :allow-editing="false"> </DxColumn>
            <DxColumn
              data-field="startDate"
              data-type="date"
              format="yyyy-MM-dd HH:mm:ss"
              caption="Inicio"
              :allow-editing="false"
            >
            </DxColumn>
            <DxColumn
              data-field="endDate"
              data-type="date"
              format="yyyy-MM-dd HH:mm:ss"
              caption="Fin"
              :allow-editing="false"
            >
            </DxColumn>
            <DxColumn data-field="factor" caption="Factor Pond." :allow-editing="false"> </DxColumn>
            <DxColumn data-field="totaTimeHour" caption="Tiempo en Horas" :allow-editing="false"> </DxColumn>
            <DxColumn
              data-field="totalTimeHourApproved"
              caption="Horas Aprobadas"
              :allow-editing="isProjectManager && this.projectReport.state != 'C'"
            >
            </DxColumn>
            <DxColumn
              data-field="observation"
              caption="Observación"
              editor-type="dxTextArea" 
              :allow-editing="isCustomer && ['C', 'R'].indexOf(this.projectReport.state) > -1"
            >
            </DxColumn>
            <DxColumn
              data-field="isBillable"
              caption="Es Facturable?"
              :allow-editing="isProjectManager && ['C', 'R'].indexOf(this.projectReport.state) > -1"
            >
            </DxColumn>
            <DxSummary>
              <DxTotalItem column="totaTimeHour" summary-type="sum" />
              <DxTotalItem column="totalTimeHourApproved" summary-type="sum" />
            </DxSummary>
          </DxDataGrid>
        </div>
      </div>
    </div>
  </div>

  <DxPopup
    v-model:visible="popupVisible"
    :drag-enabled="false"
    :close-on-outside-click="true"
    :show-close-button="false"
    :show-title="true"
    :width="500"
    :height="450"
    container=".dx-viewport"
    title="Registro de Facturación"
  >
    <DxPosition at="center" my="center" v-model:of="positionOf" />
    <DxToolbarItem widget="dxButton" toolbar="bottom" location="before" :options="emailButtonOptions" />
    <DxToolbarItem widget="dxButton" toolbar="bottom" location="after" :options="closeButtonOptions" />

    <DxForm :form-data="invoiceData">
      <DxSimpleItem :editor-options="{}" data-field="realInvoiceDate">
        <DxLabel text="Fecha de Factura" />
      </DxSimpleItem>
      <DxSimpleItem :editor-options="{}" editor-type="dxTextArea" data-field="invoiceComment">
        <DxLabel text="Comentario" />
      </DxSimpleItem>
    </DxForm>
  </DxPopup>
</template>
<script>
import { DxForm, DxSimpleItem, DxGroupItem, DxLabel } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import DxButton from "devextreme-vue/button";

import DxTextArea from "devextreme-vue/text-area";

import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxRequiredRule,
  DxPager,
  DxPaging,
  DxFilterRow,
  DxEditing,
  DxPopup as DxPopupGrid,
  DxLookup,
  DxSearchPanel,
  DxForm as DxGridForm,
  DxCustomRule,
  DxHeaderFilter,
  DxExport,
  DxGrouping,
  DxGroupPanel,
  DxSummary,
  DxTotalItem,
  DxColumnChooser,
  DxColumnFixing,
} from "devextreme-vue/data-grid";
import { DxPopup, DxPosition, DxToolbarItem } from "devextreme-vue/popup";
import notify from "devextreme/ui/notify";
function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URLprojectReportActivities = `${BASE_DOMAIN}/api/ProjectReportActivity`;
const URLprojectReportDetailActivities = `${BASE_DOMAIN}/api/ProjectReportDetail`;
const URLprojectReport = `${BASE_DOMAIN}/api/ProjectReport`;
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
//const taskActivitiesRepository = RepositoryFactory.get("taskActivities");
const projectsRepository = RepositoryFactory.get("projects");
const customersRepository = RepositoryFactory.get("customers");
const projectsReportRepository = RepositoryFactory.get("projectReport");
const projectsReportActivitiesRepository = RepositoryFactory.get("projectReport");

import { authUserStore } from "../../stores/auth";
const authenticateRepository = RepositoryFactory.get("authenticate");

export default {
  name: "ActivitiesView",
  components: {
    BreadCrumb,
    DxForm,
    DxSelectBox,
    DxGroupItem,
    DxSimpleItem,
    DxTextArea,
    DxLabel,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxRequiredRule,
    DxPager,
    DxPaging,
    DxFilterRow,
    DxEditing,
    DxPopup,
    DxPopupGrid,
    DxLookup,
    DxSearchPanel,
    DxGridForm,
    DxCustomRule,
    CustomStore,
    DxButton,
    DxHeaderFilter,
    DxExport,
    DxGrouping,
    DxGroupPanel,
    DxPosition,
    DxToolbarItem,
    DxSummary,
    DxTotalItem,
    DxColumnChooser,
    DxColumnFixing,
  },
  data() {
    return {
      project: {},
      visibleButtonApprove: false,
      visibleButtonInvoice: false,
      visibleButtonPaid: false,
      visibleButtonSendToCustomer: false,
      visibleButtonReject: false,
      projectForm: {
        name: "",
        customerName: "",
        invoicedDate: "",
        paidDate: "",
        customerApprovedDate: "",
      },
      customer: {},
      projectReport: {},

      invoiceData: {
        invoiceComment: "",
        realInvoiceDate: new Date(),
      },

      taskActivities: new CustomStore({
        key: "id",
        load: (loadOption) => {
          return this.getTaskActivities(loadOption, this.$route.params.id);
        },
        insert: (values) => {
          //return this.createProject(values);
        },
        update: (key, values) => {
          values.id = key;
          if (values.observation == undefined) values.observation = undefined;
          console.log("valores", key, values);
          return this.sendRequest(`${URLprojectReportDetailActivities}`, "PUT", {
            values: JSON.stringify(values),
          });
        },
        remove: (key) => {
          //return this.deleteProject(key);
        },
      }),

      searchModeOption: "contains",
      searchExprOption: "name",
      searchTimeoutOption: 200,
      minSearchLengthOption: 0,
      showDataBeforeSearchOption: false,
      showWhenLoad: false,
      isProjectManager: true,
      isCustomer: true,
      popupVisible: false,
      positionOf: "top",
      emailButtonOptions: {
        icon: "save",
        text: "Send",
        onClick: () => {
          const message = `Se ha registrado exitosamente`;
          let values = {
            id: this.$route.params.id,
            state: "F",
            by: this.userName,
            realInvoiceDate: this.invoiceData.realInvoiceDate,
            invoiceComment: this.invoiceData.invoiceComment ?? "",
          };
          console.log(values);
          let response = this.sendRequest(`${URLprojectReport}`, "PUT", {
            values: JSON.stringify(values),
          }).then(() => {
            console.log("onClick emailButtonOptions", response, values.id, this.invoiceData);
            this.getProjectReportById(values.id);
            this.popupVisible = false;
            notify(
              {
                message,
                position: {
                  my: "center center",
                  at: "center center",
                },
              },
              "success",
              3000
            );
          });
        },
      },
      closeButtonOptions: {
        text: "Close",
        onClick: () => {
          this.popupVisible = false;
        },
      },
    };
  },
  methods: {
    sendRequest(url, method = "GET", data = {}) {
      const params = Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join("&");
      if (method === "GET") {
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
    getTaskActivities: async function (loadOptions, id) {
      console.log("logid", id);

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
      console.log(params);
      return this.sendRequest(`${URLprojectReportActivities}/activityControl/${id}`, "GET", params).then((data) => {
        console.log("sendrequet", data);
        //data.totalCount = data.length;

        return {
          data: data,
          totalCount: data.length,
          //summary: data.data.summary,
          //groupCount: data.data.groupCount,
        };

        //return data;
      });
    },
    validateUser: async function () {
      const authStore = authUserStore();
      if (authStore.isAuthenticated) {
        console.log("esta autenticado");
        const authUser = authStore.getAuthenticatedUser;
        this.userName = authUser.userName;
        authenticateRepository.ValidateUser(this.userName, "cliente").then((datosAprobacion) => {
          this.isCustomer = datosAprobacion.data.isValid;
        });
        authenticateRepository.ValidateUser(this.userName, "Administrador de Proyectos").then((datosAprobacion) => {
          this.isProjectManager = datosAprobacion.data.isValid;
        });
      }
    },
    getProject: async function (id) {
      const { data } = await projectsRepository.Get("ID", id);
      console.log("dataprojet", data);
      this.project = data.data[0];
      this.projectForm.name = this.project.name;
      this.getCustomer(this.project.customerId);
      //console.log("proyecto", data.data[0], this.project);
    },
    handleApprove: async function (e, state) {
      let values = { id: this.$route.params.id, state: state, by: this.userName };

      if (state == "F") {
        this.popupVisible = true;
        return;
      }

      console.log(e, state);
      let response = this.sendRequest(`${URLprojectReport}`, "PUT", {
        values: JSON.stringify(values),
      }).then(() => {
        console.log("handleApprove", response, values.id);
        this.getProjectReportById(values.id);
      });

      return response;
    },
    getCustomer: async function (id) {
      const { data } = await customersRepository.Get("ID", id);
      this.customer = data.data[0];
      this.projectForm.customerName = this.customer.name;
      
    },
    getProjectReportById: async function (id) {
      
      if (id != undefined) {
        const { data } = await projectsReportRepository.Get("ID", id);
        console.log("datos", data);
        this.projectReport = data.data[0];
        console.log("projecto", this.projectReport, projectsReportActivitiesRepository);
        this.getProject(this.projectReport.projectId);
        console.log(this.projectReport);
        this.projectForm.invoicedDate = this.projectReport.invoicedDate;
        this.projectForm.customerApprovedDate = this.projectReport.customerApprovedDate;
        this.projectForm.paidDate = this.projectReport.paidDate;
        this.projectForm.status = projectsReportActivitiesRepository.GetStatus(this.projectReport.state).value;
        this.projectForm.projectReportDate = this.projectReport.projectReportDate;
        if (this.projectReport.state == "G") {
          //Generado
          this.visibleButtonApprove = false;
          this.visibleButtonInvoice = false;
          this.visibleButtonPaid = false;
          this.visibleButtonSendToCustomer = true;
          this.visibleButtonReject = false;
        } else if (this.projectReport.state == "C") {
          //Enviado al cliente
          this.visibleButtonApprove = true;
          this.visibleButtonInvoice = false;
          this.visibleButtonPaid = false;
          this.visibleButtonSendToCustomer = false;
          this.visibleButtonReject = true;
        } else if (this.projectReport.state == "A") {
          //Aprobado
          this.visibleButtonApprove = false;
          this.visibleButtonInvoice = true;
          this.visibleButtonPaid = false;
          this.visibleButtonSendToCustomer = false;
          this.visibleButtonReject = false;
        } else if (this.projectReport.state == "R") {
          //Regresar con observaciones
          this.visibleButtonApprove = false;
          this.visibleButtonInvoice = false;
          this.visibleButtonPaid = false;
          this.visibleButtonSendToCustomer = true;
          this.visibleButtonReject = false;
        } else if (this.projectReport.state == "F") {
          //Facturado
          this.visibleButtonApprove = false;
          this.visibleButtonInvoice = false;
          this.visibleButtonPaid = true;
          this.visibleButtonSendToCustomer = false;
          this.visibleButtonReject = false;
        } else if (this.projectReport.state == "P") {
          //Pagado
          this.visibleButtonApprove = false;
          this.visibleButtonInvoice = false;
          this.visibleButtonPaid = false;
          this.visibleButtonSendToCustomer = false;
          this.visibleButtonReject = false;
        }
        data.totalCount = data.data.length;
        this.showWhenLoad = true;
        this.loadIndicatorVisible = false;

        console.log("moounted", ["G"].includes(this.projectReport.state), this.projectReport);
      }
    },
    getProjectById: async function (id) {
      const { data } = await projectsRepository.Get("ID", id);
      
      this.project = data.data[0];
      data.totalCount = data.data.length;
      this.showWhenLoad = true;
      this.loadIndicatorVisible = false;

      
    },
  },
  async mounted() {
    let idProject = this.$route.params.id;
    await this.validateUser();
    //await this.getProjectById(idProject);
    //await this.getTaskActivities(idProject);
    console.log("moounted", ["G"].includes(this.project.state), this.project);
    await this.getProjectReportById(idProject);
  },
};
</script>