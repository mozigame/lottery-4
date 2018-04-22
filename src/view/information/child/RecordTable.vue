<template>
  <div class="table-container" :class="{'collapse': collapse}">
    <div class="table-header" @click="switchCollapse">
      {{title}}
      <div class="switch-arrow">
        <span class="arrow-bottom-icon" :class="{'rotate': collapse}"></span>
      </div>
    </div>
    <template v-for="(item, index) in data">
      <div class="table-title" v-html="titleText(item, index)"></div>
      <table cellspacing="0" cellpadding="0" border="0">
        <thead>
        <tr>
          <td width="20%">赛事</td>
          <td width="20%">日期</td>
          <template v-if="isFuture">
            <td width="45%">
              <div class="row">
                <span class="col">主队</span>
                <span class="col"></span>
                <span class="col">客队</span>
              </div>
            </td>
            <td width="15%">相隔</td>
          </template>
          <template v-else>
            <td width="60%">
              <div class="row">
                <span class="col">主队</span>
                <span class="col"></span>
                <span class="col">客队</span>
                <span class="col">胜负</span>
              </div>
            </td>
          </template>
        </tr>
        </thead>
        <tbody>
        <tr v-for="record in item.list">
          <td width="20%">{{record.league}}</td>
          <td width="20%">{{record.date | dateFormat('yyyy-MM-dd')}}</td>
          <template v-if="isFuture">
            <td width="45%">
              <div class="row">
                <span class="col col-center">{{record.home_team}}</span>
                <span class="col col-center">VS</span>
                <span class="col col-center">{{record.guest_team}}</span>
              </div>
            </td>
            <td width="15%">{{record.date_interval}}天</td>
          </template>
          <template v-else>
            <td width="60%">
              <div class="row">
                <span class="col col-center" :class="returnTextColor(item, record.home_team_id, record)">{{record.home_team}}</span>
                <span class="col col-center">{{record.score}}</span>
                <span class="col col-center" :class="returnTextColor(item, record.guest_team_id, record)">{{record.guest_team}}</span>
                <span class="col col-center" :class="returnColor(item, record)">{{returnResult(item, record)}}</span>
              </div>
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'recordTable',
    props: ['isFuture', 'title', 'data'],
    data () {
      return {
        collapse: false
      }
    },
    methods: {
      switchCollapse () {
        this.collapse = !this.collapse;
      },
      titleText (item, index) {
        if (item && item.history_fight) {
          return '近{0}场，主队<span class="red">{1}胜</span><span class="green">{2}平</span><span class="blue">{3}负</span>'
            .format(item.history_fight.games_count, item.history_fight.win, item.history_fight.equal, item.history_fight.lose);
        } else if (item.latest_record) {
          let preText = '近{0}场，{1}<span class="red">{2}胜</span><span class="green">{3}平</span><span class="blue">{4}负</span>'
            .format(item.latest_record.games_count, item.name, item.latest_record.win, item.latest_record.equal, item.latest_record.lose);
          let records = item.list.filter(v => parseInt(index === 1 ? v.guest_team_id : v.home_team_id) === parseInt(item.team_id));
          let s1 = 0;
          let s2 = 0;
          let s3 = 0;
          records.map(v => {
            let score = v.score.split(':').map(v => parseInt(v));
            if (score[0] === score[1]) {
              s2++;
            } else if (score[0] > score[1]) {
              index === 0 ? s1++ : s3++;
            } else {
              index === 0 ? s3++ : s1++;
            }
          });
          let nextText = ', {0}<span class="red">{1}胜</span><span class="green">{2}平</span><span class="blue">{3}负</span>'
            .format(index === 1 ? '客场' : '主场', s1, s2, s3);
          return preText + nextText;
        } else {
          return item.name;
        }
      },
      returnColor (item, record) {
        if (record.score) {
          let score = record.score.split(':').map(v => parseInt(v));
          if (parseInt(item.team_id) === parseInt(record.home_team_id)) {
            return score[0] > score[1] ? 'red' : score[0] < score[1] ? 'blue' : 'green';
          } else {
            return score[0] < score[1] ? 'red' : score[0] > score[1] ? 'blue' : 'green';
          }
        }
      },
      returnResult (item, record) {
        if (record.score) {
          let score = record.score.split(':').map(v => parseInt(v));
          if (parseInt(item.team_id) === parseInt(record.home_team_id)) {
            return score[0] > score[1] ? '胜' : score[0] < score[1] ? '负' : '平';
          } else {
            return score[0] < score[1] ? '胜' : score[0] > score[1] ? '负' : '平';
          }
        }
      },
      returnTextColor (item, id, record) {
        if (parseInt(item.team_id) === parseInt(id)) {
          return this.returnColor(item, record);
        }
        return '';
      }
    }
  }
</script>

<style scoped>
  .table-container {
    background: white; font-size: 14px;
  }
  .table-container .table-header {
    height: 40px; line-height: 40px;
    text-align: center;
    font-size: 16px;
    position: relative;
    border-bottom: 1px solid #ddd;
  }
  .table-container .switch-arrow {
    border: 1px solid #ddd;
    height: 16px; width: 16px;
    border-radius: 20px;
    margin-left: 5px;
    vertical-align: middle;
    position: absolute;
    right: 10px; top: 12px;
  }
  .table-container .arrow-bottom-icon {
    display: inline-block;
    margin-left: 1px;
    vertical-align: top;
    margin-top: 3px;
  }
  .table-container .arrow-bottom-icon.rotate {
    transform: rotate(180deg);
  }
  .table-container .table-title {
    height: 20px;
    margin: 5px 10px;
    border-left: 3px solid red;
    padding-left: 5px;
  }
  .table-container table {
    width: 100%; text-align: center;
    border-collapse:collapse;
    border:none;
  }
  .table-container table thead {
    color: #999999;
  }
  .table-container table tbody {
    font-size: 12px;
  }
  .table-container td {
    padding: 5px 0;
    border: 1px solid #dddddd;
  }
  .table-container.collapse .table-title,
  .table-container.collapse table {
    display: none;
  }
</style>
