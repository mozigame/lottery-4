<template>
  <div class="football-zjq-lottery">
    <div class="row text-center text-default text-sm">
      <div class="col col-40"> <span class="text-primary" v-if="schedule.home_rank">[{{schedule.home_rank}}]</span>{{schedule.home}}</div>
      <div class="col text-light">VS</div>
      <div class="col col-40">{{schedule.guest}} <span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span></div>
    </div>
    <template v-if="!isConfirm">
      <div class="box">
        <div class="box-item text-right"
             @click="onOptionSelected(item, index)"
             v-for="(item, index) in schedule.holderList"
             :class="{selected: isSelected(item), 'border-bottom': index < 4}">
          <span> <i class="text-light pull-left">{{item.text}}</i> {{item.value}}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="box" @click="onPanelShow">
        <div class="box-text">{{boxText}}</div>
        <span class="arrow-right"></span>
      </div>
    </template>
    <v-dialog v-show="bettingPanelVisible" @close="onPanelHide()" :title="schedule.home + ' VS ' + schedule.guest">
      <div class="table-wrap">
        <table class="text-center text-sm" cellpadding="0" cellspacing="1">
          <thead class="blue"><tr><td colspan="4">总进球</td></tr></thead>
          <tbody>
          <tr>
            <template v-for="(item, index) in schedule.holderList">
              <td v-if="index < 4"
                  @click="onDialogOptionSelected(item, index)"
                  :class="{selected: isDialogSelected(item)}">
                <span> <i class="text-light pull-left">{{item.text}}</i> {{item.value}}</span>
              </td>
            </template>
          </tr>
          <tr>
            <template v-for="(item, index) in schedule.holderList">
              <td v-if="index > 3"
                  @click="onDialogOptionSelected(item, index)"
                  :class="{selected: isDialogSelected(item)}">
                <span> <i class="text-light pull-left">{{item.text}}</i> {{item.value}}</span>
              </td>
            </template>
          </tr>
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
    name: 'footballZJQLottery',
    props: ['schedule', 'isConfirm'],
    data () {
      return {
        bettingPanelVisible: false,
        dialogItemSelected: [...this.schedule.selected]
      }
    },
    computed: {
      boxText () {
        let items = [];
        this.schedule.selected.map(v => items.push(v.text));
        return items.join(',');
      }
    },
    methods: {
      onDialogOptionSelected (item) {
        const index = this.dialogItemSelected.indexOf(item);
        index !== -1 ? this.dialogItemSelected.splice(index, 1) : this.dialogItemSelected.push(item);
      },
      onOptionSelected (item) {
        this.schedule.onOptionSelected(item);
        this.$store.commit(SPORTS_OPTION_SELECTED);
        this.$emit('onOptionSelected');
      },
      onPanelShow () {
        this.dialogItemSelected = [...this.schedule.selected];
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
      isDialogSelected (item) {
        return this.dialogItemSelected.indexOf(item) !== -1;
      },
      isSelected (item) {
        return this.schedule.selected.indexOf(item) !== -1;
      }
    },
    components: {VDialog}
  }
</script>

<style>
  .football-zjq-lottery {
    padding-left: 10px;
    font-size: 14px;
  }
  .football-zjq-lottery .box {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    text-align: center;
    margin-top: 8px;
    font-size: 13px;
    position: relative;
  }
  .football-zjq-lottery .box-text {
    height: 30px;
    line-height: 30px;
    background: #e73f40;
    color: white;
  }
  .football-zjq-lottery .box .arrow-right{
    position: absolute; right: 5px; top: 10px;
  }
  .football-zjq-lottery .box .box-item {
    padding: 7px 0;
    float: left;
    width: 25%;
  }
  .football-zjq-lottery .box .box-item.border-bottom {
    border-bottom: 1px solid #ddd;
  }
  .football-zjq-lottery .box .box-item span {
    border-left: 1px dotted #ddd;
    display: inline-block;
    width: 100%;
    padding: 0 3px;
    box-sizing: border-box;
  }
  @media screen and (min-width: 321px){
    .football-zjq-lottery .box .box-item span {
      padding: 0 8px;
    }
  }
  .football-zjq-lottery .box .box-item:nth-child(1) span,
  .football-zjq-lottery .box .box-item:nth-child(5) span {
    border-left: none;
  }
  .football-zjq-lottery .box .box-item.selected {
    background: #e73f40;
    color: white;
  }
  .football-zjq-lottery .box .box-item.selected .text-light {
    color: white;
  }
  .football-zjq-lottery .table-wrap {
    padding: 0px 5px 5px 5px;
  }
  .football-zjq-lottery table {
    width: 100%;
    background: #ccc;
  }
  .football-zjq-lottery table tbody td {
    background: white;
    padding: 5px;
  }
  .football-zjq-lottery table tbody td.selected {
    background: #e73f40;
    color: white;
  }
  .football-zjq-lottery table tbody td.selected span {
    color: white;
  }
  .football-zjq-lottery table tbody td.selected .text-light {
    color: white;
  }
  .football-zjq-lottery table thead td{
    color: white; padding: 5px;
  }
  .football-zjq-lottery table .blue {
    background: #3f6ee7;
  }
  .football-zjq-lottery .dialog .content {
    width: 95%;
    max-width: 320px;
    background: #f2f2f2;
  }
  .football-zjq-lottery .btn-wrap .btn {
    background: #f2f2f2;
    color: #e73f40;
    border-top: 1px solid #ddd;
    margin-top: 5px;
    border-radius: 0;
  }
  .football-zjq-lottery .btn-wrap .col:first-child .btn{
    border-right: 1px solid #ddd;
    color: #666;
  }
</style>
