<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <div class="col-md-12">
          <div class="card">
            <div class="header">
              <DxToolbar>
                <DxItemToolbar :options="backButtonOptions" location="before" widget="dxButton" />
                <DxItemToolbar :options="refreshButtonOptions" location="before" widget="dxButton" />
                <DxItemToolbar :options="addButtonOptions" location="after" locate-in-menu="auto" widget="dxButton" />
                <DxItemToolbar :options="saveButtonOptions" location="after" locate-in-menu="auto" widget="dxButton" />
              </DxToolbar>
            </div>
            <div class="body">
              <DxForm v-model:form-data="formData" @field-data-changed="fieldDataChanged">
                <!-- <template #avatar-template="{}">
                  <div class="form-avatar"></div>
                  <div class="widget-container flex-box">
                    <span>Profile Picture</span>
                    <div
                      id="dropzone-external"
                      class="flex-box"
                      :class="[
                        isDropZoneActive ? 'dx-theme-accent-as-border-color dropzone-active' : 'dx-theme-border-color',
                      ]"
                    >
                      <img id="dropzone-image" :src="imageSource" v-if="imageSource" alt="" />
                      <div id="dropzone-text" class="flex-box" v-if="textVisible">
                        <span>Drag & Drop the desired file</span>
                        <span>…or click to browse for a file instead.</span>
                      </div>
                      <DxProgressBar
                        id="upload-progress"
                        :min="0"
                        :max="100"
                        width="30%"
                        :show-status="false"
                        :visible="progressVisible"
                        :value="progressValue"
                      />
                    </div>
                    <DxFileUploader
                      id="file-uploader"
                      dialog-trigger="#dropzone-external"
                      drop-zone="#dropzone-external"
                      :multiple="false"
                      :allowed-file-extensions="allowedFileExtensions"
                      upload-mode="instantly"
                      :upload-url="uploadUrl"
                      :visible="false"
                      @drop-zone-enter="onDropZoneEnter"
                      @drop-zone-leave="onDropZoneLeave"
                      @uploaded="onUploaded"
                      @progress="onProgress"
                      @upload-started="onUploadStarted"
                    />
                  </div>
                </template> -->
                <DxGroupItem :col-count="4" css-class="first-group">
                  <!-- <DxSimpleItem template="avatar-template" /> -->
                  <DxGroupItem :col-span="3">
                    <DxSimpleItem data-field="email" />
                    <DxSimpleItem
                      data-field="personTypeId"
                      editor-type="dxSelectBox"
                      :editor-options="{
                        items: personTypeDS,
                        displayExpr: 'name',
                        valueExpr: 'id',
                        showClearButton: true,
                      }"
                      ><DxLabel text="Tipo de usuario"
                    /></DxSimpleItem>
                    <DxSimpleItem
                      data-field="personId"
                      editor-type="dxSelectBox"
                      :editor-options="{
                        items: personDS,
                        displayExpr: 'fullName',
                        valueExpr: 'id',
                        searchEnabled: true,
                        showClearButton: true,
                      }"
                      ><DxLabel text="Persona"
                    /></DxSimpleItem>
                  </DxGroupItem>
                </DxGroupItem>
                <DxGroupItem :col-count="2" css-class="second-group">
                  <DxTabbedItem :col-span="2">
                    <DxTabPanelOptions :defer-rendering="false" />
                    <DxTab title="Roles">
                      <UserRoleTemplate :user-id="this.$route.params.id" />
                    </DxTab>
                  </DxTabbedItem>
                </DxGroupItem>
              </DxForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";

import {
  DxForm,
  DxSimpleItem,
  DxGroupItem,
  DxLabel,
  DxTabbedItem,
  DxTabPanelOptions,
  DxTab,
} from "devextreme-vue/form";
import { DxTextArea } from "devextreme-vue/text-area";
import DxTabPanel from "devextreme-vue/tab-panel";
import DxToolbar, { DxItem as DxItemToolbar } from "devextreme-vue/toolbar";
import notify from "devextreme/ui/notify";

import { DxFileUploader } from "devextreme-vue/file-uploader";
import { DxProgressBar } from "devextreme-vue/progress-bar";

import UserRoleTemplate from "./UserRolesTab.vue";
import { checkStatus, parseJSON } from "@/use/FetchService.js";
import { getNotifySetting } from "@/use/notifySetting.js";

import personRepository from "@/repositories/personsRepository";
const personTypes = await personRepository.GetPersonTypes();
const persons = await personRepository.GetPersonLookUp();

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URL_USER = `${BASE_DOMAIN}/api/users`;
const ROLES_URL = `${BASE_DOMAIN}/api/roles`;

const UPLOAD_URL = `${BASE_DOMAIN}/api/Files/Images/profiles/users/2863ae38-9aba-4551-a4b2-7cd8b6e4d2cf`;

