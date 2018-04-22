<template>
  <div class="basketball-hh-lottery">
    <div class="row text-center text-default text-sm" :class="{'team-name': !isConfirm}">
      <div class="col"><span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span>{{schedule.guest}}</div>
      <div class="col text-light">VS</div>
      <div class="col">{{schedule.home}}<span class="text-primary" v-if="schedule.home_rank">[{{schedule.home_rank}}]</span></div>
    </div>
    <template v-if="isConfirm">
      <div class="selected-box ellipsis" @click="onPanelShow">
        {{boxText}}
        <span class="arrow-right"></span>
      </div>
    </template>
    <template v-else>
      <div class="box-right" @click="onPanelShow" :class="{gray: selectedTotal>0}">
        {{rightTip}}
    </div>
      <div class="box">
        <div class="clear border-bottom">
          <template v-if="this.schedule.holderList[0].length > 0">
            <div class="box-item"
                 @click="onOptionSelected(item, 0)"
                 :class="{selected: isSelected(item, 0)}"
                 v-for="item in schedule.holderList[0]">
            <span class="box-item-content">
              <span class="text-light">{{item.text}}</span>
              <span class="block">{{item.value}}</span>
            </span>
            </div>
          </template>
          <template v-else>
            <div class="no-sale text-center">未开售</div>
          </template>
        </div>
        <div class="clear border-bottom">
          <template v-if="schedule.holderList[1].length > 0">
            <div class="box-item"
                 @click="onOptionSelected(item, 1)"
                 :class="{selected: isSelected(item, 1)}"
                 v-for="(item, key) in schedule.holderList[1]">
            <span class="box-item-content">
              <span class="text-light">
                {{item.text}}
                <span class="let-point"
                      v-if="key === 1"
                      :class="schedule.letPointsColor">
                {{schedule.letPointsText}}
                </span>
              </span>
              <span class="block">{{item.value}}</span>
            </span>
            </div>
          </template>
          <template v-else>
            <div class="no-sale text-center">未开售</div>
          </template>
        </div>
        <div class="clear">
          <template v-if="this.schedule.holderList[3].length > 0">
            <div class="box-item"
                 @click="onOptionSelected(item, 3)"
                 :class="{selected: isSelected(item, 3)}"
                 v-for="item in schedule.holderList[3]">
            <span class="box-item-content">
              <span class="text-light">{{item.text}}</span>
              <span class="block">{{item.value}}</span>
            </span>
            </div>
          </template>
          <template v-else>
            <div class="no-sale text-center">未开售</div>
          </template>
        </div>
      </div>
    </template>
    <v-dialog
      :title="schedule.guest + ' (客) VS  ' + schedule.home + '(主)' "
      @close="onPanelHide()"
      v-show="bettingPanelVisible">
      <div class="table-wrap">
        <table class="text-center text-sm" cellpadding="0" cellspacing="1">
          <thead><tr><td colspan="2" class="blue">胜负</td></tr></thead>
          <tbody>
          <tr>
            <template v-if="schedule.holderList[0].length > 0">
              <td v-for="item in schedule.holderList[0]"
                @click="onDialogOptionSelected(item, 0)"
                :class="{selected: isDialogSelected(item, 0)}">
                <span class="text-light">{{item.text}}</span>
                {{item.value}}
            </td>
            </template>
            <template v-else>
              <td>未开售</td>
            </template>
          </tr>
          </tbody>
        </table>
        <table class="text-center text-sm margin-top-10" cellpadding="0" cellspacing="1">
          <thead><tr><td colspan="2" class="orange">让分胜负({{schedule.letPointsText}})</td></tr></thead>
          <tbody>
          <tr>
            <template v-if="schedule.holderList[1].length > 0">
              <td v-for="item in schedule.holderList[1]"
                @click="onDialogOptionSelected(item, 1)"
                :class="{selected: isDialogSelected(item, 1)}">
                <span class="text-light">{{item.text}}</span>
                {{item.value}}
            </td>
            </template>
            <template v-else>
              <td>未开售</td>
            </template>
          </tr>
          </tbody>
        </table>
        <table class="text-center text-sm margin-top-10" cellpadding="0" cellspacing="1">
          <thead><tr><td colspan="2" class="green">大小分({{schedule.basePoint}})</td></tr></thead>
          <tbody>
          <tr>
            <template v-if="schedule.holderList[3].length > 0">
              <td v-for="item in schedule.holderList[3]"
                @click="onDialogOptionSelected(item, 3)"
                :class="{selected: isDialogSelected(item, 3)}">
                <span class="text-light">{{item.text}}</span>
                {{item.value}}
            </td>
            </template>
            <template v-else>
              <td>未开售</td>
            </template>
          </tr>
          </tbody>
        </table>
        <table class="text-center text-sm margin-top-10" cellpadding="0" cellspacing="1">
          <thead><tr><td colspan="4" class="red">胜负差</td></tr></thead>
          <tbody>
          <template v-if="schedule.holderList[2].length > 0">
            <tr v-for="(sfcTd, key) in sfcTr">
              <td v-if="key === 0" class="blue" rowspan="2" width="10%">客胜</td>
              <td v-if="key === 2" class="green" rowspan="2" width="10%">主胜</td>
              <td v-for="item in sfcTd"
                  class="padding-vertical-0"
                  @click="onDialogOptionSelected(item, 2)"
                  :class="{selected: isDialogSelected(item, 2)}">
                <span class="text-light margin-right-10">{{item.text}}</span>
                {{item.value}}
              </td>
            </tr>
          </template>
          <template v-else>
            <td>未开售</td>
          </template>
          </tbody>
        </table>
      </div>
      <div class="btn-wrap row">
        <div class="col"><a href="javascript:;" @click="onPanelHide()" class="btn">取消</a></div>
        <div class="col"><a href="javascript:;" @click="onPanelConfirm()" class="btn">确认</a></div>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  import {SPORTS_OPTION_SELECTED} from '../../../store/betting/types';
  import VDialog from '../../../components/VDialog.vue';
  export default {
    name: 'basketballSFCLottery',
    props: ['schedule', 'isConfirm'],
    data () {
      return {
        dialogItemSelected: this.schedule.selected.map(value => [...value]),
        bettingPanelVisible: false
      }
    },
    computed: {
      sfcTr () {
        let list = [];
        for (let i = 0; i < 4; i++) {
          for (let j = 0; j < 3; j++) {
            if (!list[i]) list[i] = [];
            list[i][j] = this.schedule.holderList[2][i * 3 + j];
          }
        }
        if (list.length === 4) {
          return [list[2], list[3], list[0], list[1]];
        } else {
          return list;
        }
      },
      boxText () {
        let texts = [];
        this.schedule.selected.map((value, i) => {
          let textArr = [];
          value.map(v => {
            if (i === 2) {
              if (['v01', 'v02', 'v03', 'v04', 'v05', 'v06'].indexOf(v.key) !== -1) {
                textArr.push('客胜{0}'.format(v.text));
              } else {
                textArr.push('主胜{0}'.format(v.text));
              }
            } else if (i === 1) {
              textArr.push('让分{0}'.format(v.text));
            } else {
              textArr.push(v.text);
            }
          })
          if (textArr.length > 0) {
            texts.push('[{0}]'.format(textArr.join(',')));
          }
        });
        return texts.join(',');
      },
      selectedTotal () {
        let total = 0;
        this.schedule.selected.map(v => { total += v.length; });
        return total;
      },
      rightTip () {
        return this.selectedTotal ? '已选 {0}项'.format(this.selectedTotal) : '全部玩法';
      }
    },
    methods: {
      onDialogOptionSelected (item, current) {
        const index = this.dialogItemSelected[current].indexOf(item);
        index !== -1 ? this.dialogItemSelected[current].splice(index, 1)
          : this.dialogItemSelected[current].push(item);
      },
      onOptionSelected (item, index) {
        this.schedule.onOptionSelected(item, index);
        this.$store.commit(SPORTS_OPTION_SELECTED);
        this.$emit('onOptionSelected');
      },
      onPanelShow () {
        this.dialogItemSelected = this.schedule.selected.map(value => [...value]);
        this.bettingPanelVisible = true;
      },
      onPanelHide () {
        this.bettingPanelVisible = false;
      },
      onPanelConfirm () {
        this.schedule.onOptionSelected(this.dialogItemSelected);
        this.$store.commit(SPORTS_OPTION_SELECTED);
        this.$emit('onOptionSelected');
        this.bettingPanelVisible = false;
      },
      isDialogSelected (item, index) {
        return this.dialogItemSelected[index].indexOf(item) !== -1;
      },
      isSelected (item, index) {
        return this.schedule.selected[index].indexOf(item) !== -1;
      }
    },
    components: {VDialog}
  }
