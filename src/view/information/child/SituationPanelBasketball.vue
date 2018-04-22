<template>
  <div class="situation-panel situation-panel-basketball">
    <basket-panel-container title="比分详情">
      <template v-if="scores.guest_score">
        <table>
          <tbody>
          <tr>
            <th width="33%"></th><th width="13%">1节</th><th width="13%">2节</th>
            <th width="13%">3节</th><th width="13%">4节</th><th width="15%">总分</th>
          </tr>
          <tr>
            <td width="33%" class="has-icon text-left">
              <img class="" :src="detail.guest_logo" alt="">
              {{detail.guest}}
            </td>
            <td width="13%">{{scores.guest_score[0] && scores.guest_score[0].score || '-'}}</td>
            <td width="13%">{{scores.guest_score[1] && scores.guest_score[1].score || '-'}}</td>
            <td width="13%">{{scores.guest_score[2] && scores.guest_score[2].score || '-'}}</td>
            <td width="13%">{{scores.guest_score[3] && scores.guest_score[3].score || '-'}}</td>
            <td width="15%" class="text-primary">{{totalScores(scores.guest_score)}}</td>
          </tr>
          <tr>
            <td width="33%" class="has-icon text-left">
              <img class="" :src="detail.home_logo" alt="">
              {{detail.home}}
            </td>
            <td width="13%">{{scores.home_score[0] && scores.home_score[0].score || '-'}}</td>
            <td width="13%">{{scores.home_score[1] && scores.home_score[1].score || '-'}}</td>
            <td width="13%">{{scores.home_score[2] && scores.home_score[2].score || '-'}}</td>
            <td width="13%">{{scores.home_score[3] && scores.home_score[3].score || '-'}}</td>
            <td width="15%" class="text-primary">{{totalScores(scores.home_score)}}</td>
          </tr>
          </tbody>
        </table>
      </template>
    </basket-panel-container>
    <basket-panel-container title="技术统计">
      <template v-if="techs.list">
        <div class="margin-top row padding-10 bg-white text-center">
          <div class="col text-left has-icon">
            <img :src="detail.guest_logo" alt="">
            <span>{{detail.guest}}</span>
          </div>
          <div class="col text-light">
            <span>VS</span>
          </div>
          <div class="col text-right has-icon">
            <span>{{detail.home}}</span>
            <img :src="detail.home_logo" alt="">
          </div>
        </div>
        <table><tbody>
          <tr v-for="item in techs.list">
            <td width="13%">{{item.guest_count}}</td>
            <td width="27%">
              <total-percentage direction="left" :percent="item.guest_rate"></total-percentage>
            </td>
            <td width="20%">{{item.name}}</td>
            <td width="27%">
              <total-percentage direction="right" :percent="item.home_rate"></total-percentage>
            </td>
            <td width="13%">{{item.home_count}}</td>
          </tr>
        </tbody></table>
      </template>
    </basket-panel-container>
    <basket-panel-container title="球员数据">
      <div class="relative"><span class="current-player">当前在场球员</span></div>
      <template v-if="players.list">
        <div class="margin-top row bg-white text-center">
          <div class="col has-icon" :class="{'active': active === 'guest'}" @click="tabItemClick('guest', detail.guest_id)">
            <span><img :src="detail.guest_logo" alt="">{{detail.guest}}</span>
          </div>
          <div class="col has-icon" :class="{'active': active === 'home'}" @click="tabItemClick('home', detail.home_id)">
            <span><img :src="detail.home_logo" alt=""> {{detail.home}}</span>
          </div>
        </div>
        <table>
          <tbody>
          <tr class="bg-f6">
            <th width="20%">首发球员</th><th>时间</th><th>得分</th><th>篮板</th><th>助攻</th><th>投篮</th><th>3分</th><th>罚球</th>
          </tr>
          <tr v-for="item in first(players.list)">
            <td>{{item.player_name}}</td>
            <td>{{item.play_time}}</td>
            <td>{{item.score}}</td>
            <td>{{item.rebound}}</td>
            <td>{{item.assist}}</td>
            <td>{{item.shoot}}</td>
            <td>{{item.three_point}}</td>
            <td>{{item.free_throws}}</td>
          </tr>
          <tr class="bg-f6">
            <th width="20%">替补球员</th><th>时间</th><th>得分</th><th>篮板</th><th>助攻</th><th>投篮</th><th>3分</th><th>罚球</th>
          </tr>
          <tr v-for="item in other(players.list)">
            <td>{{item.player_name}}</td>
            <td>{{item.play_time}}</td>
            <td>{{item.score}}</td>
            <td>{{item.rebound}}</td>
            <td>{{item.assist}}</td>
            <td>{{item.shoot}}</td>
            <td>{{item.three_point}}</td>
            <td>{{item.free_throws}}</td>
          </tr>
          </tbody>
        </table>
      </template>
    </basket-panel-container>
  </div>
</template>

<script>
  import BasketPanelContainer from './BasketPanelContainer.vue';
  import {INFORMATION_PLAYER_DATA} from '../../../store/information/types';
  import {mapState} from 'vuex';
  import TotalPercentage from './TotalPercentage'

  export default {
    name: 'situationPanelBasketball',
    data () {
      return {
        active: 'guest'
      }
    },
    computed: {
      ...mapState({
        scores: state => state.information.scoresDetail,
        detail: state => state.information.detail,
        techs: state => state.information.techDetail,
        players: state => state.information.players
      })
    },
    methods: {
      tabItemClick (key, id) {
        if (this.active !== key) {
          this.active = key;
          this.$store.dispatch(INFORMATION_PLAYER_DATA, {id: id});
        }
      },
      totalScores (obj) {
        let total = 0;
        obj.map(v => {
          let score = parseInt(v.score);
          if (score) {
            total += score;
          }
        });
        return total;
      },
      first (list) {
        return list.filter(v => v.lineup === 1);
      },
      other (list) {
        return list.filter(v => v.lineup === 0);
      }
    },
    components: {TotalPercentage, BasketPanelContainer}
  }
</script>

<style>
  .football-information .has-icon {
    padding: 0 5px;
  }
  .football-information .has-icon img {
    width: 18px; height: 18px;
    vertical-align: middle;
    margin-top: -3px;
  }
  .football-information .current-player {
    position: absolute; top: -25px; right: 40px;
    font-size: 12px; color: #999;
  }
</style>
