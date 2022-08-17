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
                    @value-changed="loadDataSource"
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

            <DxGroupItem :col-count="3">
              <div class="dx-field">
                <div class="dx-field-label">Año</div>
                <div class="dx-field-value">
                  <DxSelectBox
                    :items="years"
                    @value-changed="loadDataSource"
                    display-expr="text"
                    v-model:value="year"
                    value-expr="value"
                    search-enable="true"
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
                <div class="dx-field-label">Mes</div>
                <div class="dx-field-value">
                  <DxSelectBox
                    :items="months"
                    @value-changed="loadDataSource"
                    display-expr="text"
                    v-model:value="month"
                    value-expr="value"
                    search-enable="true"
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
        <div class="row clearfix">
          <div class="col-md-12 cont">
            <DxDataGrid
              id="dataGridActivities"
              :show-borders="true"
              :data-source="dataSource"
              :column-auto-width="true"
              :repaint-changes-only="true"
              :remote-operations="true"
            >
              <DxColumn :allow-editing="false" :width="300" data-field="name" caption="Nombre">
                <DxRequiredRule />
              </DxColumn>
              <DxColumn
                :allow-editing="false"
                data-field="startDate"
                data-type="date"
                format="yyyy-MM-dd"
                caption="Fecha Inicio"
              >
                <DxRequiredRule />
              </DxColumn>
              <DxColumn
                :allow-editing="false"
                data-field="endDate"
                data-type="date"
                format="yyyy-MM-dd"
                caption="Fecha Fin"
              >
                <DxRequiredRule />
              </DxColumn>

              <DxColumn
                :width="150"
                alignment="center"
                data-field="InProjectReport"
                caption="Generar"
                editorType="dxCheckBox"
              >
                <DxRequiredRule />
              </DxColumn>
              <DxColumn type="buttons" :width="110">
                <DxButton name="delete" />
                <DxButton hint="Clone" icon="copy" />
              </DxColumn>

              <DxEditing :allow-updating="true" :refresh-mode="'full'" mode="row">
                <DxFilterRow :visible="true" />
                <DxScrolling row-rendering-mode="virtual" />
                <DxPaging :page-size="10" />
              </DxEditing>
            </DxDataGrid>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomStore from "devextreme/data/custom_store";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { DxForm, DxSimpleItem, DxGroupItem, DxLabel } from "devextreme-vue/form";
import { DxSelectBox } from "devextreme-vue/select-box";
import DxDateBox from "devextreme-vue/date-box";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import DxNumberBox from "devextreme-vue/number-box";
import DxButton from "devextreme-vue/button";
import {
  DxDataGrid,
  DxColumn,
  DxPopup,
  DxGrouping,
  DxGroupPanel,
  DxPager,
  DxPaging,
  DxSearchPanel,
  DxEditing,
  DxFilterRow,
  DxScrolling,
  DxLookup,
  DxHeaderFilter,
} from "devextreme-vue/data-grid";
import { authUserStore } from "../../stores/auth";

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;

const subsidiariesRepository = RepositoryFactory.get("subsidiaries");
const customersRepository = RepositoryFactory.get("customers");
const projectsRepository = RepositoryFactory.get("projects");
const projectTasksRepository = RepositoryFactory.get("projectTasks");
const projectsReportRepository = RepositoryFactory.get("projectReport");

