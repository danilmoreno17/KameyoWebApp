<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix">
        <DxToolbar>
          <DxItemToolbar :options="saveButtonOptions" location="after" locate-in-menu="auto" widget="dxButton" />
        </DxToolbar>
        <DxForm id="ClientForm" :form-data="client" :col-count="2" v-if="showWhenLoad">
          <DxGroupItem caption="Información del Cliente" :col-count="2">
            <DxSimpleItem data-field="name">
              <DxLabel text="Nombre" />
            </DxSimpleItem>

            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                items: identificationstype,
                displayExpr: 'value',
                disabled: true,
              }"
              data-field="catalogTypeId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Tipo de Identificacion" />
            </DxSimpleItem>

            <DxSimpleItem data-field="numberId">
              <DxLabel text="Numero de Identificacion" />
            </DxSimpleItem>

            <DxSimpleItem data-field="address">
              <DxLabel text="Direccion" />
            </DxSimpleItem>

            <DxSimpleItem data-field="phone">
              <DxLabel text="Telefono" />
            </DxSimpleItem>

            <DxSimpleItem :editor-options="{ min: 1, max: 31 }" data-field="deadlinebilling" editor-type="dxNumberBox">
              <DxLabel text="Fecha Limite de Facturacion" />
            </DxSimpleItem>

            <DxSimpleItem data-field="costHourMen" editor-type="dxNumberBox">
              <DxLabel text="Costo Hora" />
            </DxSimpleItem>

            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                items: subsidiary,
                displayExpr: 'name',
                disabled: true,
              }"
              data-field="subsidiaryId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Filial" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxGroupItem caption="Información Adicional" :col-count="2">
            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                items: country,
                displayExpr: 'value',
                disabled: true,
              }"
              data-field="catalogRegionCountryId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Pais" />
            </DxSimpleItem>

            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                items: state,
                displayExpr: 'value',
                disabled: true,
              }"
              data-field="catalogRegionStateId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Estado" />
            </DxSimpleItem>

            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                items: city,
                displayExpr: 'value',
                disabled: true,
              }"
              data-field="catalogRegionCityId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Ciudad" />
            </DxSimpleItem>

            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                items: industrytype,
                displayExpr: 'value',
                disabled: true,
              }"
              data-field="catalogIndustryTypeId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Tipo de Industria" />
            </DxSimpleItem>

            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                items: industrysubtype,
                displayExpr: 'value',
                disabled: true,
              }"
              data-field="catalogIndustrySubTypeId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Tipo de SubIndustria" />
            </DxSimpleItem>

            <DxSimpleItem
              :editor-options="{
                valueExpr: 'id',
                searchEnabled: true,
                items: currency,
                displayExpr: 'value',
                disabled: true,
              }"
              data-field="catalogCurrencyId"
              editor-type="dxSelectBox"
            >
              <DxLabel text="Moneda" />
            </DxSimpleItem>
          </DxGroupItem>
        </DxForm>
        <DxTabPanel id="tabPanelClient" v-if="showWhenLoad">
          <DxItem title="Proyectos" template="project-tab" />
          <template #project-tab>
            <DxDataGrid
              id="dataGridProject"
              :data-source="projects"
              :show-borders="true"
              :repaint-changes-only="true"
              :remote-operations="true"
              @exporting="onProjectExporting"
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
              <DxEditing
                :refresh-mode="full"
                :allow-adding="true"
                :allow-updating="true"
                :allow-deleting="true"
                mode="popup"
              >
                <DxPopup :show-title="true" :width="700" :height="525" title="Información del Proyecto" />
                <DxGridForm>
                  <DxItem :col-count="2" :col-span="2" item-type="group">
                    <DxItem data-field="name" />
                    <DxItem data-field="mainContactId" />
                    <DxItem data-field="description" />
                    <DxItem data-field="catalogProjectTypeId" />
                    <DxItem data-field="catalogProjectCategoryId" />
                    <DxItem data-field="catalogProjectStateId" />
                    <DxItem data-field="costHourMenCustomer" />
                    <DxItem data-field="costHourMenProject" />
                  </DxItem>

                  <DxItem :col-count="2" :col-span="2" item-type="group" caption="Tiempos del proyecto">
                    <DxItem data-field="startDate" />
                    <DxItem data-field="endDate" />
                    <DxItem data-field="durationHour" />
                    <DxItem data-field="closeDate" />
                  </DxItem>
                </DxGridForm>
              </DxEditing>
              <DxColumn :width="150" data-field="name" caption="Nombre" cell-template="cell-link-template">
                <DxRequiredRule />
              </DxColumn>
              <DxColumn
                :width="150"
                data-field="subsidiaryId"
                caption="Subsidiaria"
                :set-cell-value="setSubsidiaryValue"
              >
                <DxLookup :data-source="subsidiary" value-expr="id" display-expr="name" />
              </DxColumn>
              <DxColumn :width="0" data-field="customerId" caption="Cliente"> </DxColumn>
              <DxColumn :width="150" data-field="mainContactId" caption="Contacto Principal">
                <DxLookup :data-source="contact" value-expr="id" display-expr="names" />
              </DxColumn>
              <DxColumn :width="200" data-field="description" caption="Descripción">
                <DxRequiredRule />
              </DxColumn>
              <DxColumn :width="0" data-field="catalogProjectTypeId" caption="Tipo de Proyecto">
                <DxLookup :data-source="projecttype" value-expr="id" display-expr="value" />
              </DxColumn>
              <DxColumn :width="0" data-field="catalogProjectCategoryId" caption="Categoria de Proyecto">
                <DxLookup :data-source="projectcategory" value-expr="id" display-expr="value" />
              </DxColumn>
              <DxColumn :width="0" data-field="catalogProjectStateId" caption="Estado de Proyecto">
                <DxLookup :data-source="projectstate" value-expr="id" display-expr="value" />
              </DxColumn>
              <DxColumn
                :width="150"
                :set-cell-value="setFullDates"
                data-field="startDate"
                caption="Fecha de Inicio"
                data-type="datetime"
              >
                <DxCustomRule
                  :validation-callback="startDateValidation"
                  message="La fecha de inicio no puede ser mayor o igual a la fecha de fin."
                />
              </DxColumn>
              <DxColumn
                :width="150"
                :set-cell-value="setFullDates"
                data-field="endDate"
                caption="Fecha de Fin"
                data-type="datetime"
              >
                <DxCustomRule
                  :validation-callback="endDateValidation"
                  message="La fecha de fin no puede ser menor o igual a la fecha de inicio."
                />
              </DxColumn>
              <DxColumn
                :width="100"
                :allow-editing="false"
                data-field="durationHour"
                caption="Duración"
                data-type="number"
              >
              </DxColumn>
              <DxColumn :width="150" data-field="closeDate" caption="Fecha de Cierre" data-type="datetime">
                <DxCustomRule
                  :validation-callback="closeDateValidation"
                  message="La fecha de cierre no puede ser menor o igual a la fecha de fin."
                />
              </DxColumn>
              <DxColumn
                :width="0"
                :calculate-cell-value="getCostHourMenCustomer"
                :allow-editing="false"
                data-field="costHourMenCustomer"
                data-type="number"
                format="currency"
                caption="Costo Hora Cliente"
              />
              <DxColumn
                :width="0"
                data-field="costHourMenProject"
                data-type="number"
                format="currency"
                caption="Costo Hora Proyecto"
              />
              <template #cell-link-template="{ data }">
                <cellLink
                  :cell-data="data"
                  :routePath="{
                    name: 'projectView',
                    params: { id: data.data.id },
                  }"
                />
              </template>
            </DxDataGrid>
          </template>
          <DxItem title="Contactos" template="contact-tab" />
          <template #contact-tab>
            <DxDataGrid
              id="dataGridContact"
              :data-source="contacts"
              :show-borders="true"
              key-expr="id"
              @exporting="onContactExporting"
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

              <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup">
                <DxPopup :show-title="true" :width="700" :height="525" title="Contact Info" />
                <DxGridForm>
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
                </DxGridForm>
              </DxEditing>
              <DxColumn :width="150" data-field="parentId" caption="Jefe">
                <DxLookup :data-source="jefe" value-expr="id" display-expr="names" />
              </DxColumn>
              <DxColumn :width="0" data-field="customerId" caption="Cliente"> </DxColumn>
              <DxColumn :width="150" data-field="names" caption="Nombres">
                <DxRequiredRule />
              </DxColumn>
              <DxColumn :width="150" data-field="lastName" caption="Apellidos" />
              <DxColumn :width="0" data-field="area" caption="Area">
                <DxLookup :data-source="area" value-expr="id" display-expr="value" />
              </DxColumn>
              <DxColumn :width="0" data-field="department" caption="Departamento">
                <DxLookup :data-source="department" value-expr="id" display-expr="value" />
              </DxColumn>
              <DxColumn :width="150" data-field="position" caption="Posicion">
                <DxLookup :data-source="position" value-expr="id" display-expr="value" />
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
              <DxColumn :width="0" data-field="phoneOfficeExt" caption="Ext." data-type="number" />
              <DxColumn :width="150" data-field="phoneMobile" caption="Movil">
                <DxPatternRule
                  :pattern="pattern"
                  message='El número de telefono debe tener el siguiente formato:  "(555) 555-5555" !'
                />
              </DxColumn>
            </DxDataGrid>
          </template>
          <DxItem title="Bolsa de Horas" template="hourbank-tab" />
          <template #hourbank-tab>
            <DxDataGrid
              id="dataGridHourBank"
              @init-new-row="onInitNewHourBank"
              :data-source="hourbanks"
              :show-borders="true"
              @exporting="onHourBankExporting"
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
                :display-mode="full"
                :show-page-size-selector="true"
                :show-info="false"
                :show-navigation-buttons="true"
              />

              <DxEditing :allow-updating="true" :allow-adding="true" :allow-deleting="true" mode="popup">
                <DxPopup :show-title="true" :width="700" :height="525" title="Informacion de Bolsa de Hora" />
                <DxGridForm>
                  <DxItem :col-count="2" :col-span="2" item-type="group">
                    <DxItem data-field="name" />
                    <DxItem data-field="description" />
                    <DxItem data-field="purchaseOrderNumber" />
                    <DxItem data-field="invoiceNumber" />
                    <DxItem data-field="catalogHourBankTypeId" />
                    <DxItem data-field="applyValidity" />
                    <DxItem data-field="dateValidity" />
                    <DxItem data-field="terms" />
                    <DxItem data-field="hourCost" />
                    <DxItem data-field="hourBalance" />
                    <DxItem data-field="hourSet" />
                  </DxItem>
                </DxGridForm>
              </DxEditing>
              <DxColumn :width="0" data-field="customerId" caption="Cliente"> </DxColumn>
              <DxColumn :width="150" data-field="name" caption="Nombre">
                <DxRequiredRule />
              </DxColumn>
              <DxColumn :width="150" data-field="description" caption="Descripcion"> </DxColumn>
              <DxColumn :width="0" data-field="purchaseOrderNumber" caption="Numero de Orden"> </DxColumn>
              <DxColumn :width="150" data-field="invoiceNumber" caption="Numero de Factura"> </DxColumn>
              <DxColumn :width="0" data-field="catalogHourBankTypeId" caption="Tipo de Banco de Hora">
                <DxLookup :data-source="hourbanktype" value-expr="id" display-expr="value" />
              </DxColumn>
              <DxColumn :width="0" data-field="applyValidity" data-type="boolean" caption="Vigente">
                <DxCheckBox :value="applyValidity" />
              </DxColumn>
              <DxColumn :width="150" data-field="dateValidity" caption="Fecha de Caducidad" data-type="date">
              </DxColumn>
              <DxColumn :width="0" data-field="terms" caption="Terminos"> </DxColumn>
              <DxColumn :width="100" :calculate-cell-value="getCurrency" :allow-editing="false" caption="Moneda">
                <DxLookup :data-source="currency" value-expr="id" display-expr="value" />
              </DxColumn>
              <DxColumn :width="100" data-field="hourCost" caption="Costo de Hora" data-type="number"> </DxColumn>
              <DxColumn
                :width="100"
                :allow-editing="false"
                data-field="hourBalance"
                caption="Saldo de Horas"
                data-type="number"
              >
              </DxColumn>
              <DxColumn
                :width="100"
                :set-cell-value="setHourSetValue"
                data-field="hourSet"
                caption="Cantidad Inicial de Horas"
                data-type="number"
              >
                <DxCustomRule
                  :validation-callback="hourSetValidation"
                  message="No se puede modificar la cantidad de horas pror transacciones existentes."
                />
              </DxColumn>
            </DxDataGrid>
          </template>
        </DxTabPanel>
        <DxToast v-model:visible="isVisible" v-model:message="message" v-model:type="type" />
        <DxLoadIndicator id="large-indicator" :height="60" :width="60" :visible="loadIndicatorVisible" />
      </div>
    </div>
  </div>
