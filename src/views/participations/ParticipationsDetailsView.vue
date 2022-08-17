<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>

      <div class="row clearfix">
        <div class="col-md-12 cont">
          <DxForm
            :form-data="participation"
            :items="['name']"
            :col-count="this.participation.type == 'D' && this.lengthOfRows > 0 ? 4 : 2"
          >
            <DxSimpleItem
              :editor-options="{
                readOnly: true,
              }"
              data-field="dateFormat"
            >
              <DxLabel text="Fecha" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                readOnly: true,
              }"
              data-field="employee.fullName"
            >
              <DxLabel text="Empleado" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                readOnly: true,
              }"
              data-field="period"
            >
              <DxLabel text="Periodo" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                readOnly: true,
              }"
              data-field="typeStr.value"
            >
              <DxLabel text="Tipo" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                readOnly: true,
              }"
              data-field="description"
            >
              <DxLabel text="Descripción" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                readOnly: true,
              }"
              :visible="this.participation.catalogDiscretionaryType != null"
              data-field="catalogDiscretionaryType.value"
            >
              <DxLabel text="Tipo de Discrecional" />
            </DxSimpleItem>

            <DxSimpleItem
              :editor-options="{
                readOnly: true,
              }"
              data-field="statusStr.value"
            >
              <DxLabel text="Estado" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                readOnly: true,
              }"
              data-field="value"
            >
              <DxLabel text="Valor (US$)" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                readOnly: true,
              }"
              :visible="this.participation.approvedBy !== null"
              data-field="approvedBy"
            >
              <DxLabel text="Aprobado Por" />
            </DxSimpleItem>
            <DxSimpleItem
              :editor-options="{
                readOnly: true,
              }"
              :visible="this.participation.approvedDate !== null && this.participation.approvedDate !== undefined"
              data-field="approvedDate"
            >
              <DxLabel text="Fecha de Aprobación" />
            </DxSimpleItem>

            <DxGroupItem :col-count="3" :visible="this.canApprove">
              <DxButton
                :width="120"
                text="Aprobar"
                type="success"
                styling-mode="contained"
                @click="handleApprove(e, 'A')"
                :visible="canApprove && visibleButtonApprove"
              />
              <DxButton
                text="Rechazar"
                type="danger"
                styling-mode="contained"
                @click="handleApprove(e, 'R')"
                :visible="canApprove && visibleButtonReject"
              />
            </DxGroupItem>
          </DxForm>
        </div>
        <DxDataGrid
          id="dataGridProject"
          :data-source="dataSource"
          :show-borders="true"
          :visible="this.participation.type == 'D' && this.lengthOfRows > 0"
          :repaint-changes-only="true"
          :remote-operations="true"
          :allow-column-reordering="true"
          :allow-column-resizing="true"
          :column-auto-width="true"
          key-expr="id"
        >
          <DxColumnChooser :enabled="true" />
          <DxColumnFixing :enabled="true" />
          <DxHeaderFilter :visible="true" />
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
            :show-page-size-selector="true"
            :show-info="false"
            :show-navigation-buttons="true"
          />

          <DxColumn
            :width="150"
            :visible="false"
            data-type="date"
            format="yyyy-MM-dd HH:mm:ss"
            data-field="projectReport.customerApprovedDate"
            caption="Fecha Aprob."
            :allow-editing="false"
          >
          </DxColumn>
          <DxColumn :width="150" data-field="projectReport.customerName" caption="Cliente" :allow-editing="false">
          </DxColumn>
          <DxColumn :width="150" data-field="projectReport.project.name" caption="Proyecto" :allow-editing="false">
          </DxColumn>
          <DxColumn data-field="taskActivity.description" caption="Descripcion" :allow-editing="false"> </DxColumn>

          <DxColumn
            data-field="taskActivity.startDate"
            data-type="date"
            format="yyyy-MM-dd HH:mm:ss"
            caption="Inicio"
            :allow-editing="false"
          >
          </DxColumn>
          <DxColumn
            data-field="taskActivity.endDate"
            data-type="date"
            format="yyyy-MM-dd HH:mm:ss"
            caption="Fin"
            :allow-editing="false"
          >
          </DxColumn>
          <DxColumn :visible="false" data-field="taskActivity.calculateFactor" caption="Factor" :allow-editing="false">
          </DxColumn>

          <DxColumn data-field="taskActivity.totalTimeHourApproved" caption="H. Aprob." :allow-editing="false">
          </DxColumn>
          <DxColumn data-field="billedHours" caption="H. Fact." :allow-editing="false"> </DxColumn>
          <DxColumn data-field="taskActivity.totalCost" caption="Costo" :allow-editing="false"> </DxColumn>
          <DxColumn
            data-field="approvedParticipation"
            :format="saleAmountFormat"
            format="currency"
            caption="Partc. Aprob."
            :allow-editing="false"
          >
          </DxColumn>
          <DxSummary>
            <DxTotalItem column="taskActivity.totalTimeHourApproved" summary-type="sum" />
            <DxTotalItem column="billedHours" summary-type="sum" />
            <DxTotalItem column="taskActivity.totalCost" summary-type="sum" format="currency" />
            <DxTotalItem
              column="approvedParticipation"
              :format="saleAmountFormat"
              summary-type="sum"
              format="currency"
            />
          </DxSummary>
        </DxDataGrid>
      </div>
    </div>
  </div>
</template>

<script>
import { DxForm, DxSimpleItem, DxGroupItem, DxLabel } from "devextreme-vue/form";
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

