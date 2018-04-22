<template>
  <div class="home-recommend-lottery" @click="goCurrentLottery">
    <div class="type-img"></div>
    <div class="lottery-balls">
      <span class="bg-red-ball" v-for="ball in redBalls">{{ball}}</span>
      <span class="bg-blue-ball" v-for="ball in blueBalls">{{ball}}</span>
    </div>
    <div class="description">
      <span>{{issue.lottery_name}}</span>
      <span class="text-xn text-light">{{issue.slogon}}</span>
      <span class="refresh" @click.stop="refresh"></span>
    </div>
  </div>
</template>

<script>
  import {recommendIssue} from '../common/store';
  export default {
    name: 'homeRecommendLottery',
    props: {
      issue: {type: Object, required: true}
    },
    computed: {
      redBalls () {
        return this.issue.betNum && this.issue.betNum[0];
      },
      blueBalls () {
        return this.issue.betNum && this.issue.betNum[1];
      }
    },
    methods: {
      refresh () {
        this.$emit('refresh');
      },
      goCurrentLottery () {
        this.$router.push({
          name: this.issue.component,
          params: {id: this.issue.lottery_id}
        });
        recommendIssue.set(this.issue.getIssue());
      }
    }
  }
</script>

<style>
  .home-recommend-lottery {
    min-height: 80px;
    padding: 10px 10px 10px 90px;
    position: relative;
    background: white;
    border-radius: 5px;
  }
  .home-recommend-lottery .type-img {
    background: url("../assets/home/lucky_digital.png") no-repeat;
    background-size: 100% 100%;
    width: 70px; height: 60px;
    position: absolute;
    left: 10px; top: 10px;
  }
  .home-recommend-lottery .lottery-balls {
    padding: 5px 0 0 10px;
  }
  .home-recommend-lottery .bg-blue-ball,
  .home-recommend-lottery .bg-red-ball {
    width: 22px; height: 22px;
    line-height: 22px;
    margin-right: 3px;
  }
  .home-recommend-lottery .description {
    position: relative;
    padding: 10px 0 0 10px;
  }
  .home-recommend-lottery .refresh {
    background: url("../assets/home/refresh.png") no-repeat;
    background-size: 100% 100%;
    width: 20px; height: 16px;
    position: absolute;
    right: 10px; top: 15px;
  }
</style>
