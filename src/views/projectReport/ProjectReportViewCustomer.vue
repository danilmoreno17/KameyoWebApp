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
                    :disabled="hasCustomer"
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
                    v-model:value="idcustomer"
                    value-expr="id"
                    data-field="Position"
                    search-enable="true"
                    id="idcustomer"
                    :disabled="hasCustomer"
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
                <div class="dx-field-label">Período</div>
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
                <div class="dx-field-label">Período</div>
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
              :column-auto-width="false"
              :repaint-changes-only="true"
              :remote-operations="true"
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
                :display-mode="'full'"
                :show-page-size-selector="true"
                :show-info="false"
                :show-navigation-buttons="true"
              />
              <DxColumn
                :allow-editing="false"
                data-field="project.name"
                caption="Nombre"
                cell-template="cell-link-template"
              >
                <DxRequiredRule />
              </DxColumn>
              <DxColumn
                :allow-editing="false"
                :width="170"
                data-field="projectReportDate"
                data-type="date"
                format="yyyy-MM-dd"
                caption="Fecha Generación"
              >
                <DxRequiredRule />
              </DxColumn>
              <DxColumn
                :allow-editing="false"
                :width="150"
                data-field="project.startDate"
                data-type="date"
                format="yyyy-MM-dd"
                caption="Fecha Inicio"
              >
                <DxRequiredRule />
              </DxColumn>
              <DxColumn
                :allow-editing="false"
                :width="150"
                data-field="project.endDate"
                data-type="date"
                format="yyyy-MM-dd"
                caption="Fecha Fin"
              >
                <DxRequiredRule />
              </DxColumn>

              <DxColumn :allow-editing="false" :width="300" data-field="status" caption="Estado">
                <DxRequiredRule />
              </DxColumn>
              <template #cell-link-template="{ data }">
                <cellLink
                  :cell-data="data"
                  :routePath="{
                    name: 'ProjectReportViewDetails',
                    params: { id: data.data.id },
                  }"
                />
              </template>
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
import { DxForm, DxSimpleItem, DxGroupItem, DxLabel, DxItem } from "devextreme-vue/form";
import { DxSelectBox } from "devextreme-vue/select-box";
import DxDateBox from "devextreme-vue/date-box";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import DxNumberBox from "devextreme-vue/number-box";
import DxButton from "devextreme-vue/button";

import {
  DxDataGrid,
  DxColumn,
  DxPopup,
  DxExport,
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

import cellLink from "@/components/DataGrid/CellLinkTemplate.vue";

import { authUserStore } from "../../stores/auth";
const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;

const subsidiariesRepository = RepositoryFactory.get("subsidiaries");
const customersRepository = RepositoryFactory.get("customers");
const contactsRepository = RepositoryFactory.get("contacts");
const URLProjectTasks = `${BASE_DOMAIN}/api/projectTasks`;
const URLProjects = `${BASE_DOMAIN}/api/ProjectReport`;
const projectsReportRepository = RepositoryFactory.get("projectReport");
const authenticateRepository = RepositoryFactory.get("authenticate");

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
    DxExport,
    DxSelectBox,
    DxDateBox,
    DxItem,
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
    cellLink,
  },
  data() {
    return {
      idSubsidiary: 0,
      idcustomer: 0,
      idProject: 0,
      idTask: 0,
      dataSource: {},
      subsidiary: [],
      customer: [],
      project: [],
      task: [],
      years: [],
      months: [],
      year: 0,
      hasCustomer: true,
      month: 0,
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
      //this.idcustomer = 0;
      this.idProject = 0;
      this.idTask = 0;

      //$("#idcustomer").dxSelectBox("instance").option("value", 0);
      //$("#idproject").dxSelectBox("instance").option("value", 0);
      //$("#idtask").dxSelectBox("instance").option("value", 0);
    },

    getSubsidiaries: async function () {
      const { data } = await subsidiariesRepository.GetWithPagination({});
      this.subsidiary = data.data;
    },
    getCustomers: async function () {
      const { data } = await customersRepository.GetWithPagination({});
      console.log(data);
      this.customer = data.data;
    },
    handleSearch: async function (e) {
      console.log("buscar", e);
      this.loadDataSource(22);
    },
    right: (str, chr) => {
      return str.substr(str.length - chr, str.length);
    },
    validateUser: async function () {
      const authStore = authUserStore();
      if (authStore.isAuthenticated) {
        const authUser = authStore.getAuthenticatedUser;
        this.userName = authUser.userName;
        let idCustomerTmp = "";
        authenticateRepository.ValidateUser(this.userName, "Cliente").then((datosAprobacion) => {
          if (datosAprobacion.data.isValid) {
            contactsRepository.Get("Id", datosAprobacion.data.personId).then((datosContact) => {
              idCustomerTmp = datosContact.data.data[0].customerId;
              customersRepository.Get("Id", idCustomerTmp).then((datosCustomer) => {
                this.idSubsidiary = datosCustomer.data.data[0].subsidiaryId;
                this.idcustomer = idCustomerTmp;
                this.hasCustomer = true;
              });
            });
          } else {
            this.hasCustomer = false;
          }
        });
      }
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

      for (let i = d.getFullYear() - 4; i <= d.getFullYear(); i++) {
        this.years = [...this.years, { value: i, text: `${i}` }];
      }
    },
    loadDataSource: async function (valor) {
      console.log("loaddatasourcecharge ", valor);
      if (this.idcustomer != 0)
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
            console.log(`${URLProjects}/filter/bycustomer/${this.idcustomer}/${this.year}/${this.month}/`);

            return this.sendRequest(
              `${URLProjects}/filter/bycustomer/${this.idcustomer}/${this.year}/${this.month}`,
              "GET",
              params
            ).then((data) => {
              console.log("datos,", data);
              //data.totalCount = data.length;
              data.data.map((e) => (e.status = projectsReportRepository.GetStatus(e.state).value));
              return data;
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
    await this.getSubsidiaries();
    //await this.getCustomers();
    //await this.loadDataSource(22);
    await this.loadPeriods();
    await this.validateUser();

    let d = new Date();
    this.year = d.getFullYear();
    this.month = d.getMonth() + 1;
  },
};
</script>
<style>
.dx-texteditor-input, .dx-texteditor-input-container{
  color: black !important;
}
</style>

