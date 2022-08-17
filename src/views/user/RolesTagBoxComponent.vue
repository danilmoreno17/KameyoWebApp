<template>
  <DxTagBox
    :data-source="dataSource"
    v-model:value="currentValue"
    :show-selection-controls="true"
    :max-displayed-tags="5"
    :show-multi-tag-only="false"
    :on-value-changed="(e) => onValueChanged(e.value)"
    :on-selection-changed="onSelectionChanged"
    :search-enabled="true"
    value-expr="id"
    display-expr="name"
    apply-value-mode="useButtons"
  />
</template>
<script>
import DxTagBox from "devextreme-vue/tag-box";

export default {
  components: { DxTagBox },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    onValueChanged: {
      type: Function,
      default: () => {
        return;
      },
    },
    dataSource: {
      type: Object,
      default: () => {
        return;
      },
    },
    dataGridComponent: {
      type: Object,
      default: () => {
        return;
      },
    },
  },
  data() {
    return {
      //currentValue: this.value
      currentValue: Array.from(this.value, (x) => x.roleId),
    };
  },
  created() {
    console.log("roletagboxcomponent - created -> ", this.value);
  },
  methods: {
    created() {
      //console.log("created -> ", this.value);
    },
    onSelectionChanged() {
      this.dataGridComponent.updateDimensions();
    },
  },
};
</script>