const URLTaskActitivy = `${BASE_DOMAIN}/api/taskactivities`;
const URLEmployees = `${BASE_DOMAIN}/api/employee`;
const URLProjectTasks = `${BASE_DOMAIN}/api/projectTasks`;
const URLProjects = `${BASE_DOMAIN}/api/ProjectReport`;

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
export default {
  name: "ActivitiesView",
  components: {
    BreadCrumb,
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxLabel,
    DxNumberBox,
    DxRequiredRule,
    DxPopup,
    DxSelectBox,
    DxDateBox,
    DxButton,
    DxDataGrid,
    DxColumn,
    DxGrouping,
    DxGroupPanel,
    DxPager,
    DxPaging,
    DxSearchPanel,
    DxEditing,
    DxFilterRow,
    DxScrolling,
    DxLookup,
    DxHeaderFilter,
  },
  data() {
    return {
      idSubsidiary: 0,
      idCustomer: 0,
      idProject: 0,
      idTask: 0,
      years: [],
      months: [],
      year: 0,
      userName:'',
      month: 0,
      dataSource: {},
      subsidiary: [],
      customer: [],
      project: [],
      task: [],
      searchModeOption: "contains",
      searchExprOption: "name",
      searchTimeoutOption: 200,
      minSearchLengthOption: 0,
      showDataBeforeSearchOption: false,
      employee: new CustomStore({
        key: "id",
        load: () => {
          return this.sendRequest(`${URLEmployees}/paginated`, "GET", {}).then((data) => {
            let datos = data.map((e) => ({ id: e.id, name: `${e.lastName} ${e.names}` }));
            console.log("carga", datos);
            return datos;
          });
        },
        byKey: (key) => {
          return this.sendRequest(`${URLEmployees}`, "GET", {
            Field: "ID",
            Value: key,
          }).then((data) => {
            let datos = data.map((e) => ({ id: e.id, name: `${e.lastName} ${e.names}` }));
            return datos;
            //console.log("data", data);
          });
        },
      }),
      projects: new CustomStore({
        key: "id",
        load: () => {
          return this.sendRequest(`${URLProjectTasks}/paginated`, "GET", {}).then((data) => {
            return data;
          });
        },
        byKey: (key) => {
          return this.sendRequest(`${URLProjectTasks}`, "GET", {
            Field: "ID",
            Value: key,
          }).then((data) => {
            return data;
          });
        },
      }),
    };
  },
  methods: {
    subsidiaryChange: async function (e) {
      this.customer = null;
      this.project = [];
      this.task = [];
      let param = [];
      param["skip"] = 0;
      param["take"] = 0;
      param["requireTotalCount"] = true;
      param["filter"] = '["subsidiaryId","=","' + e.value + '"]';
      const { data } = await customersRepository.GetWithFilter(param);
      
      this.customer = data.data.data;
      this.idCustomer = 0;
      this.idProject = 0;
      this.idTask = 0;
      //$("#idcustomer").dxSelectBox("instance").option("value", 0);
      //$("#idproject").dxSelectBox("instance").option("value", 0);
      //$("#idtask").dxSelectBox("instance").option("value", 0);
    },
    customerChange: async function (e) {
      this.project = [];
      this.task = [];
      this.dataSource = {};
      let param = [];
      param["skip"] = 0;
      param["take"] = 0;
      param["requireTotalCount"] = true;
      param["filter"] = '["CustomerId","=","' + e.value + '"]';
      const { data } = await projectsRepository.GetWithFilter(param);
      this.project = data.data.data;
      //$("#idproject").dxSelectBox("instance").option("value", 0);
      //$("#idtask").dxSelectBox("instance").option("value", 0);
      this.idProject = 0;
      this.idTask = 0;
    },
    validateUser: async function () {
      const authStore = authUserStore();
      if (authStore.isAuthenticated) {
        const authUser = authStore.getAuthenticatedUser;
        this.userName = authUser.userName;
        console.log(this.userName);
       
      }
    },
    projectChange: async function (e) {
      this.task = [];
      let param = [];
      this.dataSource = {};
      param["skip"] = 0;
      param["take"] = 0;
      param["requireTotalCount"] = true;
      param["filter"] = '["projectId","=","' + e.value + '"]';

      const { data } = await projectTasksRepository.GetWithFilter(param);

      this.task = data.data.data;

      this.idTask = 0;
      //$("#idtask").dxSelectBox("instance").option("value", 0);
    },
    taskChange: async function (e) {},
    getSubsidiaries: async function () {
      const { data } = await subsidiariesRepository.GetWithPagination({});
      this.subsidiary = data.data;
    },
    handleSearch: async function (e) {
      console.log("buscar", e);
      this.loadDataSource(22);
    },
    right: (str, chr) => {
      return str.substr(str.length - chr, str.length);
    },
    loadPeriods: async function () {
      //console.log(`${URLProjectTasks}/paginated`);
      const month = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];

      let d = new Date();
      for (let i = 0; i < 12; i++) {
        this.months = [...this.months, { value: i + 1, text: month[i] }];
      }

      for (let i = 2018; i <= d.getFullYear(); i++) {
        this.years = [...this.years, { value: i, text: `${i}` }];
      }
    },
    loadDataSource: async function (valor) {
      console.log("carga data", this.year, this.month, this.idCustomer);
      if (this.year != 0 && this.month != 0 && this.idCustomer != 0)
        this.dataSource = new CustomStore({
          key: "id",
          load: (loadOptions) => {
            console.log(loadOptions, loadOptions.filter, loadOptions.length);
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
            //params["filter"] = '["ProjectTaskId","=","' + valor + '"]';

            console.log(params);
            return this.sendRequest(
              `${URLProjects}/generator/${this.idCustomer}/${this.year}/${this.month}`,
              "GET",
              params
            ).then((data) => {
              console.log(projectsReportRepository);
              console.log("datos,", `${URLProjects}/generator/${this.idCustomer}/${this.year}/${this.month}`, data);
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
          byKey: (key) => {
            return this.sendRequest(`${URLProjects}`, "GET", {
              Field: "ID",
              Value: key,
            }).then((data) => {
              return data;
              //console.log("data", data);
            });
          },
          update: (key, values) => {
            //values.id = key;
            const d = new Date();
            values.ProjectId = key;
            values.ProjectReportDate = d;
            values.state = "G";
            values.by = this.userName;
            values.year = this.year;
            values.month = this.month;
            values.Period = this.periodo;
            console.log(key, values);

            return this.sendRequest(`${URLProjects}`, "POST", {
              values: JSON.stringify(values),
            });
          },
        });
    },
    addMonth: (date, months) => {
      return new Date(date.setMonth(date.getMonth() + months));
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
  },
  async mounted() {
    await this.validateUser();
    await this.getSubsidiaries();
    await this.loadDataSource(22);
    await this.loadPeriods();

    let d = new Date();
    this.year = d.getFullYear();
    this.month = d.getMonth() + 1;
  },
};
</script>

