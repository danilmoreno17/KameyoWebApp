<template>
  <div>
    <DxDataGrid
      id="dataGridProjectTask"
      :data-source="dataSource"
      :show-borders="true"
      :repaint-changes-only="true"
      :remote-operations="true"
      key-expr="id"
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
        <DxPopup
          :show-title="true"
          :width="700"
          :height="525"
          title="Información de la Tarea"
        />
        <DxForm>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxItem data-field="name" />
            <DxItem data-field="description" />
            <DxItem data-field="order" />
          </DxItem>

          <DxItem
            :col-count="2"
            :col-span="2"
            item-type="group"
            caption="Tiempos de la tarea"
          >
            <DxItem data-field="catalogTaskTypeId" />
            <DxItem data-field="catalogTaskStateId" />
            <DxItem data-field="startDate" />
            <DxItem data-field="endDate" />
            <DxItem data-field="durationHour" />
            <DxItem data-field="closeDate" />
            <DxItem data-field="progress" />
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn :width="150" data-field="name" caption="Nombre">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn :width="0" data-field="projectId"> </DxColumn>
      <DxColumn :width="200" data-field="description" caption="Descripción">
      </DxColumn>
      <DxColumn
        :width="0"
        data-field="order"
        caption="Orden"
        data-type="number"
      >
      </DxColumn>
      <DxColumn
        :width="0"
        data-field="catalogTaskTypeId"
        caption="Tipo de Tarea"
      >
        <DxLookup
          :data-source="projectTaskType"
          value-expr="id"
          display-expr="value"
        />
      </DxColumn>
      <DxColumn
        :width="150"
        data-field="catalogTaskStateId"
        caption="Estado de Tarea"
      >
        <DxLookup
          :data-source="projectTaskState"
          value-expr="id"
          display-expr="value"
        />
      </DxColumn>
      <DxColumn
        :width="150"
        data-field="startDate"
        caption="Fecha de Inicio"
        data-type="date"
      >
      </DxColumn>
      <DxColumn
        :width="150"
        data-field="endDate"
        caption="Fecha de Fin"
        data-type="date"
      >
      </DxColumn>
      <DxColumn
        :width="100"
        data-field="durationHour"
        caption="Duración"
        data-type="number"
      >
      </DxColumn>
      <DxColumn
        :width="150"
        data-field="closeDate"
        caption="Fecha de Cierre"
        data-type="date"
      >
      </DxColumn>
      <DxColumn
        :width="100"
        data-field="progress"
        caption="Progreso"
        data-type="number"
      >
      </DxColumn>
    </DxDataGrid>
  </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxScrolling,
  DxRequiredRule,
  DxPager,
  DxPaging,
  DxFilterRow,
  DxEditing,
  DxPopup,
  DxLookup,
  DxForm,
} from "devextreme-vue/data-grid";

import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;

const URLProjectTask = `${BASE_DOMAIN}/api/ProjectTasks`;

const projectTaskTypes = await catalogRepository.Get("NAME", "PROJECTTASKTYPE");
const projectTaskStates = await catalogRepository.Get(
  "NAME",
  "PROJECTTASKSTATE"
);

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxPager,
    DxPaging,
    DxEditing,
    DxRequiredRule,
    DxPopup,
    DxLookup,
    DxFilterRow,
    DxForm,
    DxItem,
  },
  props: {
    templateData: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  data() {
    const { id } = this.templateData.data;
    return {
      dataSource: new CustomStore({
        key: "id",
        load: (loadOptions) => {
          if (loadOptions.filter) {
            loadOptions.filter.push("and");
            loadOptions.filter.push(["ProjectId", "=", id]);
          } else {
            loadOptions.filter = ["ProjectId", "=", id];
          }

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
          return this.sendRequest(
            `${URLProjectTask}/filter`,
            "GET",
            params
          ).then((data) => {
            console.log("data", data);
            return data;
          });
        },
        insert: (values) => {
          values.projectId = id;
          return this.sendRequest(`${URLProjectTask}`, "POST", {
            values: JSON.stringify(values),
          });
        },
        update: (key, values) => {
          values.id = key;
          return this.sendRequest(`${URLProjectTask}`, "PUT", {
            key,
            values: JSON.stringify(values),
          });
        },
        remove: (key) => {
          return this.sendRequest(`${URLProjectTask}/${key}`, "DELETE", {});
        },
        byKey: (key) => {
          return this.sendRequest(`${URLProjectTask}`, "GET", {
            Field: "id",
            Value: key,
          }).then((data) => {
            return data;
          });
        },
      }),
      projectTaskType: projectTaskTypes.data.data,
      projectTaskState: projectTaskStates.data.data,
    };
  },
  methods: {
    sendRequest(url, method = "GET", data = {}) {
      const params = Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
      if (method === "GET") {
        console.log("params", params);
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
};
</script>

<style>
.master-detail-caption {
  padding: 0 0 5px 10px;
  font-size: 14px;
  font-weight: bold;
}
</style>
