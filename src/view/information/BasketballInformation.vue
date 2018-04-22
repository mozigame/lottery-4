<template>
  <div class="football-information">
    <information-header type="basketball" :active="activeTabItem" :tabItem="tabItem" @tabClick="tabClickChange"></information-header>
    <div class="tab-container">
      <div class="tab-container-wrap">
        <div class="tab-container-item" :class="{'show': tabItem[0].key === activeTabItem.key}">
          <template v-if="information.detail.match_status > 1">
            <situation-panel-basketball></situation-panel-basketball>
          </template>
          <template v-else>
            <div class="block">
              <img class="no-situation" src="../../assets/information/no_situation.png" alt="暂无比赛数据">
              <p class="text-center text-light">暂无比赛数据</p>
            </div>
          </template>
        </div>
        <div class="tab-container-item" :class="{'show': tabItem[1].key === activeTabItem.key}">
          <analysis-panel></analysis-panel>
        </div>
        <div class="tab-container-item" :class="{'show': tabItem[2].key === activeTabItem.key}">
          <odds-panel></odds-panel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InformationHeader from './child/Header.vue';
  import { TabContainer, TabContainerItem } from 'mint-ui';
  import SituationPanelBasketball from './child/SituationPanelBasketball.vue';
  import AnalysisPanel from './child/AnalysisPanel.vue';
  import OddsPanel from './child/OddsPanel.vue';
  import {INFORMATION_SET_THIRD_ID, INFORMATION_SCHEDULE_DETAIL, INFORMATION_RECORD_LATEST_GUEST,
    INFORMATION_RECORD_LATEST_HOME, INFORMATION_RECORD_HISTORY, INFORMATION_RECORD_FUTURE_HOME,
    INFORMATION_TEAM_DATA, INFORMATION_RECORD_FUTURE_GUEST, INFORMATION_LATEST_ODDS,
    INFORMATION_SCORE_DETAIL, INFORMATION_TECHNOLOGY_TOTAL, INFORMATION_PLAYER_DATA} from '../../store/information/types';
  import {mapState} from 'vuex';
  const tabs = [
    {key: 'situation', value: '赛况'},
    {key: 'analysis', value: '分析'},
    {key: 'odds', value: '赔率'}
  ];
  export default {
    name: 'basketballInformation',
    data () {
      return {
        tabItem: tabs,
        activeTabItem: tabs[0]
      }
    },
    computed: {
      ...mapState({
        information: state => state.information
      })
    },
    methods: {
      tabClickChange (item) {
        this.activeTabItem = item;
      }
    },
    created () {
      let id = this.$router.currentRoute.params.id;
      if (id) {
        this.$store.commit(INFORMATION_SET_THIRD_ID, {lottery: 7, id: id});
        this.$store.dispatch(INFORMATION_SCHEDULE_DETAIL).then(() => {
          if (this.information.detail.match_status === 1) {
            this.activeTabItem = tabs[1];
          }
          this.$store.dispatch(INFORMATION_SCORE_DETAIL);
          this.$store.dispatch(INFORMATION_TECHNOLOGY_TOTAL);
          this.$store.dispatch(INFORMATION_PLAYER_DATA, {id: this.information.detail.guest_id});
          this.$store.dispatch(INFORMATION_TEAM_DATA, {index: 0, id: this.information.detail.guest_id, name: this.information.detail.guest, src: this.information.detail.guest_logo})
            .then(() => {
              this.$store.dispatch(INFORMATION_TEAM_DATA, {index: 1, id: this.information.detail.home_id, name: this.information.detail.home, src: this.information.detail.home_logo});
            });
          this.$store.dispatch(INFORMATION_RECORD_HISTORY);
          this.$store.dispatch(INFORMATION_RECORD_LATEST_HOME).then(() => {
            this.$store.dispatch(INFORMATION_RECORD_LATEST_GUEST);
          });
          this.$store.dispatch(INFORMATION_RECORD_FUTURE_HOME).then(() => {
            this.$store.dispatch(INFORMATION_RECORD_FUTURE_GUEST);
          });
          this.$store.dispatch(INFORMATION_LATEST_ODDS, 0).then(() => {
            this.$store.dispatch(INFORMATION_LATEST_ODDS, 1).then(() => {
              this.$store.dispatch(INFORMATION_LATEST_ODDS, 2)
            })
          });
        });
      } else {
        this.$router.back();
      }
    },
    components: { InformationHeader, TabContainer, TabContainerItem, SituationPanelBasketball, AnalysisPanel, OddsPanel }
  }
</script>

<style>
  .football-information .tab-container {
    overflow: hidden;
    position: relative;
  }
  .football-information .tab-container-wrap {
    display: flex;
  }
  .football-information .tab-container-item {
    display: none;
  }
  .football-information .tab-container-item.show {
    display: block;
  }
  .football-information .blue {
    color: #3f6ee7;
  }
  .football-information .green {
    color: #4faf50;
  }
  .football-information .red {
    color: #e73f40;
  }
</style>