export default {
  name: "UserView",
  components: {
    BreadCrumb,
    DxForm,
    DxTextArea,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxToolbar,
    DxItemToolbar,
    DxTabPanel,
    UserRoleTemplate,
    DxTabbedItem,
    DxTabPanelOptions,
    DxTab,
    DxFileUploader,
    DxProgressBar,
  },
  data() {
    return {
      isDropZoneActive: false,
      imageSource: "",
      textVisible: true,
      progressVisible: false,
      progressValue: 0,
      allowedFileExtensions: [".jpg", ".jpeg", ".gif", ".png"],
      uploadUrl: UPLOAD_URL,

      personTypeEmployee: "f35d8016-c93b-4a05-9301-4c228d639a02",
      personTypeContact: "f11d7e55-f12e-4214-b100-0989b38f66bc",
      personTypeDS: personTypes,
      personDS: persons,
      rolesDS: [],

      selectedIndex: 0,
      loop: false,
      animationEnabled: true,
      swipeEnabled: true,
      tabs: [{ tabName: "Roles", tabTitle: "Roles" }],

      backButtonOptions: {
        type: "back",
        onClick: () => {
          this.$router.push({ name: "usersView" });
        },
      },

      refreshButtonOptions: {
        icon: "refresh",
        onClick: () => {
          location.reload();
        },
      },

      addButtonOptions: {
        icon: "plus",
        text: "Nuevo",
        onClick: () => {
          this.$router.push({ name: "userCreateView" });
        },
      },
      saveButtonOptions: { text: "Grabar", onClick: this.updateUser },
      formData: {},
    };
  },

  methods: {
    onDropZoneEnter(e) {
      if (e.dropZoneElement.id === "dropzone-external") {
        this.isDropZoneActive = true;
      }
    },
    onDropZoneLeave(e) {
      if (e.dropZoneElement.id === "dropzone-external") {
        this.isDropZoneActive = false;
      }
    },
    onUploaded(e) {
      console.log("onUploaded - ", e);
      const { file } = e;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.isDropZoneActive = false;
        this.imageSource = fileReader.result;
      };
      fileReader.readAsDataURL(file);
      this.textVisible = false;
      this.progressVisible = false;
      this.progressValue = 0;
    },
    onProgress(e) {
      this.progressValue = (e.bytesLoaded / e.bytesTotal) * 100;
    },
    onUploadStarted() {
      this.imageSource = "";
      this.progressVisible = true;
    },

    fieldDataChanged: function (e) {
      if (e.dataField === "personTypeId") {
        var personEditor = e.component.getEditor("personId");
        let dataSource = personEditor.getDataSource();

        let personType = this.personTypeContact == e.value ? e.value : this.personTypeEmployee;

        dataSource.filter([["personTypeId", "=", e.value], "or", ["personTypeId", "=", personType]]);
        dataSource.load();
        personEditor.reset();
      }
    },

    updateUser() {
      var user = {
        id: this.$route.params.id,
        email: this.formData.email,
        personTypeId: this.formData.personTypeId,
        personId: this.formData.personId,
      };

      fetch(`${URL_USER}/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: { Accept: "application/json", "Content-Type": "application/json" },
      })
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          console.log("data", data);
          if (data.succeeded) {
            notify(getNotifySetting("El registro se actualizo correctamente."));
            return data;
          }
          notify(getNotifySetting("El registro no se actualizo correctamente.", "error"));
        });
    },

    async loadRoles() {
      const result = await this.loadDataFetch(`${ROLES_URL}`).then((data) => data.data.data);
      return result;
    },

    async loadDataFetch(url) {
      return await fetch(`${url}`)
        .then(checkStatus)
        .then(parseJSON)
        .then((data) => {
          return data;
        });
    },

    async loadEntity(id) {
      const result = await this.loadDataFetch(`${URL_USER}/${id}`).then((data) => data);
      if (result.succeeded) {
        if (result.status == 200) {
          this.formData = result.data[0];
        }
      }
    },
  },

  async mounted() {
    this.rolesDS = await this.loadRoles();
    var entityId = this.$route.params.id;
    await this.loadEntity(entityId);
  },
};
</script>

<style scope>
.first-group,
.second-group {
  padding: 20px;
}

.second-group {
  background-color: rgba(191, 191, 191, 0.15);
}

.form-avatar {
  height: 128px;
  width: 128px;
  margin-right: 10px;
  border: 1px solid #d2d3d5;
  border-radius: 50%;
  background-image: url("images/petersmith.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

#dropzone-external {
  width: 128px;
  height: 128px;
  border-radius: 50%;
  background-color: rgba(183, 183, 183, 0.1);
  border-width: 2px;
  border-style: dashed;
  padding: 10px;
}

#dropzone-external > * {
  pointer-events: none;
}

#dropzone-external.dropzone-active {
  border-style: solid;
}

.widget-container > span {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 16px;
}

#dropzone-image {
  max-width: 100%;
  max-height: 100%;
}

#dropzone-text > span {
  font-weight: 100;
  opacity: 0.5;
}

#upload-progress {
  display: flex;
  margin-top: 10px;
}

.flex-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
