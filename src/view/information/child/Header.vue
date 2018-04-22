<template>
  <div class="information-header" :class="type">
    <div class="container">
      <div class="head">
        <span class="back-icon white" @click="goBack"></span>
        <div>{{detail.league}}</div>
      </div>
      <div class="row text-center">
        <template v-if="type === 'football'">
          <div class="col">
            <div class="team-nation">{{detail.home_rank}}</div>
            <div class="team-icon">
              <img width="40" height="40" :src="detail.home_logo" alt="">
            </div>
            <div class="team-name">{{detail.home}}</div>
          </div>
        </template>
        <template v-else>
          <div class="col">
            <div class="team-nation">{{detail.guest_rank}}</div>
            <div class="team-icon">
              <img width="40" height="40" :src="detail.guest_logo" alt="">
            </div>
            <div class="team-name">{{detail.guest}}</div>
          </div>
        </template>
        <div class="col col-center">
          <template v-if="detail.match_status === 3">
            <div class="text-ml">{{detail.current_score}}</div>
            <div class="text-sm">{{detail.match_status_description}}</div>
          </template>
          <template v-else-if="detail.match_status === 2">
            <div class="text-ml">{{detail.current_score}}</div>
            <div class="text-sm">{{detail.match_duration}}'</div>
          </template>
          <template v-else>
            <div class="text-ml">VS</div>
            <div class="text-sm">{{detail.first_half_begin_time | dateFormat('yyyy.MM.dd')}}</div>
            <div class="text-sm">{{detail.first_half_begin_time | dateFormat('hh:mm')}}</div>
          </template>
        </div>
        <template v-if="type === 'football'">
          <div class="col">
            <div class="team-nation">{{detail.guest_rank}}</div>
            <div class="team-icon">
              <img width="40" height="40" :src="detail.guest_logo" alt="">
            </div>
            <div class="team-name">{{detail.guest}}</div>
          </div>
        </template>
        <template v-else>
          <div class="col">
            <div class="team-nation">{{detail.home_rank}}</div>
            <div class="team-icon">
              <img width="40" height="40" :src="detail.home_logo" alt="">
            </div>
            <div class="team-name">{{detail.home}}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="margin-top row tab text-center">
      <div class="overlay"></div>
      <div class="col" :class="{'active': active === item}" v-for="item in tabItem" @click="tabItemClick(item)">
        {{item.value}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'informationHeader',
    props: ['type', 'tabItem', 'active'],
    computed: {
      detail () {
        return this.$store.state.information.detail;
      }
    },
    methods: {
      tabItemClick (item) {
        if (this.active !== item) {
          this.$emit('tabClick', item)
        }
      },
      goBack () {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .information-header .team-icon img{
    border-radius: 40px;
  }
  .information-header .head {
    background: transparent;
    color: white;
    font-weight: 100;
  }
  .information-header .head .back-icon.white {
    background: url("../../../assets/icon/white_back_icon.png") no-repeat center;
    background-size: 40% 40%;
  }
  .information-header {
    color: white;
    font-weight: 100;
    position: relative;
  }
  .information-header .team-nation {
    background: black;
    color: white;
    opacity: 0.5;
    font-size: 12px;
    display: inline-block;
    padding: 1px 5px;
  }
  .information-header .team-icon {
    margin: 5px 0;
  }
  .information-header .team-name {
    font-size: 12px;
  }
  .information-header.football .container {
    height: 145px;
    background: url("../../../assets/football_information.png") no-repeat;
    background-size: 100% 100%;
  }
  .information-header.basketball .container {
    height: 145px;
    background: url("../../../assets/basketball_information.png") no-repeat;
    background-size: 100% 100%;
  }
  .information-header .tab {
    height: 35px;
    font-size: 12px;
    line-height: 35px;
    position: relative;
    padding-bottom: 1px;
    color: #888888;
  }
  .information-header.football .tab {
    background: url("../../../assets/football_tab.png") no-repeat;
    background-size: 100% 100%;
  }
  .information-header.basketball .tab {
    background: url("../../../assets/basketball_tab.png") no-repeat;
    background-size: 100% 100%;
  }
  .information-header .tab .col.active {
    border-bottom: 2px solid white;
    color: white;
  }
</style>