import { authUserStore } from "../../stores/auth";
import moment from "moment";
import BreadCrumb from "@/components/BreadCrumb.vue";
import CustomStore from "devextreme/data/custom_store";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import DxButton from "devextreme-vue/button";
const financialParticipationRepository = RepositoryFactory.get("financialParticipation");
const authenticateRepository = RepositoryFactory.get("authenticate");

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "DirectParticipation",
  components: {
    BreadCrumb,
    DxForm,
    DxButton,
    DxSimpleItem,
    DxGroupItem,
    DxLabel,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxRequiredRule,
    DxPager,
    DxPaging,
    DxFilterRow,
    DxEditing,
    DxPopupGrid,
    DxLookup,
    DxSearchPanel,
    DxGridForm,
    DxCustomRule,
    DxHeaderFilter,
    DxExport,
    DxGrouping,
    DxGroupPanel,
    DxSummary,
    DxTotalItem,

    DxColumnChooser,
    DxColumnFixing,
  },
  data() {
    return {
      projectReportDetail: {},
      userName: "",
      dataSource: {},
      lengthOfRows: 0,
      canApprove: false,
      visibleButtonReject: false,
      visibleButtonApprove: false,
      saleAmountFormat: { style: "currency", currency: "USD", useGrouping: true, minimumSignificantDigits: 3 },
      participation: {
        type: "",
        status: "",
        details: [],
        employee: { fullName: "" },
      },
      canApprove: true,
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
    handleApprove: async function (e, state) {
      let values = { id: this.$route.params.id, status: state, approvedBy: this.userName };

      console.log("handleApprove, valor aprobacion", values);
      let response = await financialParticipationRepository.Update(values);

      console.log("handleApprove, valor aprobacion", values);
      this.loadProject(values.id);
      console.log(response);
      /*
      let response = this.sendRequest(`${URLprojectReport}`, "PUT", {
        values: JSON.stringify(values),
      }).then(() => {
        console.log("handleApprove", response, values.id);
        //this.getProjectReportById(values.id);
      });
      */

      return response;
    },
    format_date: (value) => {
      if (value) {
        return moment(String(value)).format("YYYY/MM/DD HH:mm:ss");
      }
    },
    loadProject: async function (idProject) {
      const { data } = await financialParticipationRepository.Get("ID", idProject);

      this.participation = data.data[0];
      console.log("participation", this.participation);
      this.participation.value = data.data[0].value.toFixed(2);
      this.participation.approvedDate = this.format_date(data.data[0].approvedDate);
      this.participation.dateFormat = this.format_date(data.data[0].date);
      this.participation.period = data.data[0].year + "-" + ("0" + data.data[0].month).slice(-2);
      this.participation.statusStr = financialParticipationRepository.GetStatus(data.data[0].status);
      this.participation.typeStr = financialParticipationRepository.GetType(data.data[0].type);
      console.log("participacion", this.participation);
      if (this.participation.type == "D")
        await this.loadTaskActivities(idProject, this.participation.employeeId, data.data[0].year, data.data[0].month);
      if (this.participation.status == "A" || this.participation.status == "R") {
        this.visibleButtonApprove = false;
        this.visibleButtonReject = false;
      } else if (this.participation.status == "G") {
        this.visibleButtonApprove = true;
        this.visibleButtonReject = true;
      }
      console.log("aprobado", this.participation.approvedBy);
    },
    validateUser: async function () {
      const authStore = authUserStore();
      if (authStore.isAuthenticated) {
        const authUser = authStore.getAuthenticatedUser;
        this.userName = authUser.userName;
        authenticateRepository.ValidateUser(this.userName, "Aprobador de Participaciones").then((datosAprobacion) => {
          this.canApprove = datosAprobacion.data.isValid;
        });
        /*
        authenticateRepository.ValidateUser(this.userName, "Aprobador de Participaciones").then((datosAprobacion) => {
          this.canApprove = datosAprobacion.data.isValid;
        });
        */
      }
    },
    loadTaskActivities: async function (financialParticipationId, employeeId, year, month) {
      console.log("load task2", financialParticipationId, employeeId, year, month);
      this.dataSource = new CustomStore({
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
          return financialParticipationRepository
            .GetWithFilterTaskActivities(financialParticipationId, employeeId, year, month, params)
            .then((e) => {
              console.log(e.data.data);
              this.lengthOfRows = e.data.data.totalCount;

              return e.data.data;
            });
        },
      });
    },
  },

  async mounted() {
    this.validateUser();
    let idProject = this.$route.params.id;
    await this.loadProject(idProject);

    console.log("moounted");
    console.log(idProject);
  },
};
</script>
<style>
.dx-field {
  margin: 0 0 5px;
}
.dx-field-value-static {
  white-space: normal;
  padding: 4px 5px;
}
.dx-texteditor.dx-editor-filled.dx-state-disabled .dx-texteditor-input,
.dx-texteditor.dx-editor-filled.dx-state-readonly .dx-texteditor-input,
.dx-texteditor.dx-editor-filled.dx-state-readonly.dx-state-hover .dx-texteditor-input {
  background-color: rgba(255, 255, 255, 0.75);
  /* color: rgba(255,255,255,.75);*/
}
.dx-texteditor-container:hover,
.dx-texteditor-input:hover {
  /*
  border-bottom: solid 1px rgb(0, 226, 226) !important;
  */
}
.dx-button {
  margin-right: 10px;
}
.cont {
  background-color: white;
  padding-top: 20px;
}
</style>