<template>
  <div class="football-information">
    <information-header type="football" :active="activeTabItem" :tabItem="tabItem" @tabClick="tabClickChange"></information-header>
    <div class="tab-container">
      <div class="tab-container-wrap">
        <div class="tab-container-item" :class="{'show': tabItem[0].key === activeTabItem.key}">
          <template v-if="information.detail.match_status > 1">
            <situation-panel></situation-panel>
          </template>
          <template v-else>
            <div class="block">
              <img class="no-situation" src="../../assets/information/no_situation.png" alt="暂无比赛数据">
              <p class="text-center text-light">暂无比赛数据</p>
            </div>
          </template>
        </div>
        <div class="tab-container-item" :class="{'show': tabItem[1].key === activeTabItem.key}">
          <record-table title="历史交锋" :data="historyRecord"></record-table>
          <record-table title="近期战绩" :data="information.latestRecord" class="margin-top-10"></record-table>
          <record-table title="未来赛事" :data="information.futureRecord" :isFuture="true" class="margin-top-10"></record-table>
        </div>
        <div class="tab-container-item" :class="{'show': tabItem[2].key === activeTabItem.key}">
          <integral-panel></integral-panel>
        </div>
        <div class="tab-container-item" :class="{'show': tabItem[3].key === activeTabItem.key}">
          <plate-panel :data="information.odds[0]" :type="0"></plate-panel>
        </div>
        <div class="tab-container-item" :class="{'show': tabItem[4].key === activeTabItem.key}">
          <plate-panel :data="information.odds[1]" :type="1"></plate-panel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InformationHeader from './child/Header.vue';
  import { TabContainer, TabContainerItem } from 'mint-ui';
  import RecordTable from './child/RecordTable.vue';
  import PlatePanel from './child/PlatePanel.vue';
  import IntegralPanel from './child/IntegralPanel.vue';
  import SituationPanel from './child/SituationPanel.vue';
  import {INFORMATION_SET_THIRD_ID, INFORMATION_SCHEDULE_DETAIL, INFORMATION_RECORD_LATEST_HOME,
    INFORMATION_RECORD_LATEST_GUEST, INFORMATION_RECORD_FUTURE_HOME, INFORMATION_RECORD_FUTURE_GUEST,
    INFORMATION_RECORD_HISTORY, INFORMATION_LATEST_ODDS, INFORMATION_GAME_POINT,
    INFORMATION_SCHEDULE_EVENT, INFORMATION_TECHNOLOGY_TOTAL} from '../../store/information/types';
  import {mapState} from 'vuex';

  const tabs = [
    {key: 'situation', value: '赛况'},
    {key: 'record', value: '战绩'},
    {key: 'integral', value: '积分'},
    {key: 'asianPlate', value: '亚盘'},
    {key: 'europeanPlate', value: '欧盘'}
  ];
  export default {
    name: 'footballInformation',
    data () {
      return {
        tabItem: tabs,
        activeTabItem: tabs[0]
      }
    },
    computed: {
      ...mapState({
        information: state => state.information
      }),
      historyRecord () {
        return [this.information.historyRecord];
      }
    },
    methods: {
      tabClickChange (item) {
        this.activeTabItem = item;
      }
    },
    created () {
      let id = this.$router.currentRoute.params.id;
      if (id) {
        this.$store.commit(INFORMATION_SET_THIRD_ID, {lottery: 6, id: id});
        this.$store.dispatch(INFORMATION_SCHEDULE_DETAIL).then(() => {
          if (this.information.detail.match_status === 1) {
            this.activeTabItem = tabs[1];
          }
          this.$store.dispatch(INFORMATION_SCHEDULE_EVENT);
          this.$store.dispatch(INFORMATION_RECORD_HISTORY);
          this.$store.dispatch(INFORMATION_TECHNOLOGY_TOTAL);
          this.$store.dispatch(INFORMATION_RECORD_LATEST_HOME).then(() => {
            this.$store.dispatch(INFORMATION_RECORD_LATEST_GUEST);
          });
          this.$store.dispatch(INFORMATION_RECORD_FUTURE_HOME).then(() => {
            this.$store.dispatch(INFORMATION_RECORD_FUTURE_GUEST);
          });
          this.$store.dispatch(INFORMATION_LATEST_ODDS, 0).then(() => {
            this.$store.dispatch(INFORMATION_LATEST_ODDS, 1);
          });
          this.$store.dispatch(INFORMATION_GAME_POINT, 0).then(() => {
            this.$store.dispatch(INFORMATION_GAME_POINT, 1).then(() => {
              this.$store.dispatch(INFORMATION_GAME_POINT, 2);
            });
          })
        });
      } else {
        this.$router.back();
      }
    },
    components: { InformationHeader, TabContainer, TabContainerItem, RecordTable, PlatePanel, IntegralPanel, SituationPanel }
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
    display: none; width: 100%;
  }
  .football-information .tab-container-item.show {
    display: block;
  }
</style>
