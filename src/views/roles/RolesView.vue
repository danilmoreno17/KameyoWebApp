<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <DxTabPanel
            id="tabPanelRole"
            :data-source="tabs"
            v-model:selected-index="selectedIndex"
            :loop="loop"
            :animation-enabled="animationEnabled"
            :swipe-enabled="swipeEnabled"
          >
            <template #title="{ data: tab }">
              <span>{{ tab.tabTitle }}</span>
            </template>

            <template #item="{ data: tab }">
              <RoleTemplate
                v-if="tab.tabName == 'Roles'"
                :template-data="tab"
              />

              <PermissionsTemplate
                v-if="tab.tabName == 'Permissions'"
                :template-data="tab"
              />
            </template>
          </DxTabPanel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";

import DxTabPanel from "devextreme-vue/tab-panel";

import "whatwg-fetch";

import PermissionsTemplate from "./PermissionsTemplate.vue";
import RoleTemplate from "./RoleTemplate.vue";

export default {
  name: "UsersView",
  components: {
    BreadCrumb,
    DxTabPanel,
    PermissionsTemplate,
    RoleTemplate,
  },
  data() {
    return {
      selectedIndex: 0,
      loop: false,
      animationEnabled: true,
      swipeEnabled: true,
      tabs: [
        { tabName: "Roles", tabTitle: "Roles" },
        { tabName: "Permissions", tabTitle: "Permisos" },
      ],
    };
  },

  // methods: { },
  // async created() {},
};
</script>

<style>
#tabPanelRole {
  height: 450px;
  width: 100%;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #tabPanelRole {
    height: 760px;
  }
}
</style>
