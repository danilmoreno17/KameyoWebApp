<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12 cont">
          <DxForm :form-data="project" :col-count="2">
            <DxGroupItem :col-count="2">
              <div class="dx-field">
                <div class="dx-field-label">Subsidiaria</div>
                <div class="dx-field-value">
                  <DxSelectBox
                    :items="subsidiary"
                    placeholder="Seleccionar..."
                    @value-changed="subsidiaryChange"
                    display-expr="name"
                    v-model:value="idSubsidiary"
                    :search-enabled="true"
                    :search-mode="searchModeOption"
                    :search-expr="searchExprOption"
                    :search-timeout="searchTimeoutOption"
                    :min-search-length="minSearchLengthOption"
                    :show-data-before-search="showDataBeforeSearchOption"
                    value-expr="id"
                  ></DxSelectBox>
                </div>
              </div>

              <div class="dx-field">
                <div class="dx-field-label">Cliente</div>
                <div class="dx-field-value">
                  <DxSelectBox
                    :items="customer"
                    placeholder="Seleccionar..."
                    @value-changed="customerChange"
                    display-expr="name"
                    v-model:value="idCustomer"
                    value-expr="id"
                    data-field="Position"
                    search-enable="true"
                    id="idcustomer"
                    :search-enabled="true"
                    :search-mode="searchModeOption"
                    :search-expr="searchExprOption"
                    :search-timeout="searchTimeoutOption"
                    :min-search-length="minSearchLengthOption"
                    :show-data-before-search="showDataBeforeSearchOption"
                  ></DxSelectBox>
                </div>
              </div>
            </DxGroupItem>
            <DxGroupItem :col-count="2">
              <div class="dx-field">
                <div class="dx-field-label">Proyecto</div>
                <div class="dx-field-value">
                  <DxSelectBox
                    :items="project"
                    placeholder="Seleccionar..."
                    @value-changed="projectChange"
                    display-expr="name"
                    v-model:value="idProject"
                    value-expr="id"
                    id="idproject"
                    :search-enabled="true"
                    :search-mode="searchModeOption"
                    :search-expr="searchExprOption"
                    :search-timeout="searchTimeoutOption"
                    :min-search-length="minSearchLengthOption"
                    :show-data-before-search="showDataBeforeSearchOption"
                  ></DxSelectBox>
                </div>
              </div>
              <div class="dx-field">
                <div class="dx-field-label">Tarea</div>
                <div class="dx-field-value">
                  <DxSelectBox
                    :items="task"
                    placeholder="Seleccionar..."
                    @value-changed="taskChange"
                    display-expr="name"
                    value-expr="id"
                    v-model:value="idTask"
                    id="idtask"
                    :search-enabled="true"
                    :search-mode="searchModeOption"
                    :search-expr="searchExprOption"
                    :search-timeout="searchTimeoutOption"
                    :min-search-length="minSearchLengthOption"
                    :show-data-before-search="showDataBeforeSearchOption"
                  ></DxSelectBox>
                </div>
              </div>
            </DxGroupItem>
          </DxForm>
        </div>
      </div>
      <div class="row clearfix">
        <div class="col-md-12 cont">
          <DxDataGrid
            id="dataGridActivities"
            :data-source="dataSource"
            :show-borders="true"
            :column-auto-width="true"
            :repaint-changes-only="true"
            :remote-operations="true"
            @exporting="onExporting"
            @init-new-row="initNewRow"
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
              :display-mode="displayMode"
              :show-page-size-selector="true"
              :show-info="false"
              :show-navigation-buttons="true"
            />

            <DxEditing
              :refresh-mode="refreshMode"
              :allow-updating="allowEditing"
              :allow-adding="this.idTask != 0"
              :allow-deleting="allowEditing"
              mode="popup"
            >
              <DxScrolling row-rendering-mode="virtual" />
              <DxPaging :page-size="10" />
              <DxPopup :show-title="true" :width="700" :height="600" title="Registro de Actividades" />
              <DxFormGrid>
                <DxItem :col-count="2" :col-span="2" item-type="group">
                  <DxItem data-field="startDate" />
                  <DxItem data-field="endDate" />
                  <DxItem data-field="totalTimeHour" />
                  <DxItem data-field="employeeId" />
                </DxItem>
                <DxItem :col-count="1" :col-span="2" item-type="group">
                  <DxItem data-field="description" editor-type="dxTextArea" />
                  <DxItem data-field="isBillable" />
                </DxItem>
              </DxFormGrid>
            </DxEditing>
            <DxColumn :width="250" data-field="description" caption="Descripcion">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn
              :width="150"
              data-field="startDate"
              caption="Fecha de inicio"
              :set-cell-value="setFullDates"
              @value-changed="editDate"
              data-type="datetime"
              editorType="dxDateBox"
            >
              <DxRequiredRule />
            </DxColumn>
            <DxColumn
              :width="150"
              data-field="endDate"
              :set-cell-value="setFullDates"
              editorType="dxDateBox"
              @value-changed="editDate"
              data-type="datetime"
              caption="Fecha de fin"
            >
              <DxRequiredRule />
            </DxColumn>

            <DxColumn :width="150" data-field="employeeId" caption="Empleado">
              <DxLookup :data-source="employee" value-expr="id" display-expr="name" />
              <DxRequiredRule />
              <DxHeaderFilter :allow-search="true" />
            </DxColumn>
            <DxColumn :width="150" data-field="isBillable" caption="Facturable" editorType="dxCheckBox"> </DxColumn>
            <DxColumn
              :width="150"
              :calculate-cell-value="calculateCellValue"
              :set-cell-value="setHourSetValue"
              data-field="totalTimeHour"
              caption="Tiempo Total"
              :allow-editing="false"
              type="fixedPoint"
              :show-spin-buttons="true"
              :show-clear-button="true"
            >
              <DxRequiredRule />
            </DxColumn>

            <DxColumn type="buttons" :width="100">
              <DxButton name="delete" />
              <DxButton hint="Clone" icon="copy" />
            </DxColumn>
            <DxSummary>
              <DxTotalItem column="totalTimeHour" summary-type="sum" />
            </DxSummary>
          </DxDataGrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxForm, DxSimpleItem, DxGroupItem, DxItem, DxLabel } from "devextreme-vue/form";

