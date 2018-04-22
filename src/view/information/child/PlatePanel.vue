<template>
  <div class="plate-panel">
    <plate-table
      v-for="(item, index) in data"
      :item="item"
      :key="index"
      :index="index"
      :type="type">
    </plate-table>
  </div>
</template>

<script>
  import PlateTable from './PlateTable.vue';
  export default {
    name: 'platePanel',
    props: ['data', 'type'],
    components: { PlateTable }
  }
</script>

<style>

</style>
