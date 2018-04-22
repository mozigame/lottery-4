<template>
  <div class="basket-team-table">
    <p class="bg-white panel-title-head">
      <img :src="team.src" alt="">
      {{team.name}}
    </p>
    <table class="border-bottom-solid">
      <tbody>
      <tr class="bg-gray padding-10">
        <td>场次</td><td>赛</td><td>胜</td><td>负</td>
        <td>得分</td><td>失分</td><td>净胜</td><td>胜率</td>
      </tr>
      <tr v-for="item in team.list">
        <th >{{item.round}}</th>
        <td >{{item.game_count}}</td>
        <td >{{item.win}}</td>
        <td >{{item.lose}}</td>
        <td >{{item.goal}}</td>
        <td >{{item.fumble}}</td>
        <td >{{item.differential}}</td>
        <td >{{item.win_rate}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'basketTeamTable',
    props: ['team']
  }
</script>

<style>

</style>
