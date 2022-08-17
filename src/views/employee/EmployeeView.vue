<template>
  <div id="main-content">
    <div class="container-fluid">
      <div class="block-header">
        <bread-crumb></bread-crumb>
      </div>
      <div class="row clearfix"></div>
      <DxToolbar>
        <DxItemToolbar :options="saveButtonOptions" location="after" locate-in-menu="auto" widget="dxButton" />
      </DxToolbar>
      <DxForm id="formEmployee" :form-data="employee" :col-count="2" v-if="showWhenLoad">
        <DxGroupItem caption="Información del Empleado" :col-count="2">
          <DxSimpleItem data-field="names">
            <DxLabel text="Nombres" />
          </DxSimpleItem>
          <DxSimpleItem data-field="lastName">
            <DxLabel text="Apellidos" />
          </DxSimpleItem>
          <!--parentId-->
          <DxSimpleItem
            :editor-options="{
              valueExpr: 'id',
              searchEnabled: true,
              items: jefe,
              displayExpr: 'names',
            }"
            data-field="parentId"
            editor-type="dxSelectBox"
          >
            <DxLabel text="Jefe" />
          </DxSimpleItem>
          <!--subsidiaryId-->
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
          <!--catalogAreaId-->
          <DxSimpleItem
            :editor-options="{
              valueExpr: 'id',
              searchEnabled: true,
              items: area,
              displayExpr: 'value',
            }"
            data-field="catalogAreaId"
            editor-type="dxSelectBox"
          >
            <DxLabel text="Area" />
          </DxSimpleItem>
          <!--catalogDepartmentId-->
          <DxSimpleItem
            :editor-options="{
              valueExpr: 'id',
              searchEnabled: true,
              items: department,
              displayExpr: 'value',
            }"
            data-field="catalogDepartmentId"
            editor-type="dxSelectBox"
          >
            <DxLabel text="Departamento" />
          </DxSimpleItem>
          <!--catalogCostCenterId-->
          <DxSimpleItem
            :editor-options="{
              valueExpr: 'id',
              searchEnabled: true,
              items: costcenter,
              displayExpr: 'value',
            }"
            data-field="catalogCostCenterId"
            editor-type="dxSelectBox"
          >
            <DxLabel text="Centro de Costo" />
          </DxSimpleItem>
          <!--catalogPositionId-->
          <DxSimpleItem
            :editor-options="{
              valueExpr: 'id',
              searchEnabled: true,
              items: position,
              displayExpr: 'value',
            }"
            data-field="catalogPositionId"
            editor-type="dxSelectBox"
          >
            <DxLabel text="Posicion" />
          </DxSimpleItem>
          <!--catalogCurrencyId-->
          <DxSimpleItem
            :editor-options="{
              valueExpr: 'id',
              searchEnabled: true,
              items: currency,
              displayExpr: 'value',
            }"
            data-field="catalogCurrencyId"
            editor-type="dxSelectBox"
          >
            <DxLabel text="Moneda" />
          </DxSimpleItem>
          <!--catalogEmployeeTypeId-->
          <DxSimpleItem
            :editor-options="{
              valueExpr: 'id',
              searchEnabled: true,
              items: employeeType,
              displayExpr: 'value',
            }"
            data-field="catalogEmployeeTypeId"
            editor-type="dxSelectBox"
          >
            <DxLabel text="Tipo Empleado" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem caption="Información del Adicional" :col-count="2">
          <DxSimpleItem data-field="costHour">
            <DxLabel text="Costo Hora" />
          </DxSimpleItem>
          <DxSimpleItem data-field="phoneOffice" :editor-options="phoneEditorOptions">
            <DxPatternRule
              :pattern="phonePattern"
              message='El número de telefono debe tener el siguiente formato:  "(555) 555-5555" !'
            />
            <DxLabel text="Telefono Oficina" />
          </DxSimpleItem>
          <DxSimpleItem data-field="phoneOfficeExt" editor-type="dxNumberBox">
            <DxLabel text="Ext." />
          </DxSimpleItem>
          <DxSimpleItem data-field="phoneMobile" :editor-options="phoneEditorOptions">
            <DxPatternRule
              :pattern="phonePattern"
              message='El número de telefono debe tener el siguiente formato:  "(555) 555-5555" !'
            />
            <DxLabel text="Movil" />
          </DxSimpleItem>
          <DxSimpleItem data-field="calculateFactor">
            <DxLabel text="Factor de Calculo" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxForm>
      <DxTabPanel id="tabPanelEmployee" v-if="showWhenLoad">
        <DxItem title="Premios" template="award-tab" />
        <template #award-tab>
          <DxDataGrid
            id="dataGridAward"
            :data-source="employeeAwards"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
            @exporting="onAwardExporting"
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
              <DxPopup :show-title="true" :width="700" :height="525" title="Información del Premio" />
              <DxGridForm>
                <DxItem data-field="institution" />
                <DxItem data-field="description" />
                <DxItem data-field="awardDate" />
              </DxGridForm>
            </DxEditing>
            <DxColumn :width="200" data-field="institution" caption="Institucion">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="200" data-field="description" caption="Descripcion"> </DxColumn>
            <DxColumn :width="200" data-field="awardDate" caption="Fecha de Premiacion" data-type="date"> </DxColumn>
          </DxDataGrid>
        </template>
        <DxItem title="Cerificaciones" template="certification-tab" />
        <template #certification-tab>
          <DxDataGrid
            id="dataGridCertificaction"
            :data-source="employeeCertifications"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
            @exporting="onCertificationExporting"
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
              <DxPopup :show-title="true" :width="700" :height="525" title="Información de la Certificacion" />
              <DxGridForm>
                <DxItem data-field="name" />
                <DxItem data-field="institution" />
                <DxItem data-field="emissionDate" />
                <DxItem data-field="productionDate" />
                <DxItem data-field="expirationDate" />
              </DxGridForm>
            </DxEditing>
            <DxColumn :width="200" data-field="name" caption="Nombre">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="200" data-field="institution" caption="Institucion">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="200" data-field="emissionDate" caption="Fecha de Emision" data-type="date"> </DxColumn>
            <DxColumn :width="200" data-field="productionDate" caption="Fecha de Finalizacion" data-type="date">
            </DxColumn>
            <DxColumn :width="200" data-field="expirationDate" caption="Fecha de Expiracion" data-type="date">
            </DxColumn>
          </DxDataGrid>
        </template>
        <DxItem title="Experiencia" template="experience-tab" />
        <template #experience-tab>
          <DxDataGrid
            id="dataGridExperience"
            :data-source="employeeExperiences"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
            @exporting="onExperienceExporting"
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
              <DxPopup :show-title="true" :width="700" :height="525" title="Información de la Experiencia" />
              <DxGridForm>
                <DxItem data-field="title" />
                <DxItem data-field="companyName" />
                <DxItem data-field="type" />
                <DxItem data-field="companyCity" />
                <DxItem data-field="beginDate" />
                <DxItem data-field="finishDate" />
                <DxItem data-field="description" />
              </DxGridForm>
            </DxEditing>
            <DxColumn :width="200" data-field="title" caption="Cargo">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="200" data-field="companyName" caption="Nombre de Empresa">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="200" data-field="type" caption="Tipo de Empleo"> </DxColumn>
            <DxColumn :width="200" data-field="companyCity" caption="Ubicacion"> </DxColumn>
            <DxColumn :width="200" data-field="beginDate" caption="Fecha de Inicio" data-type="date"> </DxColumn>
            <DxColumn :width="200" data-field="finishDate" caption="Fecha de Fin" data-type="date"> </DxColumn>
            <DxColumn :width="200" data-field="description" caption="Descripcion"> </DxColumn>
          </DxDataGrid>
        </template>
        <DxItem title="Aptitudes y Habilidades" template="skill-tab" />
        <template #skill-tab>
          <DxDataGrid
            id="dataGridSkill"
            :data-source="employeeSkillAbilities"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
            @exporting="onSkillExporting"
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
              <DxPopup :show-title="true" :width="700" :height="525" title="Información de Aptitudes y Habilidades" />
              <DxGridForm>
                <DxItem data-field="description" />
              </DxGridForm>
            </DxEditing>
            <DxColumn :width="200" data-field="description" caption="Descripcion">
              <DxRequiredRule />
            </DxColumn>
          </DxDataGrid>
        </template>
        <DxItem title="Estudios" template="study-tab" />
        <template #study-tab>
          <DxDataGrid
            id="dataGridStudy"
            :data-source="employeesStudies"
            :show-borders="true"
            :repaint-changes-only="true"
            :remote-operations="true"
            @exporting="onStudyExporting"
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
              <DxPopup :show-title="true" :width="700" :height="525" title="Información del Estudio" />
              <DxGridForm>
                <DxItem data-field="institution" />
                <DxItem data-field="degree" />
                <DxItem data-field="fieldKnowledge" />
                <DxItem data-field="emissionDate" />
              </DxGridForm>
            </DxEditing>
            <DxColumn :width="200" data-field="institution" caption="Institucion">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="200" data-field="degree" caption="Titulo">
              <DxRequiredRule />
            </DxColumn>
            <DxColumn :width="200" data-field="fieldKnowledge" caption="Disciplina"> </DxColumn>
            <DxColumn :width="200" data-field="emissionDate" caption="Fecha de Emision" data-type="date"> </DxColumn>
          </DxDataGrid>
        </template>
      </DxTabPanel>
      <DxToast v-model:visible="isVisible" v-model:message="message" v-model:type="type" />
      <DxLoadIndicator id="large-indicator" :height="60" :width="60" :visible="loadIndicatorVisible" />
    </div>
  </div>
