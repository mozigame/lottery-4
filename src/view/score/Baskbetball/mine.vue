<template>
  <div>
    <template v-if="propsData.match_status===1">
      <notStarted
        @go="goBasketball"
        :groupsIndex="index"
        :propsData="propsData"
      />
    </template>
    <template v-else-if="propsData.match_status===2">
      <underway
        @go="goBasketball"
        :groupsIndex="index"
        :propsData="propsData"
      />
    </template>
    <template v-else>
      <finished
        @go="goBasketball"
        :groupsIndex="index"
        :propsData="propsData"
      />
    </template>
  </div>
</template>

<script>
  import underway from './underway.vue'
  import finished from './finished.vue'
  import notStarted from './notStarted.vue'

  export default {
    name: 'mine',
    props: {
      propsData: {type: Object},
      index: {type: Array}
    },
    methods: {
      goBasketball (id) {
        this.$router.push({name: 'BasketballInformation', params: {id}})
      }
    },
    components: {
      finished,
      underway,
      notStarted
    }
  }
</script>

<style scoped>

</style>
