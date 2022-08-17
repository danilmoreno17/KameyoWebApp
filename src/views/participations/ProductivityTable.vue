<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>

      <div class="row cont">
        <div class="col-md-12">
          <DxForm :form-data="table" :col-count="1">
            <DxGroupItem :col-count="2">
              <div class="dx-field">
                <div class="dx-field-label">Subsidiaria</div>
                <div class="dx-field-value">
                  <DxSelectBox
                    :items="subsidiaries"
                    placeholder="Seleccionar..."
                    @value-changed="subsidiaryChange"
                    display-expr="name"
                    v-model:value="subsidiaryId"
                    value-expr="id"
                    id="idproject"
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
            :data-source="dataSource"
            :show-borders="true"
            :column-auto-width="true"
            :repaint-changes-only="true"
            :remote-operations="true"
            @exporting="onExporting"
            @init-new-row="initNewRow"
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

            <DxEditing
              :refresh-mode="refreshMode"
              :allow-updating="true"
              :allow-adding="this.subsidiaryId != 0"
              :allow-deleting="true"
              mode="popup"
            >
              <DxScrolling row-rendering-mode="virtual" />
              <DxPaging :page-size="10" />
              <DxPopup :show-title="true" :width="400" :height="200" title="Registro de Actividades" />
              <DxFormGrid>
                <DxItem :col-count="1" :col-span="1" item-type="group">
                  <DxItem data-field="value" />
                  <DxItem data-field="percent" />
                </DxItem>
              </DxFormGrid>
            </DxEditing>
            <DxColumn :width="250" data-field="value" caption="Value">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn data-field="percent" caption="Percent">
              <DxRequiredRule />
            </DxColumn>
          </DxDataGrid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { DxForm, DxSimpleItem, DxGroupItem, DxLabel } from "devextreme-vue/form";
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
  DxSearchPanel,
  DxForm as DxGridForm,
  DxCustomRule,
  DxHeaderFilter,
  DxExport,
  DxGrouping,
  DxGroupPanel,
} from "devextreme-vue/data-grid";

import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxSelectBox } from "devextreme-vue/select-box";
import CustomStore from "devextreme/data/custom_store";
import { RepositoryFactory } from "@/repositories/RepositoryFactory";
import DxButton from "devextreme-vue/button";

const financialParticipationRepository = RepositoryFactory.get("financialParticipation");
const subsidiariesRepository = RepositoryFactory.get("subsidiaries");
const productivityTableRepository = RepositoryFactory.get("productivityTable");
function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}

export default {
  name: "DirectParticipation",
  components: {
    BreadCrumb,
    DxForm,
    DxButton,
    DxSimpleItem,
    DxGroupItem,
    DxLabel,
    DxDataGrid,
    DxColumn,
    DxScrolling,
    DxSelectBox,
    DxRequiredRule,
    DxPager,
    DxPaging,
    DxFilterRow,
    DxEditing,
    DxPopup,
    DxLookup,
    DxSearchPanel,
    DxGridForm,
    DxCustomRule,
    DxHeaderFilter,
    DxExport,
    DxGrouping,
    DxGroupPanel,
  },
  data() {
    return {
      tablaPorcentajes: { data: [], totalCount: 0 },
      dataSource: {},
      table: { table: 2 },
      subsidiaryId: 0,
      subsidiaries: [],
      searchModeOption: "contains",
      searchExprOption: "name",
      searchTimeoutOption: 200,
      minSearchLengthOption: 0,
      showDataBeforeSearchOption: false,
      displayMode: "full",
    };
  },
  methods: {
    subsidiaryChange: async function (e) {
      console.log(this.subsidiaryId);
      this.loadDataSource();
    },
    getSubsidiaries: async function () {
      const { data } = await subsidiariesRepository.GetWithPagination({});
      this.subsidiaries = data.data;
    },

    loadDataSource: async function () {
      this.dataSource = new CustomStore({
        key: "id",
        load: (loadOptions) => {
          if (this.subsidiaryId != null) {
            console.log("porcentajes", this.tablaPorcentajes.data);
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
            return productivityTableRepository.GetWithFilterSubidiary(params, this.subsidiaryId).then((e) => {
              console.log(e);
              this.tablaPorcentajes.data = e.data.data.data;
              this.tablaPorcentajes.data.sort((a, b) => {
                if (a.value > b.value) return 1;
                if (a.value < b.value) return -1;
                return 0;
              });
              return this.tablaPorcentajes;
            });
          }
        },
        insert: (values) => {
          values.subsidiaryId = this.subsidiaryId;
          console.log("insert", values);
          return productivityTableRepository.Create(values);
        },
        update: (key, values) => {
          values.id = key;
          return productivityTableRepository.Update(values);
        },
        remove: (key) => {
          return productivityTableRepository.Delete(values);
        },
        byKey: (key) => {
          /*
          return this.sendRequest(`${URLTaskActitivy}`, "GET", {
            Field: "ID",
            Value: key,
          }).then((data) => {
            return data;
            //console.log("data", data);
          });
          */
        },
      });
    },
  },
  async mounted() {
    console.log("hola");
    await this.getSubsidiaries();
  },
  onExporting(e) {},
};
</script>
<style>
.cont {
  background-color: white;
  padding-top: 20px;
}
</style>