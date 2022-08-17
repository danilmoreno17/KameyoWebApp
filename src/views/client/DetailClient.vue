<template>
  <div>
    <DxDataGrid
      :data-source="dataSource"
      :show-borders="true"
      :column-auto-width="true"
    >
      <DxColumn data-field="names"> </DxColumn>
      <DxColumn data-field="lastName" />
      <DxColumn data-field="area" />
      <DxColumn data-field="department" />
      <DxColumn data-field="position" />
      <DxColumn data-field="email" />
    </DxDataGrid>
  </div>
</template>
<script>
import { DxDataGrid, DxColumn } from "devextreme-vue/data-grid";
import CustomStore from "devextreme/data/custom_store";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const contactsRepository = RepositoryFactory.get("contacts");

export default {
  components: { DxDataGrid, DxColumn },
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
    };
  },
  methods: {
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