</template>
<script>
import { DxForm, DxSimpleItem, DxGroupItem, DxLabel, DxItem } from "devextreme-vue/form";
import { DxToast } from "devextreme-vue/toast";
import DxToolbar, { DxItem as DxItemToolbar } from "devextreme-vue/toolbar";
import { DxTabPanel, DxItem as DxItemTabPanel } from "devextreme-vue/tab-panel";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import CustomStore from "devextreme/data/custom_store";
import cellLink from "@/components/DataGrid/CellLinkTemplate.vue";

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
  DxForm as DxGridForm,
  DxCustomRule,
  DxHeaderFilter,
  DxSearchPanel,
  DxExport,
  DxSelection,
  DxGroupPanel,
  DxGrouping,
} from "devextreme-vue/data-grid";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const customersRepository = RepositoryFactory.get("customers");
const catalogsRepository = RepositoryFactory.get("catalogs");
const subsidiariesRepository = RepositoryFactory.get("subsidiaries");
const contactsRepository = RepositoryFactory.get("contacts");
const projectsRepository = RepositoryFactory.get("projects");
const hourbanksRepository = RepositoryFactory.get("hourBanks");

const countries = await catalogsRepository.Get("NAME", "COUNTRIES");
const states = await catalogsRepository.Get("NAME", "STATES");
const cities = await catalogsRepository.Get("NAME", "CITY");

