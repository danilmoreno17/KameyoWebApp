<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxDataGrid
            id="dataGridMenusUserType"
            :ref="dataGridRefName"
            key-expr="id"
            :show-borders="true"
            :data-source="menuUserTypeDS"
            :repaint-changes-only="true"
            :selection="{ mode: 'single' }"
            @row-updating="rowUpdating"
          >
            <DxGrouping :auto-expand-all="autoExpandAll" />
            <DxEditing :refresh-mode="refreshMode" :allow-updating="true" mode="cell" />
            <DxColumn data-field="userId" caption="UserId" :visible="false" />
            <DxColumn data-field="UserTypeId" caption="UserTypeId" :visible="false" />
            <DxColumn data-field="catalogMenuId" caption="catalogMenuId" :visible="false" />
            <DxColumn :group-index="0" data-field="menuName" caption="Menu" data-type="string" :allow-editing="false" />
            <DxColumn data-field="subMenuName" caption="Menu" data-type="string" :allow-editing="false" />
            <DxColumn data-field="menuSelected" caption="Menu Seleccionado" data-type="boolean" />
            <DxScrolling mode="virtual" />

            <DxToolbar>
              <DxItem location="after" template="personTypeTemplate" />
            </DxToolbar>

            <template #personTypeTemplate>
              <DxSelectBox
                width="225"
                :items="rolesDS"
                display-expr="name"
                value-expr="id"
                :value="rolSelected"
                @value-changed="onValueChanged"
              />
            </template>
          </DxDataGrid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DxDataGrid, DxColumn, DxScrolling, DxEditing, DxToolbar, DxItem, DxGrouping } from "devextreme-vue/data-grid";
import CustomStore from "devextreme/data/custom_store";
import BreadCrumb from "@/components/BreadCrumb.vue";
import DxSelectBox from "devextreme-vue/select-box";

import { checkStatus, parseJSON } from "@/use/FetchService.js";
// import personRepository from "@/repositories/personsRepository";
// const personTypes = await personRepository.GetPersonTypes();

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URL_MENUUSERTYPE = `${BASE_DOMAIN}/api/menu/role`;
const ROLES_URL = `${BASE_DOMAIN}/api/roles`;

export default {
  name: "MenuUserTypeView",
  components: {
    BreadCrumb,
    DxSelectBox,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxEditing,
    DxToolbar,
    DxItem,
    DxGrouping,
  },
  data() {
    return {
      selectedRowIndex: -1,
      catalogMenuIdSelected: "",
      dataGridRefName: "dataGridMenusUserType",
      rolesDS: [],
      rolSelected: "",
      menuUserTypeDS: new CustomStore({
        key: "id",
        load: this.loadMenuUserType,
        update: (key, values) => this.updateUserRoles({ key, values }),
        errorHandler: (error) => {
          console.log(error.message);
        },
      }),
    };
  },

  methods: {
    rowUpdating(e) {
      this.catalogMenuIdSelected = e.oldData.catalogMenuId;
    },

    async loadMenuUserType() {
      return await this.loadDataFetch(`${URL_MENUUSERTYPE}?roleId=${this.rolSelected}`).then((data) => {
        return data;
      });
    },

    async loadDataFetch(url) {
      return await fetch(`${url}`)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          return data;
        });
    },

    async loadRoles() {
      const result = await this.loadDataFetch(`${ROLES_URL}`).then((data) => data.data.data);
      return result;
    },

    async updateUserRoles(data = {}) {
      var menuUserTypeSelect = {
        id: data.key,
        userId: null,
        roleId: this.rolSelected,
        catalogMenuId: this.catalogMenuIdSelected,
        menuRolSelected: data.values.menuSelected,
      };

      const requestOptions = {
        method: "PUT",
        body: JSON.stringify(menuUserTypeSelect),
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      };

      const response = await fetch(`${URL_MENUUSERTYPE}`, requestOptions);
      const responseData = await response.json();
    },

    onValueChanged({ value }) {
      this.rolSelected = value;
      const dataGrid = this.$refs[this.dataGridRefName].instance;
      dataGrid.getDataSource().reload();
    },
  },

  async mounted() {
    this.rolesDS = await this.loadRoles();
    this.rolSelected = this.rolesDS[0].id;
  },
};
</script>

<style>
.right-side {
  position: absolute;
  right: 1px;
  top: 6px;
}

#dataGridMenusUserType {
  height: 450px;
  width: 100%;
  padding-left: 10px;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridMenusUserType {
    height: 760px;
  }
}
</style>
