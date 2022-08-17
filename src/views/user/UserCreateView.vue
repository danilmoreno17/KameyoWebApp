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
                <DxItemToolbar :options="addButtonOptions" location="after" locate-in-menu="auto" widget="dxButton" />
                <DxItemToolbar :options="saveButtonOptions" location="after" locate-in-menu="auto" widget="dxButton" />
              </DxToolbar>
            </div>
            <div class="body">
              <form ref="formCreateUser" action="your-action" @submit="handleSubmit">
                <div id="formUserCreateView">
                  <DxPopup
                    v-model:visible="popupVisible"
                    :drag-enabled="false"
                    :hide-on-outside-click="true"
                    :show-close-button="false"
                    :show-title="true"
                    :width="300"
                    :height="280"
                    container=".dx-viewport"
                    title="Informacion"
                  >
                    <DxToolbarItem
                      widget="dxButton"
                      toolbar="bottom"
                      location="after"
                      :options="popupCloseButtonOptions"
                    />
                    <p>
                      <span>{{ popupMessageSave }}</span>
                    </p>
                  </DxPopup>
                  <div class="editors">
                    <div class="center">
                      <DxTextBox
                        :styling-mode="stylingMode"
                        :label-mode="labelMode"
                        v-model:value="formData.email"
                        width="100%"
                        placeholder="Email"
                        label="Email"
                      >
                        <DxValidator>
                          <DxRequiredRule message="Correo electronico es requerido" />
                          <DxEmailRule message="Correo electronico no es valido" />
                          <!-- <DxAsyncRule
                            :validation-callback="ValidationEmail"
                            message="Correo electronico ya esta registrado."
                          /> -->
                        </DxValidator>
                      </DxTextBox>
                    </div>
                    <div class="editors-container">
                      <div class="left">
                        <DxTextBox
                          :styling-mode="stylingMode"
                          :label-mode="labelMode"
                          v-model:value="formData.password"
                          :mode="passwordMode"
                          width="100%"
                          placeholder="Contraseña"
                          label="Contraseña"
                        >
                          <DxTextBoxButton :options="passwordButton" name="password" location="after" />
                          <DxValidator>
                            <DxRequiredRule message="Contraseña es requerida." />
                          </DxValidator>
                        </DxTextBox>

                        <DxTextBox
                          :styling-mode="stylingMode"
                          :label-mode="labelMode"
                          v-model:mode="confirmPasswordMode"
                          width="100%"
                          placeholder="Confirmar contraseña"
                          label="Confirmar contraseña"
                        >
                          <DxTextBoxButton :options="confirmPasswordButton" name="confirmPassword" location="after" />

                          <DxValidator>
                            <DxRequiredRule message="Confirmacion de la contraseña es requerida" />
                            <DxCompareRule
                              message="Contraseña y Confirmacion de la contraseña no son iguales"
                              :comparison-target="passwordComparison"
                            />
                          </DxValidator>
                        </DxTextBox>
                      </div>

                      <div class="right">
                        <DxSelectBox
                          :items="personTypeDS"
                          :styling-mode="stylingMode"
                          :label-mode="labelMode"
                          :value="formData.personTypeId"
                          displayExpr="name"
                          valueExpr="id"
                          showClearButton="true"
                          width="100%"
                          placeholder="Tipo de usuario"
                          label="Tipo de usuario"
                        >
                        </DxSelectBox>

                        <DxSelectBox
                          :items="personDS"
                          :styling-mode="stylingMode"
                          :label-mode="labelMode"
                          :value="formData.personId"
                          displayExpr="fullName"
                          valueExpr="id"
                          searchEnabled="true"
                          showClearButton="true"
                          width="100%"
                          placeholder="Persona"
                          label="Persona"
                        >
                        </DxSelectBox>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";

import DxSelectBox from "devextreme-vue/select-box";
import { DxTextBox, DxButton as DxTextBoxButton } from "devextreme-vue/text-box";
import DxButton from "devextreme-vue/button";
import { DxValidator, DxRequiredRule, DxCompareRule, DxAsyncRule, DxEmailRule } from "devextreme-vue/validator";
import DxToolbar, { DxItem as DxItemToolbar } from "devextreme-vue/toolbar";
import notify from "devextreme/ui/notify";

import { DxPopup, DxPosition, DxToolbarItem } from "devextreme-vue/popup";

import { checkStatus, parseJSON } from "@/use/FetchService.js";
import { getNotifySetting } from "@/use/notifySetting.js";

import personRepository from "@/repositories/personsRepository";
const personTypes = await personRepository.GetPersonTypes();
const persons = await personRepository.GetPersonLookUp();

const BASE_DOMAIN = import.meta.env.VITE_BASE_URL_API;
const URL_USER = `${BASE_DOMAIN}/api/users`;
const ROLES_URL = `${BASE_DOMAIN}/api/roles`;

const UPLOAD_URL = `${BASE_DOMAIN}/api/Files/Images/profiles/users/2863ae38-9aba-4551-a4b2-7cd8b6e4d2cf`;

const sendRequest = async (value) => {
  const validEmail = "test@dx-email.com";
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value === validEmail);
    }, 1000);
  });
};