import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";

export default {
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxLabel,
    DxItem,
    DxToast,
    DxToolbar,
    DxItemToolbar,
    DxTabPanel,
    DxItemTabPanel,
    DxLoadIndicator,
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
    DxGridForm,
    DxCustomRule,
    DxHeaderFilter,
    DxSearchPanel,
    DxExport,
    DxSelection,
    DxGroupPanel,
    DxGrouping,
    BreadCrumb,
    cellLink,
  },
  data() {
    return {
      client: {},
      projects: new CustomStore({
        key: "id",
        load: () => {
          return this.getProjects();
        },
        insert: (values) => {
          return this.createProject(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateProject(values);
        },
        remove: (key) => {
          return this.deleteProject(key);
        },
      }),
      contacts: new CustomStore({
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
      hourbanks: new CustomStore({
        key: "id",
        load: () => {
          return this.getHourBanks();
        },
        insert: (values) => {
          return this.createHourBank(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateHourBank(values);
        },
        remove: (key) => {
          return this.deleteHourBank(key);
        },
      }),
      country: countries.data.data,
      state: states.data.data,
      city: cities.data.data,
      industrytype: {},
      industrysubtype: {},
      currency: {},
      subsidiary: {},
      identificationstype: {},
      projecttype: {},
      projectcategory: {},
      projectstate: {},
      area: {},
      department: {},
      position: {},
      hourbanktype: {},
      contact: {},
      jefe: {},
      showWhenLoad: false,
      loadIndicatorVisible: true,
      isVisible: false,
      message: "",
      type: "info",
      saveButtonOptions: {
        text: "Grabar",
        onClick: async () => {
          this.updateClient(this.client);
        },
      },
      setHourSetValue(rowData, value, currentRowData) {
        if (currentRowData.id != undefined) {
          if (currentRowData.hourSet == currentRowData.hourBalance) rowData.hourBalance = value;
        } else {
          rowData.hourBalance = value;
        }
        this.defaultSetCellValue(rowData, value);
      },
      setFullDates(rowData, value, currentRowData) {
        if (currentRowData.startDate != undefined && value != undefined) {
          const diffTime = Math.abs(value - new Date(currentRowData.startDate));
          const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
          rowData.durationHour = diffHours;
        }
        if (currentRowData.endDate != undefined && value != undefined) {
          const diffTime = Math.abs(new Date(currentRowData.endDate) - value);
          const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
          rowData.durationHour = diffHours;
        }
        this.defaultSetCellValue(rowData, value);
      },
    };
  },
  methods: {
    getClientById: async function (id) {
      const { data } = await customersRepository.Get("ID", id);
      this.client = data.data[0];
      this.showWhenLoad = true;
      this.loadIndicatorVisible = false;
    },
    getContactsByCustomerId: async function (id) {
      const { data } = await contactsRepository.Get("CUSTOMERID", id);
      this.contact = data.data;
    },
    getParentContactByCustomerId: async function (id) {
      const { data } = await contactsRepository.Get("PARENTCUSTOMERID", id);
      this.jefe = data.data;
    },
    updateClient: async function (Client) {
      const { data } = await customersRepository
        .Update(Client)
        .then(function (response) {
          return response;
        })
        .catch(function (err) {
          return err.response;
        });
      this.type = data.succeeded ? "success" : "error";
      this.message = data.succeeded ? "El cliente fue actualizado exitosamente." : data.errors[0].message;
      this.isVisible = true;
    },
    getProjects: async function () {
      const { data } = await projectsRepository.Get("CUSTOMERID", this.client.id);
      data.totalCount = data.data.length;
      return data;
    },
    createProject: async function (project) {
      project.customerId = this.client.id;
      const { data } = await projectsRepository.Create(project);
      return data;
    },
    updateProject: async function (project) {
      const { data } = await projectsRepository.Update(project);
      return data;
    },
    deleteProject: async function (id) {
      const { data } = await projectsRepository.Delete(id);
      return data;
    },
    getContacts: async function () {
      const { data } = await contactsRepository.Get("CUSTOMERID", this.client.id);
      data.totalCount = data.data.length;
      return data;
    },
    createContact: async function (contact) {
      contact.customerId = this.client.id;
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
    getHourBanks: async function () {
      const { data } = await hourbanksRepository.Get("CUSTOMERID", this.client.id);
      data.totalCount = data.data.length;
      return data;
    },
    createHourBank: async function (hourBank) {
      hourBank.customerId = this.client.id;
      const { data } = await hourbanksRepository.Create(hourBank);
      return data;
    },
    updateHourBank: async function (hourBank) {
      const { data } = await hourbanksRepository.Update(hourBank);
      return data;
    },
    deleteHourBank: async function (id) {
      const { data } = await hourbanksRepository.Delete(id);
      return data;
    },
    getCurrency: function (data) {
      return this.client.catalogCurrencyId;
    },
    hourSetValidation: function (params) {
      return params.data.hourSet == params.data.hourBalance;
    },
    getIndustryTpes: async function () {
      const { data } = await catalogsRepository.Get("NAME", "INDUSTRYTYPE");
      this.industrytype = data.data;
    },
    getIndustrySubtypes: async function () {
      const { data } = await catalogsRepository.Get("NAME", "INDUSTRYSUBTYPE");
      this.industrysubtype = data.data;
    },
    getCurrencies: async function () {
      const { data } = await catalogsRepository.Get("NAME", "CURRENCY");
      this.currency = data.data;
    },
    getSubsidiaries: async function () {
      const { data } = await subsidiariesRepository.GetWithPagination({});
      this.subsidiary = data;
    },
    getIdentificationTypes: async function () {
      const { data } = await catalogsRepository.Get("NAME", "IDENTIFICATIONTYPE");
      this.identificationstype = data.data;
    },
    getProjectTypes: async function () {
      const { data } = await catalogsRepository.Get("NAME", "PROJECTTYPE");
      this.projecttype = data.data;
    },
    getProjectCategories: async function () {
      const { data } = await catalogsRepository.Get("NAME", "PROJECTCATEGORY");
      this.projectcategory = data.data;
    },
    getProjectStates: async function () {
      const { data } = await catalogsRepository.Get("NAME", "PROJECTSTATE");
      this.projectstate = data.data;
    },
    getAreas: async function () {
      const { data } = await catalogsRepository.Get("NAME", "AREA");
      this.area = data.data;
    },
    getDepartments: async function () {
      const { data } = await catalogsRepository.Get("NAME", "DEPARTMEN");
      this.department = data.data;
    },
    getPositions: async function () {
      const { data } = await catalogsRepository.Get("NAME", "POSITION");
      this.position = data.data;
    },
    getHourBankTypes: async function () {
      const { data } = await catalogsRepository.Get("NAME", "HOURBANKTYPE");
      this.hourbanktype = data.data;
    },
    startDateValidation: function (params) {
      return params.data.startDate != undefined && params.data.endDate != undefined
        ? params.data.startDate < params.data.endDate
        : true;
    },
    endDateValidation: function (params) {
      return params.data.startDate != undefined && params.data.endDate != undefined
        ? params.data.endDate > params.data.startDate
        : true;
    },
    closeDateValidation: function (params) {
      return params.data.endDate != undefined && params.data.closeDate != undefined
        ? params.data.endDate < params.data.closeDate
        : true;
    },
    getCostHourMenCustomer: function (data) {
      return this.client.costHourMen; /*data.customerId != undefined && Object.keys(this.customer).length != 0
        ? this.customer.filter((x) => x.id == data.customerId)[0].costHourMen
        : 0;*/
    },
    onInitNewHourBank: function (params) {
      params.data.applyValidity = true;
    },
    onProjectExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Proyectos");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Proyectos.xlsx");
        });
      });
      e.cancel = true;
    },
    onContactExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Contactos");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Contactos.xlsx");
        });
      });
      e.cancel = true;
    },
    onHourBankExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Bolsa de Horas");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "BolsaHoras.xlsx");
        });
      });
      e.cancel = true;
    },
  },
  async created() {
    var clientId = this.$route.params.id;
    await this.getClientById(clientId)
      .then(this.getContactsByCustomerId(clientId))
      .then(this.getParentContactByCustomerId(clientId));
    await this.getIndustryTpes();
    await this.getIndustrySubtypes();
    await this.getCurrencies();
    await this.getSubsidiaries();
    await this.getIdentificationTypes();

    await this.getProjectTypes();
    await this.getProjectCategories();
    await this.getProjectStates();

    await this.getAreas();
    await this.getDepartments();
    await this.getPositions();

    await this.getHourBankTypes();
  },
};
</script>
<style>
#ClientForm {
  width: 100%;
}
#dataGridProject,
#dataGridContact,
#dataGridHourBank {
  height: 450px;
  width: 100%;
  padding-left: 10px;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridProject,
  #dataGridContact,
  #dataGridHourBank,
  #dataGridStudy {
    height: 760px;
  }
}
</style>
