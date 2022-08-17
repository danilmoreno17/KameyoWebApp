<template>
  <div>
    <router-link class="current-value" :to="routePath">{{
      getCellValue(cellData)
    }}</router-link>
  </div>
</template>
<script>


import "devextreme/dist/css/dx.material.blue.light.css";

// import "devextreme/dist/css/dx.common.css";
// import "devextreme/dist/css/dx.light.css";


const gridCellData = function (value) {
  let result = value.data[value.column.dataField];

  if (value.column.dataField.includes(".")) {
    const fields = value.column.dataField.split(".");

    if (fields.length == 2) result = value.data[fields[0]][fields[1]];

    if (fields.length == 3)
      result = value.data[fields[0]][fields[1]][fields[2]];

    if (fields.length == 4)
      result = value.data[fields[0]][fields[1]][fields[2]][fields[3]];
  }

  return result;
};

export default {
  name: "cell-link-template",
  components: {},
  props: {
    cellData: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
    routePath: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  methods: {
    getCellValue(value) {
      console.log("getCellValue - ", value);
      return gridCellData(value);
    },
  },
};
</script>

<style scoped>
.dx-datagrid-rowsview
  .dx-row-focused.dx-data-row:not(.dx-edit-row)
  > td:not(.dx-focused)
  div
  a {
  color: white;
}
</style>
