<template>
  <div>
    <DxDataGrid
      id="dataGridProjectHourBank"
      :data-source="projectHourBanks"
      :show-borders="true"
      :repaint-changes-only="true"
      :remote-operations="true"
      @row-inserting="insertHourBank"
      @exporting="onExporting"
      key-expr="id"
    >
      <DxHeaderFilter :visible="true" />
      <DxGroupPanel :visible="true" />
      <DxGrouping :auto-expand-all="true" />
      <DxExport :enabled="true" :allow-export-selected-data="true" />
      <DxSelection mode="multiple" />
      <DxSearchPanel :visible="true" :width="240" placeholder="Search..." />
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
      <DxEditing :refresh-mode="full" :allow-adding="true" :allow-deleting="true" mode="popup">
        <DxPopup :show-title="true" :width="700" :height="525" title="Asignacion de Bolsa de Horas a Proyecto" />
        <DxForm>
          <DxItem :col-count="1" :col-span="2" item-type="group">
            <DxItem data-field="hourBankId" />
          </DxItem>
        </DxForm>
      </DxEditing>
      <DxColumn :width="0" data-field="projectId" />
      <DxColumn :width="150" data-field="hourBankId" caption="Bolsa de Horas">
        <DxLookup :data-source="hourBanks" value-expr="id" display-expr="name" />
        <DxRequiredRule />
      </DxColumn>
      <DxColumn :width="150" data-field="hourBalance" caption="Saldo de Horas" />
      <DxColumn :width="150" data-field="hourSet" caption="Cantidad de Horas" />
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
  DxHeaderFilter,
  DxSearchPanel,
  DxExport,
  DxSelection,
  DxGroupPanel,
  DxGrouping,
  DxEditing,
  DxPopup,
  DxLookup,
  DxForm,
} from "devextreme-vue/data-grid";

import { DxItem } from "devextreme-vue/form";
import CustomStore from "devextreme/data/custom_store";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const hourBankRepository = RepositoryFactory.get("hourBanks");
const projectHourBankRepository = RepositoryFactory.get("projectHourBanks");

import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

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
    DxHeaderFilter,
    DxSearchPanel,
    DxExport,
    DxSelection,
    DxGroupPanel,
    DxGrouping,
    DxForm,
    DxItem,
  },
  props: {
    dataProject: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      projectHourBanks: new CustomStore({
        key: "id",
        load: () => {
          return this.getProjectHourBanks();
        },
        insert: (values) => {
          return this.createProjectHourBank(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateProjectHourBank(values);
        },
        remove: (key) => {
          return this.deleteProjectHourBank(key);
        },
      }),
      hourBanks: {},
    };
  },
  methods: {
    getHourBanks: async function () {
      const { data } = await hourBankRepository.GetWithPagination({});
      this.hourBanks = data.data;
    },
    getProjectHourBanks: async function () {
      const { data } = await projectHourBankRepository.Get("PROJECTID", this.dataProject.id);
      data.totalCount = data.data.length;
      return data;
    },
    createProjectHourBank: async function (projectHourBank) {
      projectHourBank.projectId = this.dataProject.id;
      const { data } = await projectHourBankRepository.Create(projectHourBank);
      return data;
    },
    updateProjectHourBank: async function (projectHourBank) {
      const { data } = await projectHourBankRepository.Update(projectHourBank);
      return data;
    },
    deleteProjectHourBank: async function (id) {
      const { data } = await projectHourBankRepository.Delete(id);
      return data;
    },
    onExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Clientes");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Clientes.xlsx");
        });
      });
      e.cancel = true;
    },
  },
  async created() {
    await this.getHourBanks();
  },
};
</script>

<style>
.master-detail-caption {
  padding: 0 0 5px 10px;
  font-size: 14px;
  font-weight: bold;
}
#dataGridProjectHourBank {
  height: 450px;
  width: 100%;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridProjectHourBank {
    height: 760px;
  }
}
</style>
