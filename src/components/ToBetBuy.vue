<template>
  <div class="not-logged-in row">
    <div class="col-center">
      <img src="../assets/betting/no_match.png" alt="">
      <p>{{ to? '暂无投注比赛':'暂时没有比赛' }}</p>
      <router-link v-if="to" class="btn" :to="to">去投注</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ToBetBuy',
    props: {
      to: {
        type: String
      }
    }
  }
</script>

<style scoped>
  .not-logged-in {
    width: 100%;
    height: 10rem;
  }

  .not-logged-in .col-center {
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }

  .not-logged-in .col-center img {
    width: 3.21875rem;
    height: 2.265625rem;
  }

  .not-logged-in .col-center p {
    margin: 0.46875rem 0;
    color: #333333;
    font-size: 0.40625rem;
  }
</style>
