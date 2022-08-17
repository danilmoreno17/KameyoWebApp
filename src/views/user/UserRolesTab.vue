<template>
  <div>
    <DxDataGrid
      id="dataGridUserRolesTab"
      key-expr="roleId"
      :show-borders="true"
      :data-source="userRoles"
      :repaint-changes-only="true"
    >
      <DxEditing :refresh-mode="refreshMode" :allow-updating="true" mode="cell" />
      <DxColumn data-field="userId" caption="UserId" :visible="false"> </DxColumn>
      <DxColumn data-field="roleId" caption="RoleId" :visible="false"> </DxColumn>
      <DxColumn data-field="roleName" caption="Rol" data-type="string" :allow-editing="false" />
      <DxColumn data-field="roleSelected" caption="Rol Seleccionado" data-type="boolean" />
      <DxScrolling mode="virtual" />
    </DxDataGrid>
  </div>
</template>

<script>
import { DxDataGrid, DxColumn, DxScrolling, DxEditing } from "devextreme-vue/data-grid";
import CustomStore from "devextreme/data/custom_store";

import { checkStatus, parseJSON } from "@/use/FetchService.js";

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URL_USER = `${BASE_DOMAIN}/api/users`;

//https://localhost:7284/api/Users/2863ae38-9aba-4551-a4b2-7cd8b6e4d2cf/roles

export default {
  name: "UserRolesTab",
  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxEditing,
  },

  props: {
    userId: {
      type: String,
    },
  },

  data() {
    return {
      userRoles: new CustomStore({
        key: "roleId",
        load: this.loadRoles,
        update: (key, values) => this.updateUserRoles({ key, values }),
        errorHandler: (error) => {
          console.log(error.message);
        },
      }),
    };
  },

  methods: {
    async loadRoles() {
      return await this.loadDataFetch(`${URL_USER}/${this.userId}/roles`).then((data) => {
        console.log("loadRoles - data -", data);
        return data;
      });
    },

    async loadDataFetch(url) {
      return await fetch(`${url}`)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          console.log(`loadDataFetch -> ${url}`, data);
          return data;
        });
    },

    async updateUserRoles(data = {}) {
      console.log("updateUserRoles - data ->", data);
      var userRole = {
        userId: this.userId,
        roleId: data.key,
        roleSelected: data.values.roleSelected,
      };

      fetch(`${URL_USER}/${this.userId}/roles`, {
        method: "PUT",
        body: JSON.stringify(userRole),
        headers: { Accept: "application/json", "Content-Type": "application/json" },
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
  },

  mounted() {
    console.log("props - data ->", this.userId);
  },
};
</script>

<style scope></style>