</script>

<style>
  .basketball-hh-lottery {
    padding-left: 10px;
    font-size: 14px;
  }
  .basketball-hh-lottery .team-name {
    padding-right: 45px;
  }
  .basketball-hh-lottery .box {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    text-align: center;
    margin-top: 8px;
    font-size: 13px;
    margin-right: 45px;
  }
  .basketball-hh-lottery .box-right {
    width: 40px; text-align: center;
    background: white; font-size: 13px;
    float: right; color: #999;
    margin-top: 8px; padding: 5px;
    border: 1px solid #ddd; border-radius: 4px;
    height: 136px; padding-top: 42px;
  }
  .basketball-hh-lottery .box-right.gray {
    background: #dcdcdc;
  }
  .basketball-hh-lottery .selected-box {
    padding: 5px;
    background: #e73f40;
    color: white;
    margin-top: 5px;
    padding-right: 15px;
    text-align: center;
    border-radius: 5px;
    position: relative;
  }
  .basketball-hh-lottery .selected-box .arrow-right {
    position: absolute; right: 8px;
    top: 10px;
    display: block;
  }
  .basketball-hh-lottery .box .box-item {
    padding: 5px 0; width: 50%; float: left;
  }
  .basketball-hh-lottery .no-sale {
    height: 44px; line-height: 44px;
  }
  .basketball-hh-lottery .border-bottom {
    border-bottom: 1px solid #ddd;
  }
  .basketball-hh-lottery .box .box-item .box-item-content {
    display: block;
  }
  .basketball-hh-lottery .box .box-item.selected {
    background: #e73f40; color: white;
  }
  .basketball-hh-lottery .box .box-item.selected .text-light {
    color: white;
  }
  .basketball-hh-lottery .box .box-item:nth-child(odd) .box-item-content {
    border-right: 1px dotted #ddd;
  }
  .basketball-hh-lottery .box .box-item .box-item-content>span {
    display: block; position: relative;
  }
  .basketball-hh-lottery .box .let-point {
    position: absolute; padding: 1px 2px; border-radius: 15px;
    font-size: 12px; color: white;
  }
  .basketball-hh-lottery .box .let-point.yellow {
    background: #fed223;
  }
  .basketball-hh-lottery .box .let-point.green {
    background: #41b43b;
  }
  .basketball-hh-lottery .dialog .content {
    width: 95%;
    max-width: 320px;
    background: #f2f2f2;
  }
  .basketball-hh-lottery .table-wrap {
    padding: 0 10px;
  }
  .basketball-hh-lottery table {
    background: #ccc; width: 100%;
  }
  .basketball-hh-lottery table td {
    background: white; padding: 5px;
  }
  .basketball-hh-lottery table td.padding-vertical-0 {
    padding: 5px 0;
  }
  .basketball-hh-lottery table td.blue {
    background: #3f6ee7; color: white;
  }
  .basketball-hh-lottery table td.green {
    background: #51b92c; color: white;
  }
  .basketball-hh-lottery table td.orange {
    background: #ffb525; color: white;
  }
  .basketball-hh-lottery table td.red {
    background: #e73f40; color: white;
  }
  .basketball-hh-lottery table td.selected {
    color: white; background: #e73f40;
  }
  .basketball-hh-lottery table td.selected .text-light {
    color: white;
  }
  .basketball-hh-lottery .btn-wrap .btn {
    background: #f2f2f2;
    color: #e73f40;
    border-top: 1px solid #ddd;
    margin-top: 5px;
    border-radius: 0;
  }
  .basketball-hh-lottery .btn-wrap .col:first-child .btn{
    border-right: 1px solid #ddd;
    color: #666;
  }
</style>