</template>

<script>
import { DxForm, DxSimpleItem, DxGroupItem, DxLabel, DxPatternRule, DxItem } from "devextreme-vue/form";
import { DxToast } from "devextreme-vue/toast";
import DxToolbar, { DxItem as DxItemToolbar } from "devextreme-vue/toolbar";
import { DxTabPanel, DxItem as DxItemTabPanel } from "devextreme-vue/tab-panel";
import BreadCrumb from "@/components/BreadCrumb.vue";
import { DxLoadIndicator } from "devextreme-vue/load-indicator";
import CustomStore from "devextreme/data/custom_store";

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
  DxForm as DxGridForm,
} from "devextreme-vue/data-grid";

import { RepositoryFactory } from "@/repositories/RepositoryFactory";
const employeesRepository = RepositoryFactory.get("employees");
const employeeAwardsRepository = RepositoryFactory.get("employeeAwards");
const employeeCertificationsRepository = RepositoryFactory.get("employeeCertifications");
const employeeExperiencesRepository = RepositoryFactory.get("employeeExperiences");
const employeeSkillAbilitiesRepository = RepositoryFactory.get("employeeSkillAbilities");
const employeesStudiesRepository = RepositoryFactory.get("employeeStudies");
const catalogsRepository = RepositoryFactory.get("catalogs");
const subsidiariesRepository = RepositoryFactory.get("subsidiaries");

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
    DxPatternRule,
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
    DxGridForm,
    BreadCrumb,
  },
  data() {
    return {
      employee: {},
      employeeAwards: new CustomStore({
        key: "id",
        load: () => {
          return this.getEmployeeAwards();
        },
        insert: (values) => {
          return this.createEmployeeAward(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateEmployeeAward(values);
        },
        remove: (key) => {
          return this.deleteEmployeeAward(key);
        },
      }),
      employeeCertifications: new CustomStore({
        key: "id",
        load: () => {
          return this.getEmployeeCertifications();
        },
        insert: (values) => {
          return this.createEmployeeCertification(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateEmployeeCertification(values);
        },
        remove: (key) => {
          return this.deleteEmployeeCertification(key);
        },
      }),
      employeeExperiences: new CustomStore({
        key: "id",
        load: () => {
          return this.getEmployeeExperiences();
        },
        insert: (values) => {
          return this.createEmployeeExperience(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateEmployeeExperience(values);
        },
        remove: (key) => {
          return this.deleteEmployeeExperience(key);
        },
      }),
      employeeSkillAbilities: new CustomStore({
        key: "id",
        load: () => {
          return this.getEmployeeSkillAbilities();
        },
        insert: (values) => {
          return this.createEmployeeSkillAbility(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateEmployeeSkillAbility(values);
        },
        remove: (key) => {
          return this.deleteEmployeeSkillAbility(key);
        },
      }),
      employeesStudies: new CustomStore({
        key: "id",
        load: () => {
          return this.getEmployeeStudies();
        },
        insert: (values) => {
          return this.createEmployeeStudy(values);
        },
        update: (key, values) => {
          values.id = key;
          return this.updateEmployeeStudy(values);
        },
        remove: (key) => {
          return this.deleteEmployeeStudy(key);
        },
      }),
      area: {},
      department: {},
      costcenter: {},
      position: {},
      currency: {},
      employeeType: {},
      subsidiary: {},
      jefe: {},
      showWhenLoad: false,
      loadIndicatorVisible: true,
      isVisible: false,
      message: "",
      type: "info",
      saveButtonOptions: {
        text: "Grabar",
        onClick: async () => {
          this.updateEmployee(this.employee);
        },
      },
      phoneEditorOptions: {
        mask: "(X00) 000-0000",
        maskRules: {
          X: /[02-9]/,
        },
        useMaskedValue: true,
      },
      phonePattern: /^\(\d{3}\) \d{3}-\d{4}$/i,
    };
  },
  methods: {
    getEmployeeById: async function (id) {
      const { data } = await employeesRepository.Get("ID", id);
      this.employee = data.data[0];
      this.showWhenLoad = true;
      this.loadIndicatorVisible = false;
    },
    updateEmployee: async function (employee) {
      const { data } = await employeesRepository
        .Update(employee)
        .then(function (response) {
          return response;
        })
        .catch(function (err) {
          return err.response;
        });
      this.type = data.succeeded ? "success" : "error";
      this.message = data.succeeded ? "El empleado fue actualizado exitosamente." : data.errors[0].message;
      this.isVisible = true;
    },
    getEmployeeAwards: async function () {
      const { data } = await employeeAwardsRepository.Get("EMPLOYEEID", this.employee.id);
      data.totalCount = data.data.length;
      return data;
    },
    createEmployeeAward: async function (employeeAward) {
      employeeAward.employeeId = this.employee.id;
      const { data } = await employeeAwardsRepository.Create(employeeAward);
      return data;
    },
    updateEmployeeAward: async function (employeeAward) {
      const { data } = await employeeAwardsRepository.Update(employeeAward);
      return data;
    },
    deleteEmployeeAward: async function (id) {
      const { data } = await employeeAwardsRepository.Delete(id);
      return data;
    },
    getEmployeeCertifications: async function () {
      const { data } = await employeeCertificationsRepository.Get("EMPLOYEEID", this.employee.id);
      data.totalCount = data.data.length;
      return data;
    },
    createEmployeeCertification: async function (employeeCertification) {
      employeeCertification.employeeId = this.employee.id;
      const { data } = await employeeCertificationsRepository.Create(employeeCertification);
      return data;
    },
    updateEmployeeCertification: async function (employeeCertification) {
      const { data } = await employeeCertificationsRepository.Update(employeeCertification);
      return data;
    },
    deleteEmployeeCertification: async function (id) {
      const { data } = await employeeCertificationsRepository.Delete(id);
      return data;
    },
    getEmployeeExperiences: async function () {
      const { data } = await employeeExperiencesRepository.Get("EMPLOYEEID", this.employee.id);
      data.totalCount = data.data.length;
      return data;
    },
    createEmployeeExperience: async function (employeeExperience) {
      employeeExperience.employeeId = this.employee.id;
      const { data } = await employeeExperiencesRepository.Create(employeeExperience);
      return data;
    },
    updateEmployeeExperience: async function (employeeExperience) {
      const { data } = await employeeExperiencesRepository.Update(employeeExperience);
      return data;
    },
    deleteEmployeeExperience: async function (id) {
      const { data } = await employeeExperiencesRepository.Delete(id);
      return data;
    },
    getEmployeeSkillAbilities: async function () {
      const { data } = await employeeSkillAbilitiesRepository.Get("EMPLOYEEID", this.employee.id);
      data.totalCount = data.data.length;
      return data;
    },
    createEmployeeSkillAbility: async function (employeeSkillAbility) {
      employeeSkillAbility.employeeId = this.employee.id;
      const { data } = await employeeSkillAbilitiesRepository.Create(employeeSkillAbility);
      return data;
    },
    updateEmployeeSkillAbility: async function (employeeSkillAbility) {
      const { data } = await employeeSkillAbilitiesRepository.Update(employeeSkillAbility);
      return data;
    },
    deleteEmployeeSkillAbility: async function (id) {
      const { data } = await employeeSkillAbilitiesRepository.Delete(id);
      return data;
    },
    getEmployeeStudies: async function () {
      const { data } = await employeesStudiesRepository.Get("EMPLOYEEID", this.employee.id);
      data.totalCount = data.data.length;
      return data;
    },
    createEmployeeStudy: async function (employeeStudy) {
      employeeStudy.employeeId = this.employee.id;
      const { data } = await employeesStudiesRepository.Create(employeeStudy);
      return data;
    },
    updateEmployeeStudy: async function (employeeStudy) {
      const { data } = await employeesStudiesRepository.Update(employeeStudy);
      return data;
    },
    deleteEmployeeStudy: async function (id) {
      const { data } = await employeesStudiesRepository.Delete(id);
      return data;
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
    getCurrencies: async function () {
      const { data } = await catalogsRepository.Get("NAME", "CURRENCY");
      this.currency = data.data;
    },
    getCostCenters: async function () {
      const { data } = await catalogsRepository.Get("NAME", "COSTCENTER");
      this.costcenter = data.data;
    },
    getEmployeeTypes: async function () {
      const { data } = await catalogsRepository.Get("NAME", "EMPLOYEETYPE");
      this.employeeType = data.data;
    },
    getSubsidiaries: async function () {
      const { data } = await subsidiariesRepository.GetWithPagination({});
      this.subsidiary = data;
    },
    getParentEmployees: async function () {
      const { data } = await employeesRepository.Get("PARENTID", "NULL");
      this.jefe = data.data;
    },
    onAwardExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Premios");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Premios.xlsx");
        });
      });
      e.cancel = true;
    },
    onCertificationExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Certificaciones");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Certificaciones.xlsx");
        });
      });
      e.cancel = true;
    },
    onExperienceExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Experiencias");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Experiencias.xlsx");
        });
      });
      e.cancel = true;
    },
    onSkillExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Habilidades");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Habilidades.xlsx");
        });
      });
      e.cancel = true;
    },
    onStudyExporting(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Estudios");

      exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer) => {
          saveAs(new Blob([buffer], { type: "application/octet-stream" }), "Estudios.xlsx");
        });
      });
      e.cancel = true;
    },
  },
  async created() {
    var employeeId = this.$route.params.id;
    await this.getEmployeeById(employeeId);
    await this.getAreas();
    await this.getDepartments();
    await this.getPositions();
    await this.getCurrencies();
    await this.getCostCenters();
    await this.getEmployeeTypes();
    await this.getSubsidiaries();
    await this.getParentEmployees();
  },
};
</script>

<style>
#formEmployee {
  width: 100%;
}

#dataGridAward,
#dataGridCertificaction,
#dataGridExperience,
#dataGridSkill,
#dataGridStudy {
  height: 450px;
  width: 100%;
  padding-left: 10px;
}

/* Large screens ----------- */
@media only screen and (min-width: 1824px) {
  #dataGridAward,
  #dataGridCertificaction,
  #dataGridExperience,
  #dataGridSkill,
  #dataGridStudy {
    height: 760px;
  }
}
</style>
