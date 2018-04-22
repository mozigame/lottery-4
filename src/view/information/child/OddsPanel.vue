<template>
  <div class="odds-panel">
    <basket-panel-container title="欧赔">
      <template v-if="odds[1]">
        <plate-panel :data="odds[1]" type="1"></plate-panel>
      </template>
    </basket-panel-container>
    <basket-panel-container title="总分">
      <template v-if="odds[2]">
        <plate-panel :data="odds[2]" type="2"></plate-panel>
      </template>
    </basket-panel-container>
    <basket-panel-container title="让分">
      <template v-if="odds[0]">
        <plate-panel :data="odds[0]" type="0"></plate-panel>
      </template>
    </basket-panel-container>
  </div>
</template>

<script>
  import BasketPanelContainer from './BasketPanelContainer.vue';
  import PlatePanel from './PlatePanel.vue';
  import {mapState} from 'vuex';
  const tabs = [
    {key: '1', value: '欧赔', isHide: false},
    {key: '2', value: '总分', isHide: false},
    {key: '3', value: '让分', isHide: false}
  ];
  const list = [
    {key: '11', value: '澳门', isActive: false},
    {key: '22', value: '韦德', isActive: false},
    {key: '33', value: '易胜博', isActive: false},
    {key: '44', value: 'Bet365', isActive: false}
  ];
  export default {
    name: 'oddsPanel',
    data () {
      return {
        tabsItem: tabs,
        listItem: list,
        activeTabItem: '',
        active: ''
      }
    },
    computed: {
      ...mapState({
        odds: state => state.information.odds
      })
    },
    methods: {
      listItemClick (item) {
        for (var i = 0; i < list.length; i++) {
          if (list[i] === item) {
            if (item.isActive) {
              item.isActive = false;
            } else {
              item.isActive = true;
            }
          } else {
            list[i].isActive = false;
          }
        }
      },
      tabsItemClick (tabitem) {
        if (tabitem.isHide) {
          tabitem.isHide = false;
        } else {
          tabitem.isHide = true;
        }
      }
    },
    components: {BasketPanelContainer, PlatePanel}
  }
</script>

<style>

  .odds-panel .all-icon-tip {
    padding: 5px 0 5px 5px;
  }
  .odds-panel .all-icon-tip span {
    display: inline-block;
    font-size: 12px;
    vertical-align: middle;
  }
  .odds-panel .block {
    background-color: transparent;
  }
  .odds-panel .item {
    margin: 0;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    color: #999;
  }
  .odds-panel .item .item-center {
    background: #4FAF50;
    width: 50px;
  }
  .odds-panel .item .item-left,
  .odds-panel .item .item-right {
    padding: 5px;
  }
  .odds-panel table {
    font-size: 12px;
    text-align: center;
    width: 100%;
    border-collapse:collapse;
  }
  .odds-panel table tr.bg-f6 th{
    background-color: #f6f6f6;
  }
  .odds-panel table th{
    color: #999999;
    font-weight: normal;
    border-bottom: 1px solid #f6f6f6;
    padding: 8px 0;
  }
  .odds-panel table td {
    padding: 5px 0;
  }

  .panel-title span{
    float: right;
    color: #999999;
    font-size: 12px;
    padding: 0 10px;
    width: auto;
  }
  .panel-title span:before{
    display: inline-block;
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50px;
    background-color: #e73f40;
    left: 2px;
    top: 10px;
    position: absolute;
  }

  .odds-panel .col span{
    display: inline-block;
    padding: 5px 0;
  }
  .odds-panel .active{
    color: #333333;
  }
  .odds-panel .active span{
    border-bottom: 2px solid #3f6ee7;
  }
  .football-information .padding-10{
    padding: 10px 0;
  }
  .bg-darkBlue{
    background-color: #3f86e7;
    color: #fff;
    border-radius: 50px;
    padding: 0 5px;
  }

  .border-bottom-solid{
    border-bottom: 1px solid #dddddd;
  }
  .border-bottom-dashed{
    border-bottom: 1px dashed #dddddd;
  }

  .icon-odds-down{
    background-image: url("../../../assets/information/odds_down.png");
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center center;
    width: 50%;
    padding: 25% 0;
    display: inline-block;
  }
  .icon-odds-up{
    transform: rotate(180deg);
  }
  .hide{
    display: none;
  }
  .show{
    display: table;
  }

  .test{
    background-color: #3F6EE7;
    border-radius: 50px;
    height: 15px;
    width: 14px;
    line-height: 13px;
    float: right;
    text-align: center;
    margin-right: 20px;
  }



</style>
