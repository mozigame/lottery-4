<template>
  <table border="0" cellspacing="1" cellpadding="0" width="100%">
    <thead>
    <tr class="text-muted">
      <td width="19%">场次</td>
      <td width="31%" v-if="list && list[0] && list[0].homeFirst">主队vs客队</td>
      <td width="31%" v-else>客队vs主队</td>
      <td width="31%">投注内容/出票赔率</td>
      <td width="19%">彩果</td>
    </tr>
    </thead>
    <tbody class="text-default">
    <tr v-for="item in list">
      <td>{{item.round_no}}</td>
      <td>
        {{item.homeFirst ? item.home : item.guest}}
        <span v-if="item.team.letPointText && item.homeFirst">({{item.team.letPointText}})</span><br/>
        {{(item.scoreText) || 'VS'}}<span v-if="item.team.basePointText">({{item.team.basePointText}})</span><br/>
        {{item.homeFirst ? item.guest : item.home}}
        <span v-if="item.team.letPointText && !item.homeFirst">({{item.team.letPointText}})</span>
      </td>
      <td>
        <!--显示足彩和篮彩-->
        <span v-if="item.showCheck">
          <span v-for="b in item.betting" :class="{'text-primary': b.checked}">
            {{b.text}} {{b.value}}
            <span class="red-check-icon" v-show="b.checked"></span>
            <br>
          </span>
        </span>
        <!--胜负彩和任选九-->
        <span v-else>
          <span v-for="(b, i) in item.betting">
            <span :class="{'text-primary': b.checked}">{{b.text}}</span><span v-if="i < item.betting.length -1">,</span>
          </span>
        </span>
      </td>
      <td><span v-for="r in item.result">{{r.text}} <span v-if="r.value">({{r.value}})</span><br/></span></td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'orderTable',
    props: ['list']
  }
</script>

<style scoped>
  table{
    text-align: center;
    font-size: 11px;
  }
  table td {
    background: white;
    padding: 5px 0;
  }
  .red-check-icon {
    display: inline-block;
  }
</style>
