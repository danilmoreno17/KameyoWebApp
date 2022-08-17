<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxDataGrid
            id="dataGridUsers"
            key-expr="id"
            :data-source="dataSource"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
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
              :allow-updating="false"
              :allow-adding="false"
              :allow-deleting="true"
              mode="popup"
            >
              <DxPopup :show-title="true" :width="700" :height="600" title="Informacion del usuario" />
              <DxForm>
                <DxItem :col-count="2" :col-span="2" item-type="group">
                  <DxItem v-if="isEditing" :col-span="1">
                    <UserFileUploader :user-id="id" />
                  </DxItem>

                  <!-- <DxItem v-if="isEditing" template="avatar-template" /> -->

                  <DxItem v-if="isEditing" item-type="group" :col-span="1">
                    <DxItem data-field="email" />
                    <DxItem
                      data-field="password"
                      editorType="dxTextBox"
                      :editor-options="{
                        mode: 'password',
                      }"
                    />
                  </DxItem>

                  <DxItem v-if="!isEditing" data-field="email" />
                  <DxItem
                    v-if="!isEditing"
                    data-field="password"
                    editorType="dxTextBox"
                    :editor-options="{
                      mode: 'password',
                    }"
                  />

                  <DxItem data-field="personTypeId" />
                  <DxItem data-field="personId" />
                  <DxItem :col-span="2" data-field="userRoles" />
                </DxItem>
              </DxForm>
            </DxEditing>

            <DxColumn data-field="id" caption="id" data-type="string" :visible="false" :width="200" />
            <DxColumn data-field="password" caption="Contraseña" data-type="string" :visible="false" :width="200" />
            <DxColumn
              data-field="email"
              caption="Email"
              data-type="string"
              :width="300"
              cell-template="cell-link-template"
            />

            <DxColumn
              data-field="userRoles"
              caption="Roles"
              :allow-sorting="false"
              :width="130"
              :visible="true"
              :cell-template="roleCellTemplate"
              :calculate-filter-expression="calculateFilterExpressionUserRoles"
              edit-cell-template="tagBoxEditor"
            >
              <DxLookup :data-source="rolesDS" value-expr="id" display-expr="name" />
            </DxColumn>

            <!-- :set-cell-value="setStateValue" -->
            <DxColumn
              :set-cell-value="setStateValue"
              data-field="personTypeId"
              data-type="string"
              caption="Tipo de persona"
              :width="300"
            >
              <DxLookup :data-source="personTypesDS" display-expr="name" value-expr="id" />
            </DxColumn>

            <DxColumn data-field="personId" caption="Persona" data-type="string" :width="200">
              <DxLookup :data-source="getFilteredPersons" display-expr="fullName" value-expr="id" />
            </DxColumn>

            <DxToolbar>
              <DxItem location="after" template="createUserTemplate" />
            </DxToolbar>

            <template #avatar-template="{ data }">
              <UserFileUploader :user-data="data.value" />
            </template>

            <template #tagBoxEditor="{ data: cellInfo }">
              <RolesTagBoxComponent
                :value="cellInfo.value"
                :on-value-changed="(value) => onRoleValueChanged(value, cellInfo)"
                :data-source="rolesDS"
                :data-grid-component="cellInfo.component"
              />
            </template>

            <template #createUserTemplate>
              <DxButton icon="user" text="nuevo usuario" @click="createUser" />
            </template>

            <template #cell-link-template="{ data }">
              <cellLink
                :cell-data="data"
                :routePath="{
                  name: 'userView',
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
import BreadCrumb from "@/components/BreadCrumb.vue";
import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxPager,
  DxPaging,
  DxEditing,
  DxForm,
  DxFilterRow,
  DxLookup,
  DxPopup,
  DxToolbar,
} from "devextreme-vue/data-grid";

import { DxButton } from "devextreme-vue/button";
import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

import cellLink from "@/components/DataGrid/CellLinkTemplate.vue";
import RolesTagBoxComponent from "./RolesTagBoxComponent.vue";
import UserFileUploader from "./UserFileUploader.vue";

