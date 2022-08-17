<template>
  <div>
    <DxDataGrid
      id="dataGridRoles"
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
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        mode="popup"
      >
        <DxPopup :show-title="true" :width="700" :height="525" title="Roles" />
        <DxForm>
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem data-field="name" />
          </DxItem>
        </DxForm>
      </DxEditing>

      <DxColumn
        data-field="id"
        caption="id"
        data-type="string"
        :visible="false"
        :width="200"
      />
      <DxColumn
        data-field="name"
        caption="Rol"
        data-type="string"
        :width="200"
      />
    </DxDataGrid>
  </div>
</template>

<script>

import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxPager,
  DxPaging,
  DxEditing,
  DxForm,
  DxFilterRow,
  DxPopup,
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URL = `${BASE_DOMAIN}/api/roles`;

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
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPager,
    DxPaging,
    DxEditing,
    DxForm,
    DxItem,
    DxFilterRow,
    // DxLookup,
    DxPopup,
  },
  data() {
    return {
      displayMode: "full",
      pageSizes: [5, 10, "all"],

      selectedIndex: 0,
      loop: false,
      animationEnabled: true,
      swipeEnabled: true,
      tabs: [{ tabName: "Roles" }, { tabName: "Permissions" }],

      dataSource: new CustomStore({
        key: "id",
        load: this.loadData,
        insert: (values) => this.createEntity(JSON.stringify(values)),
        update: (key, values) => this.updateEntity({ key, values }),
        remove: (key) => this.sendRequest(`${URL}/${key}`, "DELETE"),
        errorHandler: (error) => {
          console.log(error.message);
        },
      }),
    };
  },

  methods: {
    sendRequest(url, method = "GET", data = {}) {
      const params = Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
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
        body: params,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
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
          console.log("loadData.data -> ", data.data.data);

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

    async createEntity(values = {}) {
      const method = "POST";
      return await fetch(`${URL}`, {
        method,
        body: values,
        headers: {
          //Accept: "application/json",
          "Content-Type": "application/json",
          //"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
    },

    async updateEntity(data = {}) {
      console.log("updateEntity - data ->", data);
      const method = "PUT";

      return fetch(`${URL}/${data.key}`, {
        method,
        body: JSON.stringify(data.values),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((result) => {
        console.log("updateEntity - result => ", result);

        if (result.ok) {
          return result.text().then((text) => text && JSON.parse(text));
        }

        return result.json().then((json) => {
          throw json.Message;
        });
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

    refresh() {
      this.dataSource.load();
    },
  },

  //async created() {},
};
</script>

<style>
#dataGridRoles {
  height: 390px;
  width: 100%;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridRoles {
    height: 700px;
  }
}
</style>
