<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12 cont">
          <DxForm :form-data="project" :col-count="2">
        

            <DxGroupItem :col-count="1">
              <div class="dx-field">
                <div class="dx-field-label">Año</div>
                <div class="dx-field-value">
                  <DxSelectBox
                    :items="years"
                    @value-changed="changeHandle"
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
            </DxGroupItem>
            <DxGroupItem :col-count="1">
              <div class="dx-field">
                <div class="dx-field-label">Mes</div>
                <div class="dx-field-value">
                  <DxSelectBox
                    :items="months"
                    @value-changed="changeHandle"
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
              :display-mode="displayMode"
              :show-page-size-selector="true"
              :show-info="false"
              :show-navigation-buttons="true"
            />
            <DxColumn :allow-editing="false" data-field="year" caption="Año">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :allow-editing="false" data-field="month" caption="Mes">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :allow-editing="false" data-field="date" caption="Fecha">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :allow-editing="false" :width="150" data-field="employee.fullName" caption="Empleado">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn
              :allow-editing="false"
              :width="150"
              data-field="tipo_str"
              caption="Tipo"
              cell-template="cell-link-template"
            >
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :allow-editing="false" data-field="description" caption="Detalle">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :allow-editing="false" data-field="status_str" caption="Estado">
              <DxRequiredRule />
            </DxColumn>

            <DxColumn :allow-editing="false" :format="saleAmountFormat" data-field="value" caption="Valor">
              <DxRequiredRule />
            </DxColumn>

            <template #cell-link-template="{ data }">
              <cellLink
                :cell-data="data"
                :routePath="{
                  name: 'DirectParticipation',
                  params: { id: data.data.id },
                }"
              />
            </template>
          </DxDataGrid>
        </div>
      </div>
      s
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
const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const subsidiariesRepository = RepositoryFactory.get("subsidiaries");
const employeesRepository = RepositoryFactory.get("employees");

const URLFinantialParticipation = `${BASE_DOMAIN}/api/FinancialParticipation`;
const FinantialParticipationRepository = RepositoryFactory.get("financialParticipation");

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "ApproveParticipationsView",
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
      years: [],
      dataSource: {},
      employeeParentId: "78ebf29f-dcfe-4e3c-bf77-069b158262e8",
      subsidiary: [],
      months: [],
      year: 0,
      month: 0,
      searchModeOption: "contains",
      searchExprOption: "name",
      searchTimeoutOption: 200,
      minSearchLengthOption: 0,
      showDataBeforeSearchOption: false,
      saleAmountFormat: { style: "currency", currency: "USD", useGrouping: true, minimumSignificantDigits: 3 },
    };
  },
  methods: {
    subsidiaryChange: async function (e) {
      let param = [];
      param["skip"] = 0;
      param["take"] = 0;
      param["requireTotalCount"] = true;
      param["filter"] = '["subsidiaryId","=","' + e.value + '"]';

      //this.idcustomer = 0;

      //$("#idcustomer").dxSelectBox("instance").option("value", 0);
      //$("#idproject").dxSelectBox("instance").option("value", 0);
      //$("#idtask").dxSelectBox("instance").option("value", 0);
    },
    loadPeriods: async function () {
      //console.log(`${URLProjectTasks}/paginated`);
      const month = [
        "(Todos)",
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
      for (let i = 0; i <= 12; i++) {
        this.months = [...this.months, { value: i, text: month[i] }];
      }
      /*
      for (let i = 0; i < 12; i++) {
        this.months = [...this.months, { value: i + 1, text: month[i] }];
      }
      */
      this.years = [{ value: 0, text: "(Todos)" }];
      for (let i = d.getFullYear() - 4; i <= d.getFullYear(); i++) {
        this.years = [...this.years, { value: i, text: `${i}` }];
      }
    },
    changeHandle: async function () {
      await this.loadDataSource();
      console.log("changeHandle");
    },
    getSubsidiaries: async function () {
      const { data } = await subsidiariesRepository.GetWithPagination({});
      this.subsidiary = data.data;
    },
    loadDataSource: async function () {
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
          console.log(params);
          return this.sendRequest(
            `${URLFinantialParticipation}/filter/parent/${this.employeeParentId}/${this.year}/${this.month}/A`,
            "GET",
            params
          ).then((data) => {
            console.log("sendrequet", data);
            data.data.map((e) => {
              e.status_str = FinantialParticipationRepository.GetStatus(e.status).value;
              e.tipo_str = FinantialParticipationRepository.GetType(e.type).value;
            });
            console.log(data);
            return data;
          });
        },
        insert: (values) => {
          values.ProjectTaskId = this.idTask;
          values.ProjectId = this.idProject;

          console.log("insert", values);
          return this.sendRequest(`${URLFinantialParticipation}`, "POST", {
            values: JSON.stringify(values),
          });
        },
        update: (key, values) => {
          values.id = key;
          console.log("update", values);
          return this.sendRequest(`${URLFinantialParticipation}`, "PUT", {
            key,
            values: JSON.stringify(values),
          });
        },
        remove: (key) => {
          return this.sendRequest(`${URLFinantialParticipation}/${key}`, "DELETE", {});
        },
        byKey: (key) => {
          return this.sendRequest(`${URLFinantialParticipation}`, "GET", {
            Field: "ID",
            Value: key,
          }).then((data) => {
            return data;
            //console.log("data", data);
          });
        },
      });
      console.log("datasource", this.dataSource.load);
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
    
    //await this.getCustomers();

    await this.loadPeriods();
    /*
    let d = new Date();
    this.year = d.getFullYear();
    this.month = d.getMonth() + 1;
    */
    this.year = 0;
    this.month = 0;
    await this.loadDataSource();
  },
};
</script>