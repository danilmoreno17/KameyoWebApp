<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <DxLabel text="Nombre de empleado" />
      <div class="row clearfix">
        <DxForm :form-data="participation" :items="['name']" :col-count="4">
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
            <DxLabel text="Valor" />
          </DxSimpleItem>

          <DxGroupItem :col-count="3">
            <DxButton
              :width="120"
              text="Aprobar"
              type="success"
              styling-mode="contained"
              @click="handleApprove(e, 'A')"
              :visible="visibleButtonApprove"
            />
            <DxButton
              text="Rechazar"
              type="danger"
              styling-mode="contained"
              @click="handleApprove(e, 'R')"
              :visible="visibleButtonReject"
            />
          </DxGroupItem>
        </DxForm>

        <DxDataGrid
          id="dataGridProject"
          :data-source="dataSource"
          :show-borders="true"
          :visible="this.participation.type == 'D' && this.lengthOfRows > 0"
          :repaint-changes-only="true"
          :remote-operations="true"
          key-expr="id"
        >
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

          <DxColumn :width="150" data-field="projectReport.customerApprovedDate" caption="Fecha" :allow-editing="false">
          </DxColumn>
          <DxColumn :width="150" data-field="projectReport.customerName" caption="Cliente" :allow-editing="false">
          </DxColumn>
          <DxColumn :width="150" data-field="projectReport.project.name" caption="Proyecto" :allow-editing="false">
          </DxColumn>
          <DxColumn data-field="taskActivity.description" caption="Descripcion" :allow-editing="false"> </DxColumn>
          <DxColumn data-field="taskActivity.calculateFactor" caption="Factor" :allow-editing="false"> </DxColumn>
          <DxColumn data-field="taskActivity.startDate" caption="Incio" :allow-editing="false"> </DxColumn>
          <DxColumn data-field="taskActivity.endDate" caption="Fin" :allow-editing="false"> </DxColumn>

          <DxColumn data-field="taskActivity.totalTimeHourApproved" caption="Aprobado" :allow-editing="false">
          </DxColumn>
          <DxColumn data-field="taskActivity.totalCost" caption="Part. Apr." :allow-editing="false"> </DxColumn>
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
} from "devextreme-vue/data-grid";

import BreadCrumb from "@/components/BreadCrumb.vue";
import CustomStore from "devextreme/data/custom_store";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import DxButton from "devextreme-vue/button";
const financialParticipationRepository = RepositoryFactory.get("financialParticipation");

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
  },
  data() {
    return {
      projectReportDetail: {},
      dataSource: {},
      lengthOfRows: 0,
      visibleButtonReject: false,
      visibleButtonApprove: false,
      participation: {
        type: "",
        status: "",
        details: [],
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
    handleApprove: async function (e, state) {
      let values = { id: this.$route.params.id, status: state };
      let response = await financialParticipationRepository.Update(values);
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
    loadProject: async function (idProject) {
      const { data } = await financialParticipationRepository.Get("ID", idProject);

      this.participation = data.data[0];
      this.participation.period = data.data[0].year + "0" + data.data[0].month;
      this.participation.statusStr = financialParticipationRepository.GetStatus(data.data[0].status);
      this.participation.typeStr = financialParticipationRepository.GetType(data.data[0].type);
      console.log("participacion", this.participation);
      if (this.participation.type == "D")
        await this.loadTaskActivities(this.participation.employeeId, data.data[0].year, data.data[0].month);
      if (this.participation.status == "A" || this.participation.status == "R") {
        this.visibleButtonApprove = false;
        this.visibleButtonReject = false;
      } else if (this.participation.status == "G") {
        this.visibleButtonApprove = true;
        this.visibleButtonReject = true;
      }
    },
    loadTaskActivities: async function (employeeId, year, month) {
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
            .GetWithFilterTaskActivities(employeeId, year, month, params)
            .then((e) => {
              this.lengthOfRows = e.data.data.totalCount;
              console.log("lengthofrows", this.lengthOfRows);
              return e.data.data;
            });
        },
      });
    },
  },

  async mounted() {
    let idProject = this.$route.params.id;
    await this.loadProject(idProject);

    console.log("moounted");
    console.log(idProject);
  },
};
</script>