//import { RepositoryFactory } from "@/repositories/RepositoryFactory";
//const userRepository = RepositoryFactory.get("users");

import personRepository from "@/repositories/personsRepository";

const personTypeDs = await personRepository.GetPersonTypes();
const personLookUpDs = await personRepository.GetPersonLookUp();

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URL = `${BASE_DOMAIN}/api/Users`;
const ROLES_URL = `${BASE_DOMAIN}/api/roles`;

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

function checkStatus(response) {
  console.log("checkStatus", response);
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  console.log("parseJSON", response);
  return response.json();
}

export default {
  name: "UsersView",
  components: {
    BreadCrumb,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPager,
    DxPaging,
    DxEditing,
    DxForm,
    DxItem,
    DxFilterRow,
    DxToolbar,
    RolesTagBoxComponent,
    DxLookup,
    DxPopup,
    UserFileUploader,
    cellLink,
    DxButton,
    // DxSimpleItem,
    // DxGroupItem,
  },
  data() {
    return {
      isEditing: false,
      displayModes: [
        { text: "Display Mode 'full'", value: "full" },
        { text: "Display Mode 'compact'", value: "compact" },
      ],
      displayMode: "full",
      pageSizes: [5, 10, "all"],
      ///showPageSizeSelector: true,
      //showInfo: true,
      //showNavButtons: true,
      setStateValue(rowData, value) {
        rowData.personId = null;
        this.defaultSetCellValue(rowData, value);
      },

      rolesDS: new CustomStore({ key: "id", load: this.loadRoles }),
      personTypesDS: [], //personTypeDs,
      personLookUpDS: [], //personLookUpDs,
      // personTypesDS: new CustomStore({
      //   key: "id",
      //   load: this.loadPersonTypes,
      //   byKey: (key) => {
      //     console.log("personTypesDS by key");
      //     //return fetch("http://mydomain.com/MyDataService?id=" + key);
      //   },
      // }),

      // personLookUpDS: new CustomStore({
      //   key: "id",
      //   load: this.loadPersonLookUpDS,
      //   byKey: (key) => {
      //     console.log("personLookUpDS by key");
      //     //return fetch("http://mydomain.com/MyDataService?id=" + key);
      //   },
      // }),

      dataSource: new CustomStore({
        key: "id",
        load: this.loadData, //() => this.sendRequest(`${URL}`),
        //insert: (values) => this.createUser(JSON.stringify(values)),
        //this.sendRequest(`${URL}`, "POST", JSON.stringify(values)),
        //this.sendRequest(`${URL}`, "POST", JSON.stringify(values)),
        //update: (key, values) => this.updateUser({ key, values }),
        remove: (key) => this.sendRequest(`${URL}/${key}`, "DELETE"),
        errorHandler: (error) => {
          console.log(error.message);
        },
      }),

      // setStateValue(rowData, value) {
      //   rowData.personId = null;
      //   this.defaultSetCellValue(rowData, value);
      // },

      calculateFilterExpressionUserRoles: function (filterValue, selectedFilterOperation, target) {
        // eslint-disable-next-line no-debugger
        debugger;

        if (target === "search" && typeof filterValue === "string") {
          return [this.dataField, "contains", filterValue];
        }
        return function (data) {
          return (data.userRoles || []).indexOf(filterValue) !== -1;
        };
      },
    };
  },

  methods: {
    // crudEvent(eventName) {
    //   this.isEditing = eventName === "EDITING_START";
    //   console.log("logEvent - ", eventName);
    // },

    // onEditorPreparing(e) {
    //   if (e.parentType === "dataRow" && e.dataField === "personId") {
    //     //e.editorOptions.disabled = typeof e.row.data.personTypeId !== "string";
    //   }
    // },
    sendRequest(url, method = "GET", data = {}) {
      //this.logRequest(method, url, data);

      const params = Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join("&");

      console.log("data ", data);
      console.log("params ", params);

      if (method === "GET") {
        return fetch(url, {
          method,
          // credentials: "include",
        }).then((result) =>
          result.json().then((json) => {
            if (result.ok) return json.data;
            throw json.Message;
          })
        );
      }

      return fetch(url, {
        method,
        //body: data, //params,
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          //"Content-Type": "application/json;charset=UTF-8",
        },
        // credentials: "include",
      }).then((result) => {
        if (result.ok) {
          return result.text().then((text) => text && JSON.parse(text));
        }
        return result.json().then((json) => {
          throw json.Message;
        });
      });
    },

    loadData(loadOptions) {
      console.log("loadData - loadOptions", loadOptions);

      let params = "?";
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
          params += `${i}=${JSON.stringify(loadOptions[i])}&`;
        }
      });

      params = params.slice(0, -1);

      return fetch(`${URL}${params}`, {
        method: "GET",
        headers: { "Content-Type": "application/json;charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("loadData.data -> ", data);

          return {
            data: data.data.data,
            totalCount: data.data.totalCount,
            summary: data.data.summary,
            groupCount: data.data.groupCount,
          };
        })
        .catch(() => {
          throw new Error("Data Loading Error");
        });
    },

    createUser() {
      this.$router.push({ name: "userCreateView" });
    },

    // async createUser(values = {}) {
    //   const method = "POST";
    //   return await fetch(`${URL}`, {
    //     method,
    //     body: values,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    // },

    async updateUser(data = {}) {
      console.log("updateUser - data ->", data);
      const method = "PUT";
      fetch(`${URL}/${data.key}`, {
        method,
        body: JSON.stringify(data.values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then(async (result) => {
        console.log("updateUser - result ", result);
        if (result.ok) {
          const text = await result.text();
          return text && JSON.parse(text);
        }
        const json = await result.json();
        throw json.Message;
      });
    },

    async loadDataFetch(url) {
      return await fetch(`${url}`)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          console.log(`loadDataFetch -> ${url}`, data.data.data);
          return data.data.data;
        });
    },

    // async loadPersonTypes() {
    //   return await this.loadDataFetch(`${PERSON_TYPE_URL}`).then(
    //     (data) => data
    //   );
    // },

    // async loadPersonLookUpDS(loadOptions) {
    //   console.log("loadPersonLookUpDS - loadOptions", loadOptions);

    //   return await fetch(`${PERSON_LOOKUP_URL}`)
    //     .then(checkStatus)
    //     .then(parseJSON)
    //     .then((data) => {
    //       console.log("loadPersonLookUpDS - data ", data);
    //       return data.data.data;
    //     });
    // },

    async loadRoles() {
      return await this.loadDataFetch(`${ROLES_URL}`).then((data) => data);
    },

    roleCellTemplate(container, options) {
      var noBreakSpace = "\u00A0",
        text = (options.value || [])
          .map((element) => {
            return options.column.lookup.calculateCellValue(element.roleId);
          })
          .join(", ");

      container.textContent = text || noBreakSpace;
      container.title = text;
    },

    getFilteredPersons: (options) => ({
      store: personLookUpDs,
      filter: options.data ? ["personTypeId", "=", options.data.personTypeId] : null,
    }),

    onRoleValueChanged(value, cellInfo) {
      var v = [];

      console.log("onRoleValueChanged - value ->", value);

      value.forEach((element) => {
        v.push({
          roleId: element,
          userId: cellInfo.row.isNewRow ? "0" : cellInfo.key,
        });
      });

      cellInfo.setValue(v);
      cellInfo.component.updateDimensions();
    },
  },

  async mounted() {
    this.personTypeDS = await this.loadPersonTypes();
    this.personDS = await this.loadPersonLookUp();
  },

  //async created() {},
};
</script>

<style>
#dataGridUsers {
  height: 450px;
  width: 100%;
  padding-left: 10px;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridUsers {
    height: 760px;
  }
}
</style>
