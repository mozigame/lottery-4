<template>
  <div class="basketball-sfc-lottery">
    <div class="row text-center text-default text-sm">
      <div class="col"><span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span>{{schedule.guest}}</div>
      <div class="col text-light">VS</div>
      <div class="col">{{schedule.home}}<span class="text-primary" v-if="schedule.home_rank">[{{schedule.home_rank}}]</span></div>
    </div>
    <div class="box" :class="{'box-icon': isConfirm}">
      <div class="box-item ellipsis"
           @click="onPanelShow"
           :class="{selected: boxText}">
        <span>{{boxText || '请选择投注内容'}}</span>
        <span class="arrow-right"></span>
      </div>
    </div>
    <v-dialog
      :title="schedule.guest + ' (客) VS  ' + schedule.home + '(主)' "
      @close="onPanelHide()"
      v-show="bettingPanelVisible">
      <div class="table-wrap">
        <table class="text-center text-sm" cellpadding="0" cellspacing="1">
          <thead><tr><td colspan="3" class="blue">客胜</td></tr></thead>
          <tbody>
            <tr v-for="guestTd in guestTr">
              <td v-for="guest in guestTd"
                  @click="onDialogOptionSelected(guest)"
                  :class="{selected: isDialogSelected(guest)}">
                <span class="text-light margin-right-10">{{guest.text}}</span>
                {{guest.value}}
              </td>
            </tr>
          </tbody>
        </table>
        <table class="text-center text-sm margin-top-10" cellpadding="0" cellspacing="1">
          <thead><tr><td colspan="3" class="green">主胜</td></tr></thead>
          <tbody>
          <tr v-for="homeTd in homeTr">
            <td v-for="home in homeTd"
                @click="onDialogOptionSelected(home)"
                :class="{selected: isDialogSelected(home)}">
              <span class="text-light margin-right-10">{{home.text}}</span>
              {{home.value}}
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
  import {SPORTS_OPTION_SELECTED} from '../../../store/betting/types';
  import VDialog from '../../../components/VDialog.vue';
  export default {
    name: 'basketballSFCLottery',
    props: ['schedule', 'isConfirm'],
    data () {
      return {
        dialogItemSelected: [],
        bettingPanelVisible: false
      }
    },
    computed: {
      homeTr () {
        let list = [];
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 3; j++) {
            if (!list[i]) list[i] = [];
            list[i][j] = this.schedule.holderList[i * 3 + j];
          }
        }
        return list;
      },
      guestTr () {
        let list = [];
        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 3; j++) {
            if (!list[i]) list[i] = [];
            list[i][j] = this.schedule.holderList[(i + 2) * 3 + j];
          }
        }
        return list;
      },
      boxText () {
        let textArr = [];
        this.schedule.selected.map(value => {
          console.log(value.key);
          if (['v01', 'v02', 'v03', 'v04', 'v05', 'v06'].indexOf(value.key) !== -1) {
            textArr.push('客胜{0}'.format(value.text));
          } else {
            textArr.push('主胜{0}'.format(value.text));
          }
        });
        return textArr.join(',');
      }
    },
    methods: {
      onDialogOptionSelected (item) {
        const index = this.dialogItemSelected.indexOf(item);
        index !== -1 ? this.dialogItemSelected.splice(index, 1) : this.dialogItemSelected.push(item);
        console.log(this.dialogItemSelected);
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
      }
    },
    components: {VDialog}
  }
</script>

<style>
  .basketball-sfc-lottery {
    padding-left: 10px;
    font-size: 14px;
  }
  .basketball-sfc-lottery .box {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    background: white;
    text-align: center;
    margin-top: 8px;
    font-size: 13px;
    position: relative;
  }
  .basketball-sfc-lottery .box .arrow-right {
    display: none;
  }
  .basketball-sfc-lottery .box.box-icon .arrow-right {
    position: absolute; right: 5px;
    top: 10px; display: block;
  }
  .basketball-sfc-lottery .box .box-item {
    padding: 7px 5px; width: 100%;
  }
  .basketball-sfc-lottery .box .box-item.selected {
    background: #e73f40;
    color: white;
  }
  .basketball-sfc-lottery .dialog .content {
    width: 95%;
    max-width: 320px;
    background: #f2f2f2;
  }
  .basketball-sfc-lottery .table-wrap {
    padding: 0 10px;
  }
  .basketball-sfc-lottery table {
    background: #ccc; width: 100%;
  }
  .basketball-sfc-lottery table td {
    background: white; padding: 5px;
  }
  .basketball-sfc-lottery table td.blue {
    background: #3f6ee7; color: white;
  }
  .basketball-sfc-lottery table td.green {
    background: #51b92c; color: white;
  }
  .basketball-sfc-lottery table td.selected {
    color: white; background: #e73f40;
  }
  .basketball-sfc-lottery table td.selected .text-light {
    color: white;
  }
  .basketball-sfc-lottery .btn-wrap .btn {
    background: #f2f2f2;
    color: #e73f40;
    border-top: 1px solid #ddd;
    margin-top: 5px;
    border-radius: 0;
  }
  .basketball-sfc-lottery .btn-wrap .col:first-child .btn{
    border-right: 1px solid #ddd;
    color: #666;
  }
</style>
