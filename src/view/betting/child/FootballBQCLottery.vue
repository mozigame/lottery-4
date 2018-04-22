<template>
  <div class="football-bqc-lottery">
    <div class="row text-center text-default text-sm">
      <div class="col col-40"> <span class="text-primary" v-if="schedule.home_rank">[{{schedule.home_rank}}]</span>{{schedule.home}}</div>
      <div class="col text-light">VS</div>
      <div class="col col-40">{{schedule.guest}} <span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span></div>
    </div>
    <div class="box ellipsis" @click="onPanelShow()" :class="{selected: boxText, 'box-icon': isConfirm && boxText}">
      <span>{{boxText || '请点击展开投注'}}</span>
      <span class="arrow-right"></span>
    </div>
    <v-dialog v-show="bettingPanelVisible" @close="onPanelHide()" :title="schedule.home + ' VS ' + schedule.guest">
      <div class="table-wrap">
        <table class="text-center text-sm" cellpadding="0" cellspacing="1">
          <thead class="red"><tr><td colspan="3">半全场</td></tr></thead>
          <tbody>
            <tr v-for="list in tableTrList">
              <td class="text-left" :class="{selected: isDialogSelected(item)}" v-for="item in list" @click="onDialogOptionSelected(item)">
                <span class="text-light">{{item.text}}</span>
                <span class="text-value">{{item.value}}</span>
              </td>
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
  import VDialog from '../../../components/VDialog.vue';
  import {SPORTS_OPTION_SELECTED} from '../../../store/betting/types';
  export default {
    name: 'footballBQCLottery',
    props: ['schedule', 'isConfirm'],
    data () {
      return {
        bettingPanelVisible: false,
        dialogItemSelected: [...this.schedule.selected]
      }
    },
    computed: {
      tableTrList () {
        let list = [];
        this.schedule.holderList.map((value, index) => {
          let floor = Math.floor(index / 3);
          !list[floor] && (list[floor] = []);
          list[floor].push(value);
        });
        return list;
      },
      boxText () {
        let items = [];
        this.schedule.selected.map(v => items.push(v.text));
        return items.join(',');
      }
    },
    methods: {
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
      isDialogSelected (item) {
        return this.dialogItemSelected.indexOf(item) !== -1;
      },
      onDialogOptionSelected (item) {
        const index = this.dialogItemSelected.indexOf(item);
        index !== -1 ? this.dialogItemSelected.splice(index, 1)
          : this.dialogItemSelected.push(item);
      },
      onPanelConfirm () {
        console.log('dialog', this.dialogItemSelected);
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
  .football-bqc-lottery {
    padding-left: 10px;
    font-size: 14px;
  }
  .football-bqc-lottery .box {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    text-align: center;
    margin-top: 8px;
    font-size: 14px;
    padding: 7px 0;
    position: relative;
  }
  .football-bqc-lottery .box.box-icon {
    padding-right: 15px;
  }
  .football-bqc-lottery .box .arrow-right {
    display: none;
  }
  .football-bqc-lottery .box.box-icon .arrow-right {
    position: absolute;
    right: 8px; top: 10px;
    display: block;
  }
  .football-bqc-lottery .box.selected {
    background: #e73f40;
    color: white;
  }
  .football-bqc-lottery .table-wrap {
    padding: 0px 5px 5px 5px;
  }
  .football-bqc-lottery table {
    width: 100%;
    background: #ccc;
  }
  .football-bqc-lottery table tbody td {
    background: white;
    padding: 5px 10px;
  }
  .football-bqc-lottery table tbody td .text-value {
    margin-left: 10px;
  }
  .football-bqc-lottery table tbody td.selected {
    background: #e73f40;
    color: white;
  }
  .football-bqc-lottery table tbody td.selected span {
    color: white;
  }
  .football-bqc-lottery table thead {
    color: white; padding: 5px 0;
  }
  .football-bqc-lottery table thead td {
    padding: 5px 0;
  }
  .football-bqc-lottery table .red {
    background: #e73f40;
  }
  .football-bqc-lottery .dialog .content {
    width: 95%;
    max-width: 320px;
    background: #f2f2f2;
  }
  .football-bqc-lottery .btn-wrap .btn {
    background: #f2f2f2;
    color: #e73f40;
    border-top: 1px solid #ddd;
    margin-top: 5px;
    border-radius: 0;
  }
  .football-bqc-lottery .btn-wrap .col:first-child .btn{
    border-right: 1px solid #ddd;
    color: #666;
  }
</style>
