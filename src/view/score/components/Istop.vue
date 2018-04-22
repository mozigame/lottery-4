<template>
  <div>
    <template v-if="toTop">
      <div @click="toTheTop({del:false,index:index})" class="stick del-stick">
        <!--置顶按钮-->
      </div>
      <div class="pushpin-icon pushpin">
        <!--图钉按钮-->
      </div>
    </template>
    <template v-else>
      <div @click="toTheTop({del:true,index:index})" class="stick activate-stick">
        <!--置顶按钮-->
      </div>
    </template>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { TO_THE_TOP } from '../../../store/score/types';

  export default {
    name: 'IsTop',
    props: {
      toTop: {type: null},
      index: {type: Array}
    },
    methods: {
      ...mapMutations({
        toTheTop: TO_THE_TOP
      })
    }
  }
</script>

<style scoped>
  .stick {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    border-top-right-radius: 5px;
    width: 0.89rem;
    height: 0.89rem;
  }

  .pushpin {
    display: inline-block;
    position: absolute;
    bottom: 0.15rem;
    right: 0.15rem;
    width: 0.34375rem;
    height: 0.34375rem;
  }
</style>
