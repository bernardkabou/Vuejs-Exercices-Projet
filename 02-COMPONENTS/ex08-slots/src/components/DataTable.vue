<template>
  <table class="data-table">
    <thead>
      <tr>
        <th v-for="col in columns" :key="col">
          <slot :name="`header-${col}`" :column="col">
            {{ col }}
          </slot>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, i) in data" :key="i">
        <td v-for="col in columns" :key="col">
          <slot :name="`cell-${col}`" :row="row" :value="row[col]">
            {{ row[col] }}
          </slot>
        </td>
      </tr>
    </tbody>

    <tfoot v-if="$slots.footer">
      <slot name="footer"></slot>
    </tfoot>
  </table>
</template>

<script setup>
defineProps({
  data: Array,
  columns: Array
})
</script>

<style scoped>
.data-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
}

.data-table th {
  background: #f1f5f9;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid #e2e8f0;
}

.data-table td {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.data-table tr:hover td {
  background: #f8fafc;
}
</style>