import DxNumberBox from "devextreme-vue/number-box";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";

import { DxTextArea } from "devextreme-vue/text-area";
import {
  DxDataGrid,
  DxPopup,
  DxColumn,
  DxForm as DxFormGrid,
  DxExport,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxEditing,
  DxFilterRow,
  DxLookup,
  DxScrolling,
  DxHeaderFilter,
  DxSummary,
  DxTotalItem,
} from "devextreme-vue/data-grid";

import { DxButton } from "devextreme-vue/button";

import CustomStore from "devextreme/data/custom_store";

//import $ from "jquery";
//import "devextreme/integration/jquery";
//import "devextreme/dist/js/dx.all.js";
import { DxSelectBox } from "devextreme-vue/select-box";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");

import { DxResponsiveBox, DxCol, DxRow } from "devextreme-vue/responsive-box";
const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;

const subsidiariesRepository = RepositoryFactory.get("subsidiaries");
const customersRepository = RepositoryFactory.get("customers");
const projectsRepository = RepositoryFactory.get("projects");
const projectTasksRepository = RepositoryFactory.get("projectTasks");
const employeesRepository = RepositoryFactory.get("employees");

const URLEmployees = `${BASE_DOMAIN}/api/employee`;
const URLProjectResources = `${BASE_DOMAIN}/api/ProjectResources`;
const URLTaskActitivy = `${BASE_DOMAIN}/api/taskactivities`;

import { authUserStore } from "../../stores/auth";

