<template>
  <div>
    <DxDataGrid
      id="dataGridContacts"
      :data-source="dataSource"
      :show-borders="true"
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
        :allow-updating="true"
        :allow-adding="true"
        :allow-deleting="true"
        mode="popup"
      >
        <DxPopup
          :show-title="true"
          :width="700"
          :height="525"
          title="Contact Info"
        />
        <DxForm>
          <DxItem :col-count="2" :col-span="2" item-type="group">
            <DxItem data-field="parentId" />
            <DxItem data-field="names" />
            <DxItem data-field="lastName" />
            <DxItem data-field="area" />
            <DxItem data-field="department" />
            <DxItem data-field="position" />
            <DxItem data-field="email" />
            <DxItem data-field="phoneOffice" />
            <DxItem data-field="phoneOfficeExt" />
            <DxItem data-field="phoneMobile" />
          </DxItem>
        </DxForm>
      </DxEditing>

      <DxColumn :width="150" data-field="parentId" caption="Jefe">
        <DxLookup :data-source="jefe" value-expr="id" display-expr="names" />
      </DxColumn>
      <DxColumn :width="0" data-field="customerId" caption="Cliente">
      </DxColumn>
      <DxColumn :width="150" data-field="names" caption="Nombres">
        <DxRequiredRule />
      </DxColumn>
      <DxColumn :width="150" data-field="lastName" caption="Apellidos" />
      <DxColumn :width="0" data-field="area" caption="Area">
        <DxLookup :data-source="area" value-expr="id" display-expr="value" />
      </DxColumn>
      <DxColumn :width="0" data-field="department" caption="Departamento">
        <DxLookup
          :data-source="department"
          value-expr="id"
          display-expr="value"
        />
      </DxColumn>
      <DxColumn :width="150" data-field="position" caption="Posicion">
        <DxLookup
          :data-source="position"
          value-expr="id"
          display-expr="value"
        />
      </DxColumn>
      <DxColumn :width="200" data-field="email" caption="Correo Elect.">
        <DxRequiredRule />
        <DxEmailRule />
      </DxColumn>
      <DxColumn :width="0" data-field="phoneOffice" caption="Telefono">
        <DxRequiredRule />
        <DxPatternRule
          :pattern="pattern"
          message='El número de telefono debe tener el siguiente formato:  "(555) 555-5555" !'
        />
      </DxColumn>
      <DxColumn
        :width="0"
        data-field="phoneOfficeExt"
        caption="Ext."
        data-type="number"
      />
      <DxColumn :width="150" data-field="phoneMobile" caption="Movil">
        <DxPatternRule
          :pattern="pattern"
          message='El número de telefono debe tener el siguiente formato:  "(555) 555-5555" !'
        />
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
  DxFilterRow,
  DxPaging,
  DxEmailRule,
  DxEditing,
  DxPopup,
  DxLookup,
  DxForm,
  DxPatternRule,
} from "devextreme-vue/data-grid";

import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const catalogRepository = RepositoryFactory.get("catalogs");
const contactsRepository = RepositoryFactory.get("contacts");

const URLContacts = `${BASE_DOMAIN}/api/Contact`;

const areas = await catalogRepository.Get("NAME", "AREA");
const departments = await catalogRepository.Get("NAME", "DEPARTMEN");
const positions = await catalogRepository.Get("NAME", "POSITION");

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  components: {
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxRequiredRule,
    DxPager,
    DxFilterRow,
    DxPaging,
    DxEditing,
    DxEmailRule,
    DxPopup,
    DxLookup,
    DxForm,
    DxItem,
    DxPatternRule,
  },
  props: {
    templateData: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  data() {
    //TODO revisar si el id que toma se puede usar en los metodos
    const { id } = this.templateData.data;
    return {
      dataSource: new CustomStore({
        key: "id",
        load: () => {
          return this.getContacts();
        },
        insert: (values) => {
          return this.createContact(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateContact(values);
        },
        remove: (key) => {
          return this.deleteContact(key);
        },
      }),
      jefe: {},
      area: {},
      department: {},
      position: {},
      pattern: /^\(\d{3}\) \d{3}-\d{4}$/i,
    };
  },
  methods: {
    sendRequest(url, method = "GET", data = {}) {
      const params = Object.keys(data)
        .map(
          (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
      console.log("params", params);
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
    getContacts: async function () {
      const { data } = await contactsRepository.Get("CUSTOMERID", this.templateData.data.id);
      data.totalCount = data.data.length;
      return data;
    },
    createContact: async function (contact) {
      contact.customerId = this.templateData.data.id;
      const { data } = await contactsRepository.Create(contact);
      return data;
    },
    updateContact: async function (contact) {
      const { data } = await contactsRepository.Update(contact);
      return data;
    },
    deleteContact: async function (id) {
      const { data } = await contactsRepository.Delete(id);
      return data;
    },
    getAreas: async function(){
      const { data } = await catalogsRepository.Get("NAME", "AREA");
      this.area = data.data;
    },
    getDepartments: async function(){
      const { data } = await catalogsRepository.Get("NAME", "DEPARTMEN");
      this.department = data.data;
    },
    getPositions: async function(){
      const { data } = await catalogsRepository.Get("NAME", "POSITION");
      this.position = data.data;
    },
    getParentContacts: async function(){
      const { data } = await contactsRepository.Get("PARENTID", "NULL");
      this.jefe = data.data;
    },
  },
  async created() {
    await this.getAreas();
    await this.getDepartments();
    await this.getPositions();
    await this.getParentContacts();
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
