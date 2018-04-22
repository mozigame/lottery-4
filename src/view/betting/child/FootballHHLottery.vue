<template>
  <div class="football-hh-lottery">
    <div class="row text-center text-default text-sm">
      <div class="col col-40"> <span class="text-primary" v-if="schedule.home_rank">[{{schedule.home_rank}}]</span>{{schedule.home}}</div>
      <div class="col text-light">VS</div>
      <div class="col col-40">{{schedule.guest}} <span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span></div>
    </div>
    <div class="box ellipsis selected box-icon" @click="onPanelShow()" v-if="isConfirm">
      <span>{{boxText || '请点击展开投注'}}</span>
      <span class="arrow-right"></span>
    </div>
    <div class="box ellipsis" v-else>
      <template v-if="schedule.holderList[0].length > 0">
        <div class="left-point-top">0</div>
        <div class="box-item"
             @click="onOptionSelected(item, 0)"
             v-for="(item, index) in schedule.holderList[0]"
             :class="{selected: isSelected(item, 0), 'box-center': index===1}">
          <span><i class="text-light">{{item.text}}</i> {{item.value}}</span>
        </div>
      </template>
      <template v-else>
        <div class="box-item-no">
          未开售
        </div>
      </template>
      <template v-if="schedule.holderList[1].length > 0">
        <div class="left-point-bottom" :class="schedule.letPointsColor">{{schedule.letPointsText}}</div>
        <div class="box-item border-top"
             @click="onOptionSelected(item, 1)"
             v-for="(item, index) in schedule.holderList[1]"
             :class="{selected: isSelected(item, 1), 'box-center': index===1}">
          <span><i class="text-light">{{item.text}}</i> {{item.value}}</span>
        </div>
      </template>
      <template v-else>
        <div class="box-item-no">
          未开售
        </div>
      </template>
      <div class="right-item-selected" @click="onPanelShow()" :class="{gray: selectedTotal > 0}">
        {{rightTip}}
      </div>
    </div>
    <v-dialog v-show="bettingPanelVisible" @close="onPanelHide()" :title="schedule.home + ' VS ' + schedule.guest">
      <div class="table-wrap">
        <table class="text-center text-sm" cellpadding="0" cellspacing="1">
          <thead class="red"><tr><td colspan="4">让球胜平负</td></tr></thead>
          <tbody>
            <tr>
              <template v-if="schedule.holderList[0].length > 0">
                <td class="gray" style="width: 15px;">0</td>
                <td :class="{selected: isDialogSelected(item, 0)}"
                    v-for="item in schedule.holderList[0]"
                    @click="onDialogOptionSelected(item, 0)">
                  <span class="text-light">{{item.text}}</span>
                  <span class="text-value">{{item.value}}</span>
                </td>
              </template>
              <template v-else>
                <td colspan="4">未开售</td>
              </template>
            </tr>
            <tr>
              <template v-if="schedule.holderList[1].length > 0">
                <td style="width: 15px;" :class="schedule.letPointsColor">{{schedule.letPointsText}}</td>
                <td :class="{selected: isDialogSelected(item, 1)}"
                    v-for="item in schedule.holderList[1]"
                    @click="onDialogOptionSelected(item, 1)">
                  <span class="text-light">{{item.text}}</span>
                  <span class="text-value">{{item.value}}</span>
                </td>
              </template>
              <template v-else>
                <td colspan="4">未开售</td>
              </template>
            </tr>
          </tbody>
        </table>
        <table class="text-center text-sm" cellpadding="0" cellspacing="1">
          <thead><tr><td class="green" colspan="7">比分</td></tr></thead>
          <tbody>
          <template v-if="bfTrList.length > 0">
            <tr v-for="list in bfTrList">
              <td v-for="(item, i) in list"
                  :class="{selected: isDialogSelected(item, 2)}"
                  :colspan="i === list.length-1 ? 8 - list.length : 1"
                  @click="onDialogOptionSelected(item, 2)">
                <span class="text-light">{{item.text}}</span><p>{{item.value}}</p>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr><td colspan="7">未开售</td></tr>
          </template>
          </tbody>
        </table>
        <table class="text-center text-sm" cellpadding="0" cellspacing="1">
          <thead><tr><td class="blue" colspan="7">总进球</td></tr></thead>
          <tbody>
          <template v-if="zjqTrList.length > 0">
            <tr v-for="list in zjqTrList">
              <td v-for="(item, i) in list"
                  :class="{selected: isDialogSelected(item, 3)}"
                  :colspan="i === list.length-1 ? 8 - list.length : 1"
                  @click="onDialogOptionSelected(item, 3)">
                <span class="text-light margin-right-10">{{item.text}}</span><span>{{item.value}}</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr><td colspan="7">未开售</td></tr>
          </template>
          </tbody>
        </table>
        <table class="text-center text-sm" cellpadding="0" cellspacing="1">
          <thead><tr><td class="yellow" colspan="7">半全场</td></tr></thead>
          <tbody>
          <template v-if="bqcTrList.length > 0">
            <tr v-for="list in bqcTrList">
              <td v-for="(item, i) in list"
                  :class="{selected: isDialogSelected(item, 4)}"
                  :colspan="i === list.length-1 ? 8 - list.length : 1"
                  @click="onDialogOptionSelected(item, 4)">
                <span class="text-light margin-right-10">{{item.text}}</span><span>{{item.value}}</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr><td colspan="7">未开售</td></tr>
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
  import VDialog from '../../../components/VDialog.vue';
  import {SPORTS_OPTION_SELECTED} from '../../../store/betting/types';
  export default {
    name: 'footballBQCLottery',
    props: ['schedule', 'isConfirm'],
    data () {
      return {
        bettingPanelVisible: false,
        dialogItemSelected: this.schedule.selected.map(value => [...value])
      }
    },
    computed: {
      bqcTrList () {
        let list = [];
        this.schedule.holderList[4].map((value, index) => {
          let floor = Math.floor(index / 3);
          !list[floor] && (list[floor] = []);
          list[floor].push(value);
        });
        return list;
      },
      zjqTrList () {
        let list = [];
        this.schedule.holderList[3].map((value, index) => {
          let floor = Math.floor(index / 4);
          !list[floor] && (list[floor] = []);
          list[floor].push(value);
        });
        return list;
      },
      bfTrList () {
        let list = [[], [], [], [], []];
        this.schedule.holderList[2].map((value, index) => {
          if (index < 7) {
            list[0].push(value);
          } else if (index < 13) {
            list[1].push(value);
          } else if (index < 18) {
            list[2].push(value);
          } else if (index < 25) {
            list[3].push(value);
          } else {
            list[4].push(value);
          }
        });
        return list;
      },
      selectedTotal () {
        let total = 0;
        this.schedule.selected.map(v => { total += v.length; });
        return total;
      },
      rightTip () {
        return this.selectedTotal ? '已选 {0}项'.format(this.selectedTotal) : '展开全部';
      },
      boxText () {
        let textArr = [];
        this.schedule.selected.map((value, index) => {
          let arr = [];
          value.map(v => arr.push(index !== 1 ? v.text : '让球' + v.text));
          if (arr.length > 0) {
            textArr.push('[{0}]'.format(arr.join(',')))
          }
        });
        return textArr.join(',');
      }
    },
    methods: {
      onOptionSelected (item, index) {
        this.schedule.onOptionSelected(item, index);
        this.$store.commit(SPORTS_OPTION_SELECTED);
        this.$emit('onOptionSelected');
        this.dialogItemSelected = this.schedule.selected.map(value => [...value]);
      },
      onPanelShow () {
        this.dialogItemSelected = this.schedule.selected.map(value => [...value]);
        this.bettingPanelVisible = true;
      },
      onPanelHide () {
        this.bettingPanelVisible = false;
      },
      isSelected (item, index) {
        return this.schedule.selected[index].indexOf(item) !== -1;
      },
      isDialogSelected (item, index) {
        return this.dialogItemSelected[index].indexOf(item) !== -1;
      },
      onDialogOptionSelected (item, current) {
        const index = this.dialogItemSelected[current].indexOf(item);
        index !== -1 ? this.dialogItemSelected[current].splice(index, 1)
          : this.dialogItemSelected[current].push(item);
      },
      onPanelConfirm () {
        this.schedule.onOptionSelected(this.dialogItemSelected);
        this.$store.commit(SPORTS_OPTION_SELECTED);
        this.$emit('onOptionSelected');
        this.bettingPanelVisible = false;
      }
    },
    components: {VDialog}
  }