//import { Workbook } from "exceljs";
//import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "ActivitiesView",
  components: {
    BreadCrumb,
    DxTextArea,
    DxForm,
    DxFormGrid,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxSelectBox,
    DxPopup,
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxGroupPanel,
    DxPager,
    DxPaging,
    DxSearchPanel,
    DxEditing,
    DxExport,
    DxRequiredRule,
    DxFilterRow,
    DxScrolling,
    DxButton,
    DxNumberBox,
    DxItem,
    DxHeaderFilter,
    DxLookup,
    DxSummary,
    DxTotalItem,
  },
  data() {
    return {
      idSubsidiary: 0,
      idCustomer: 0,
      idProject: 0,
      idTask: 0,
      idEmployee: 0,
      subsidiary: [],
      customer: [],
      project: [],
      task: [],
      employee: new CustomStore({
        key: "id",
        load: () => {
          if (this.idProject != 0) {
            return this.sendRequest(`${URLProjectResources}`, "GET", {
              Field: "ProjectId",
              Value: this.idProject,
            }).then((data) => {
              let datos = data.map((e) => ({ id: e.employeeId, name: e.employeName }));
              console.log("employee load", datos);

              return datos;
            });
          } else return null;
        },
        byKey: (key) => {
          return this.sendRequest(`${URLProjectResources}`, "GET", {
            Field: "EmployeeId",
            Value: key,
          }).then((data) => {
            let datos = data.map((e) => ({ id: e.employeeId, name: e.employeName }));
            console.log("employee byKey", datos);
            return datos;
            //console.log("data", data);
          });
        },
      }),
      dataSource: {},
      full: true,
      searchModeOption: "contains",
      searchExprOption: "name",
      searchTimeoutOption: 200,
      minSearchLengthOption: 0,
      showDataBeforeSearchOption: false,
      displayMode: "full",
      setHourSetValue(rowData, value, currentRowData) {
        console.log("setHourSetValue", rowData, value, currentRowData);
        if (currentRowData.id != undefined) {
          if (currentRowData.hourSet == currentRowData.hourBalance) rowData.hourBalance = value;
        } else {
          rowData.hourBalance = value;
        }
        this.defaultSetCellValue(rowData, value);
      },
      setFullDates(rowData, value, currentRowData) {
        console.log("setFullDates", rowData, value, currentRowData);
        if (currentRowData.startDate != undefined && value != undefined) {
          const diffTime = value - new Date(currentRowData.startDate); // Math.abs(value - new Date(currentRowData.startDate));
          const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
          rowData.durationHour = diffHours.toFixed(2);
        }
        if (currentRowData.endDate != undefined && value != undefined) {
          const diffTime = new Date(currentRowData.endDate) - value; //Math.abs(new Date(currentRowData.endDate) - value);
          const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
          rowData.durationHour = diffHours.toFixed(2);
        }
        this.defaultSetCellValue(rowData, value);
      },
      refreshMode: "reshape",
      allowAdding: (e) => {
        console.log("permite agregar", this.idTask);
        return !e == null;
        return this.idTask > 0 && this.idTask != null;
      },
    };
  },
  methods: {
    logEvent: (mensaje, e) => {
      console.log(mensaje, e);
    },
    subsidiaryChange: async function (e) {
      this.customer = [];
      this.project = [];
      this.task = [];
      this.dataSource = null;
      let param = [];
      param["skip"] = 0;
      param["take"] = 0;
      param["requireTotalCount"] = true;
      param["filter"] = '["subsidiaryId","=","' + e.value + '"]';
      const { data } = await customersRepository.GetWithFilter(param);
      this.customer = data.data;
      this.idCustomer = 0;
      this.idProject = 0;
      this.idTask = 0;
    },
    customerChange: async function (e) {
      this.project = [];
      this.task = [];
      this.dataSource = null;
      let param = [];
      param["skip"] = 0;
      param["take"] = 0;
      param["requireTotalCount"] = true;
      param["filter"] = '["CustomerId","=","' + e.value + '"]';
      let { data } = await projectsRepository.GetWithFilter(param);
      //data = {data:data.data, totalCount: data.data.length};
      console.log(data);
      this.project = data.data; //data.data;
      this.idProject = 0;
      this.idTask = 0;
    },
    projectChange: async function (e) {
      this.task = [];
      let param = [];
      this.dataSource = null;
      param["skip"] = 0;
      param["take"] = 0;
      param["requireTotalCount"] = true;
      param["filter"] = '["projectId","=","' + e.value + '"]';

      const { data } = await projectTasksRepository.GetWithFilter(param);

      this.task = data.data;

      this.idTask = 0;
    },
    taskChange: async function (e) {
      console.log("taskchange");
      this.loadDataSource(e.value);
    },
    getSubsidiaries: async function () {
      const { data } = await subsidiariesRepository.GetWithPagination({});
      this.subsidiary = data.data;
    },
    initNewRow: async function (e) {
      e.data.isBillable = true;
    },
    getEmployees: async function () {
      if (this.idProject != 0) {
        return this.sendRequest(`${URLProjectResources}`, "GET", {
          Field: "ProjectId",
          Value: this.idProject,
        }).then((data) => {
          let datos = data.map((e) => ({ id: e.employeeId, name: e.employeName }));
          console.log("employee load", datos);

          return datos;
        });
      }
    },

    loadDataSource: async function (valor) {
      this.dataSource = new CustomStore({
        key: "id",
        load: (loadOptions) => {
          if (this.idTask != null) {
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
            return this.sendRequest(`${URLTaskActitivy}/filter/${valor}`, "GET", params).then((data) => {
              console.log("sendrequet", data);
              //data.totalCount = data.length;
              /*
                return {
                  data: data,
                  totalCount: data.length,
                  //summary: data.data.summary,
                  //groupCount: data.data.groupCount,
                };
                */
              return data;
              //return data;
            });
          }
        },
        insert: (values) => {
          values.ProjectTaskId = this.idTask;
          values.ProjectId = this.idProject;
          //values.EmployeId = "78EBF29F-DCFE-4E3C-BF77-069B158262E8";
          console.log("insert", values);
          return this.sendRequest(`${URLTaskActitivy}`, "POST", {
            values: JSON.stringify(values),
          });
        },
        update: (key, values) => {
          values.id = key;
          console.log("update", values);
          return this.sendRequest(`${URLTaskActitivy}`, "PUT", {
            key,
            values: JSON.stringify(values),
          });
        },
        remove: (key) => {
          return this.sendRequest(`${URLTaskActitivy}/${key}`, "DELETE", {});
        },
        byKey: (key) => {
          return this.sendRequest(`${URLTaskActitivy}`, "GET", {
            Field: "ID",
            Value: key,
          }).then((data) => {
            return data;
            //console.log("data", data);
          });
        },
      });
    },
    /*
    allowAdding(e) {
      console.log("permite agregar", this.idTask);
      return !e == null;
      return this.idTask > 0 && this.idTask != null;
    },
    */
    calculateCellValue(data) {
      let startDate = new Date(data.startDate);
      let endDate = new Date(data.endDate);
      var hours = parseFloat(Math.abs(endDate.getTime() - startDate.getTime()) / 3600000);

      data.totalTimeHour = hours;
      //console.log("datos change", data, hours, this);
      if (!isNaN(hours)) return hours.toFixed(2);
      else return 0;
    },
    editDate: (e) => {
      console.log("cambio de valor fecha", e);
    },
    allowEditing(e) {
      return !e.row.data.inProjectReport;
    },

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
    onExporting(e) {
      /*
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Clientes");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Clientes.xlsx");
        });
      });
      e.cancel = true;
      */
    },
    getPermissions: () => {
      const authStore = authUserStore();
      if (authStore.isAuthenticated) {
        const authUser = authStore.getAuthenticatedUser;
        console.log("typeid", authStore.getUserType.personTypeId);
        console.log("authUser from activityview ", authUser);
      }
    },
  },
  async mounted() {
    await this.getSubsidiaries();
    await this.getEmployees();
    await this.getPermissions();
  },
};
</script>
<style>
.cont {
  background-color: white;
  padding-top: 20px;
}

#dataGridActivities {
  height: 450px;
  width: 100%;
}
</style>