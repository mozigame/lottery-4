<template>
  <div class="bottom-nav">
    <div class="row">
      <div class="col bottom-nav-item"
        :class="{'active': item.key === active}"
        v-for="item in items"
        @click="goRedirect(item)">
        <span class="nav-icon" :class="item.icon"></span>
        <p>{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../router/index';
  export default {
    name: 'bottomNav',
    props: ['active'],
    data () {
      return {
        items: [
          {name: '首页', icon: 'home-icon', key: 'Home'},
          {name: '开奖', icon: 'prize-icon', key: 'PrizeList'},
          {name: '比分', icon: 'score-icon', key: 'Score'},
          {name: '订单', icon: 'order-icon', key: 'Orders'},
          {name: '我的', icon: 'person-icon', key: 'Mine'}
        ]
      }
    },
    methods: {
      goRedirect (item) {
        if (item.key !== this.active) {
          router.replace({name: item.key});
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-nav {
    position: fixed;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    border-top: 1px solid #ddd;
    color: #666;
    font-size: 12px;
    text-align: center;
    /*background: linear-gradient(top, white, #efeff0);*/
    background: white;
    padding-top: 7px;
    line-height: 15px;
    z-index: 100;
  }
  @media screen and (min-width:640px) {
    .bottom-nav {
      width: 640px;
      left: 50%;
      margin-left: -320px;
    }
  }
  .bottom-nav .nav-icon {
    width: 22px;
    height: 22px;
    display: inline-block;
  }
  .bottom-nav .bottom-nav-item.active {
    color: #e73f40;
  }
  .bottom-nav .nav-icon.home-icon {
    background: url("../assets/home/home.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .bottom-nav-item.active .home-icon {
    background: url("../assets/home/home_active.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .nav-icon.order-icon {
    background: url("../assets/home/order.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .bottom-nav-item.active .order-icon {
    background: url("../assets/home/order_active.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .nav-icon.person-icon {
    background: url("../assets/home/person.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .bottom-nav-item.active .person-icon {
    background: url("../assets/home/person_active.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .nav-icon.prize-icon {
    background: url("../assets/home/prize.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .bottom-nav-item.active .prize-icon {
    background: url("../assets/home/prize_active.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .nav-icon.score-icon {
    background: url("../assets/home/score.png") no-repeat;
    background-size: 100% 100%;
  }
  .bottom-nav .bottom-nav-item.active .score-icon {
    background: url("../assets/home/score_active.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