</script>

<style>
  .football-hh-lottery {
    padding-left: 10px;
    font-size: 14px;
  }
  .football-hh-lottery .box {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    text-align: center;
    margin-top: 8px;
    font-size: 14px;
    position: relative;
    padding: 0 40px 0 15px;
  }
  .football-hh-lottery .box.selected {
    background: #e73f40;
    color: white;
  }
  .football-hh-lottery .box.box-icon {
    padding-right: 15px;
    height: 35px; line-height: 35px;
  }
  .football-hh-lottery .box .arrow-right {
    display: none;
  }
  .football-hh-lottery .box.box-icon .arrow-right {
    position: absolute;
    right: 8px; top: 10px;
    display: block;
  }
  .football-hh-lottery .left-point-top {
    position: absolute;
    left: 0; top: 0; height: 30px; line-height: 30px;
    background: #dcdcdc;
    width: 15px;
    text-align: center;
    color: white;
    font-size: 12px;
  }
  .football-hh-lottery .left-point-bottom {
    position: absolute;
    left: 0; bottom: 0; height: 30px; line-height: 30px;
    width: 15px;
    text-align: center;
    color: white;
    font-size: 12px;
  }
  .football-hh-lottery .right-item-selected {
    width: 40px; height: 70px;
    position: absolute;
    right: 0; top: 0;
    padding: 10px 0;
    text-align: ;
    white-space: normal;
    border-left: 1px solid #ddd;
  }
  .football-hh-lottery .right-item-selected.gray {
    background: #dcdcdc;
  }
  .football-hh-lottery .left-point-bottom.green {
    background: #41b43b;
  }
  .football-hh-lottery .left-point-bottom.yellow {
    background: #fed223;
  }
  .football-hh-lottery .box .box-item {
    height: 30px;
    line-height: 30px;
    float: left;
    width: 35%;
  }
  .football-hh-lottery .box .box-item-no {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #999;
  }
  .football-hh-lottery .box .box-item.border-top {
    border-top: 1px solid #ddd;
  }
  .football-hh-lottery .box .box-item.box-center {
    width: 30%;
  }
  .football-hh-lottery .box .box-item.box-center span {
    border-left: 1px dotted #ddd;
    border-right: 1px dotted #ddd;
    display: inline-block;
    width: 100%;
  }
  .football-hh-lottery .box .box-item.selected {
    background: #e73f40;
    color: white;
  }
  .football-hh-lottery .box .box-item.selected .text-light {
    color: white;
  }
  .football-hh-lottery .box.selected {
    background: #e73f40;
    color: white;
  }
  .football-hh-lottery .table-wrap {
    padding: 0px 5px 5px 5px;
    max-height: 300px;
    overflow-y: auto;
  }
  .football-hh-lottery table {
    width: 100%;
    background: #ccc;
    margin-bottom: 10px;
  }
  .football-hh-lottery table tbody td {
    background: white;
    padding: 5px 0;
  }
  .football-hh-lottery table tbody td .text-value {
    margin-left: 10px;
  }
  .football-hh-lottery table tbody td.selected {
    background: #e73f40;
    color: white;
  }
  .football-hh-lottery table tbody td.selected span {
    color: white;
  }
  .football-hh-lottery table thead {
    color: white; padding: 5px 0;
  }
  .football-hh-lottery table thead td {
    padding: 5px 0;
  }
  .football-hh-lottery table .red {
    background: #e73f40;
  }
  .football-hh-lottery .dialog .content {
    width: 95%;
    max-width: 320px;
    background: #f2f2f2;
  }
  .football-hh-lottery .btn-wrap .btn {
    background: #f2f2f2;
    color: #e73f40;
    border-top: 1px solid #ddd;
    margin-top: 5px;
    border-radius: 0;
  }
  .football-hh-lottery .btn-wrap .col:first-child .btn{
    border-right: 1px solid #ddd;
    color: #666;
  }
  .football-hh-lottery table td.green {
    background: #41b43b;
    color: white;
  }
  .football-hh-lottery table td.gray {
    background: #dcdcdc;
    color: white;
  }
  .football-hh-lottery table td.blue {
    background: #3f7ee7;
    color: white;
  }
  .football-hh-lottery table td.yellow {
    background: #ffb525;
    color: white;
  }
  .football-hh-lottery table td.red {
    background: #e73f40;
    color: white;
  }
</style>
