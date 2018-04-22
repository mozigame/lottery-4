<template>
  <div class="pay-complete">
    <v-head title="支付成功" :hide-back="true"></v-head>
    <div class="text-center">
      <span class="green-complete-icon"></span>
      <p class="text-ml">支付成功</p>
    </div>
    <div class="padding margin-top-20">
      <router-link tag="a" :to="detail" class="btn">查看订单</router-link>
      <router-link tag="a" to="/mine" class="btn btn-out-line margin-top-10">返回个人中心</router-link>
    </div>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import { mapState } from 'vuex';

  export default {
    name: 'payComplete',
    computed: {
      ...mapState({
        orderId: state => state.payment.orderId
      }),
      detail () {
        return {
          name: 'OrderDetail', params: {id: this.orderId}
        }
      }
    },
    components: { VHead }
  }
</script>

<style>
  .pay-complete .green-complete-icon {
    display: inline-block;
    margin-top: 40px;
  }
</style>