export default {
  name: "UserView",
  components: {
    BreadCrumb,
    DxToolbar,
    DxItemToolbar,
    DxRequiredRule,
    DxCompareRule,
    DxAsyncRule,
    DxEmailRule,
    DxTextBox,

    DxSelectBox,
    DxButton,
    DxValidator,
    DxTextBoxButton,

    DxPopup,
    DxPosition,
    DxToolbarItem,
  },
  data() {
    return {
      stylingMode: "filled",
      labelMode: "floating",
      passwordMode: "password",
      confirmPasswordMode: "password",

      popupVisible: false,
      popupMessageSave: "",

      personTypeEmployee: "f35d8016-c93b-4a05-9301-4c228d639a02",
      personTypeContact: "f11d7e55-f12e-4214-b100-0989b38f66bc",
      personTypeDS: personTypes,
      personDS: persons,
      rolesDS: [],

      formData: {
        id: "",
        email: "",
        password: "",
        personTypeId: "",
        personId: "",
      },

      backButtonOptions: {
        type: "back",
        onClick: () => {
          this.$router.push({ name: "usersView" });
        },
      },

      addButtonOptions: {
        icon: "user",
        text: "Nuevo",
        onClick: () => {
          this.formData = {
            id: "",
            email: "",
            password: "",
            personTypeId: "",
            personId: "",
          };
        },
      },

      saveButtonOptions: {
        icon: "check",
        text: "Grabar",
        type: "success",
        onClick: async (e) => {
          const result = await e.validationGroup.validate();
          console.log("validationGroup - ", e.validationGroup);
          console.log("validationGroup - ", result);
          if (result.isValid) {
            await this.createUser();
          } else {
            notify("Los datos no se guardaron. Por favor, compruebe si todos los campos son válidos.", "error");
          }
        },
      },

      buttonOptions: {
        icon: "check",
        text: "Grabar",
        type: "success",
        useSubmitBehavior: true,
      },

      passwordButton: {
        icon: "/assets/icons/eye.png",
        type: "default",
        onClick: () => {
          this.passwordMode = this.passwordMode === "text" ? "password" : "text";
        },
      },

      confirmPasswordButton: {
        icon: "/assets/icons/eye.png",
        type: "default",
        onClick: () => {
          this.confirmPasswordMode = this.confirmPasswordMode === "text" ? "password" : "text";
        },
      },

      popupCloseButtonOptions: {
        text: "Close",
        onClick: () => {
          this.popupVisible = false;
        },
      },
    };
  },

  methods: {
    async ValidationEmail(params) {
      console.log("asyncValidationEmail - ", params.value);
      return await sendRequest(params.value);
    },

    passwordComparison() {
      console.log("passwordComparison - ", this.formData.password);
      return this.formData.password;
    },

    handleSubmit(e) {
      // notify(
      //   {
      //     message: "You have submitted the form",
      //     position: {
      //       my: "center top",
      //       at: "center top",
      //     },
      //   },
      //   "success",
      //   3000
      // );
      e.preventDefault();
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

    isEmptyOrSpaces(str) {
      return str === null || str.match(/^ *$/) !== null;
    },

    async createUser() {
      const method = "POST";

      var user = {
        email: this.formData.email,
        password: this.formData.password,
        personTypeId: this.isEmptyOrSpaces(this.formData.personTypeId) ? null : this.formData.personTypeId,
        personId: this.isEmptyOrSpaces(this.formData.personId) ? null : this.formData.personId,
      };

      console.log("createUser - ", JSON.stringify(user));

      return (
        fetch(`${URL_USER}`, {
          method,
          body: JSON.stringify(user),
          headers: { Accept: "application/json", "Content-Type": "application/json" },
        })
          //.then(checkStatus)
          //.then(parseJSON)
          .then((data) => {
            console.log("createUser - ", data);
            if (data.ok) {
              this.popupVisible = true;
              this.popupMessageSave = "Los datos se guardó con éxito.";
              this.clearFormData();
            } else {
              return data.json();
            }
          })
          .then((response) => {
            let errors = "Los datos NO se guardaron.\n";

            if (response.hasOwnProperty("succeeded")) {
              response.errors.forEach((element) => {
                errors = errors + "\n" + "* " + element.message;
                console.log("errors - ", errors);
              });
            }
            this.popupVisible = true;
            this.popupMessageSave = errors;

            console.log("errors - ", errors);
          })
      );
    },

    clearFormData() {
      this.formData = {
        id: "",
        email: "",
        password: "",
        personTypeId: "",
        personId: "",
      };
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
  },

  async mounted() {
    this.rolesDS = await this.loadRoles();
  },
};
</script>

<style scope>
#formUserCreateView {
  height: 450px;
  width: 100%;
  padding-left: 10px;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #formUserCreateView {
    height: 605px;
  }
}

.first-group,
.second-group {
  padding: 20px;
}

.second-group {
  background-color: rgba(191, 191, 191, 0.15);
}

.flex-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  padding: 20px 0 20px 0;
  font-size: 18px;
  font-weight: 500;
}

.editors {
  margin-right: 0px;
  height: 100%;
}

.editors .left {
  padding: 0 10px 0 0;
}

.editors .right {
  padding: 0 0 0 10px;
}

.editors .left,
.editors .right {
  flex-grow: 1;
}

.editors .left > *,
.editors .right > *,
.editors .center > * {
  margin-bottom: 20px;
}

.editors .center {
  padding: 0 0 0 0;
}

.validate {
  float: right;
}

.options {
  padding: 20px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 260px;
  top: 0;
  background-color: rgba(191, 191, 191, 0.15);
}

.caption {
  font-size: 18px;
  font-weight: 500;
}

.option {
  margin-top: 20px;
}

.editors-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 0px;
  border: 5px;
  border-color: blue;
}

.dx-popup-content p {
  margin-bottom: 10px;
  margin-top: 0;
}
</style>
