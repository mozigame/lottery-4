<template>
  <div class="sports-no-match">
    <img src="../../../assets/betting/no_match.png" alt="">
    <p class="text-light">暂时没有符合条件的比赛</p>
  </div>
</template>

<script>
  export default {
    name: 'sportsNoMatch'
  }
</script>

<style scoped>
  .sports-no-match {
    padding-top: 100px;
    text-align: center;
  }
  .sports-no-match img {
    width: 100px;
    margin-bottom: 10px;
  }
</style>
