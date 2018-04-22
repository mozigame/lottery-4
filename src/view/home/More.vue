<template>
  <div class="home-more">
    <v-head title="更多彩种"></v-head>
    <div class="home-more-container">
      <p class="tip text-sm text-muted">提示：更多彩种请下载老虎彩票</p>
      <div class="box">
        <lottery-item
          :lottery="lottery"
          :key="key"
          v-for="(lottery, key) in lotteries"
          @download="changeDownloadStatus"></lottery-item>
      </div>
    </div>
    <v-dialog v-show="downloadPanel" @close="changeDownloadStatus">
      <p>
        <img src="../../assets/home/download_icon.png" alt="download" width="50">
      </p>
      <p class="text-md margin-top-5">请下载安装老虎彩票官方APP</p>
      <div class="padding">
        <a target="_self" href="http://a.app.qq.com/o/simple.jsp?pkgname=co.sihe.tigerlottery" class="btn">立即下载</a>
      </div>
    </v-dialog>
  </div>
</template>

<script>
  import VHead from '../../components/VHead.vue';
  import LotteryItem from '../../components/HomeLotteryItem.vue';
  import {GET_LOTTERY_LIST} from '../../store/home/types';
  import VDialog from '../../components/VDialog.vue';

  export default {
    name: 'homeMore',
    data () {
      return {
        downloadPanel: false
      }
    },
    computed: {
      lotteries () {
        return this.$store.state.home.lotteries
      }
    },
    methods: {
      changeDownloadStatus () {
        this.downloadPanel = !this.downloadPanel;
      }
    },
    created () {
      this.$store.dispatch(GET_LOTTERY_LIST);
    },
    components: {VHead, LotteryItem, VDialog}
  }
</script>

<style>
  .home-more .home-more-container {
    padding: 5px 10px;
  }
  .home-more .home-more-container .box {
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 5px;
    padding: 5px 10px;
    background: white;
    overflow: hidden;
  }
</style>
