<template>
  <div class="test">
    <div ref="carouselContainer">
      <div class="carousel">
        <div class="carousel-scroll" ref="carouselScroll">
          <img :src="item.src" :class="item.className"
               @click="imgClick(index)" alt="img" v-for="(item, index) in imgList">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AlloyFinger from 'alloyfinger';
//  import Transform from 'css3transform';
  export default {
    name: 'test',
    data () {
      return {
        imgList: [
          {className: 'img-left', src: 'http://tclottery.oss-cn-hangzhou.aliyuncs.com/admin_file/2016-09-06/57ce2c381cf80.png'},
          {className: 'img-active', src: 'http://tclottery.oss-cn-hangzhou.aliyuncs.com/admin_file/2016-09-14/57d8e87146e43.jpg'},
          {className: 'img-right', src: 'http://tclottery.oss-cn-hangzhou.aliyuncs.com/admin_file/2016-09-14/57d8b22917ee2.jpg'},
          {className: '', src: 'http://tclottery.oss-cn-hangzhou.aliyuncs.com/admin_file/2017-06-02/5930dcd24a8ee.png'}
        ],
        currentIndex: 1
      }
    },
    methods: {
      imgClick (index) {
        const lg = this.imgList.length;
        if (this.currentIndex !== index) {
          let leftIndex = 0;
          let rightIndex = 0;
          this.currentIndex = index > lg - 1 ? 0 : index < 0 ? lg - 1 : index;
          if (this.currentIndex === lg - 1) {
            leftIndex = this.currentIndex - 1;
            rightIndex = 0;
          } else if (this.currentIndex === 0) {
            leftIndex = lg - 1;
            rightIndex = this.currentIndex + 1;
          } else {
            leftIndex = this.currentIndex - 1;
            rightIndex = this.currentIndex + 1;
          }
          this.imgList = this.imgList.map((value, key) => {
            value.className = ''
            if (key === leftIndex) {
              value.className = 'img-left';
            } else if (key === rightIndex) {
              value.className = 'img-right';
            } else if (key === this.currentIndex) {
              value.className = 'img-active';
            }
            return value;
          })
        }
      }
    },
    mounted () {
      const _this = this;
      new AlloyFinger(this.$refs.carouselScroll, {
        swipe (evt) {
          console.log('"swipe"' + evt.direction);
          if (evt.direction === 'Left') {
            _this.imgClick(_this.currentIndex + 1);
          } else if (evt.direction === 'Right') {
            _this.imgClick(_this.currentIndex - 1);
          }
        }
      });
    }
  }
</script>

<style>
  .test .carousel {
    padding: 10px 50px;
  }
  .test .carousel .carousel-scroll {
    position: relative;
  }
  .test .carousel img {
    width: 100%;
    position: absolute;
    z-index: 0;
    transition: all 0.3s ease-out;
    opacity: 0;
    left: 0; top: 0;
  }
  .test .carousel img.img-left {
    transform: translate(-60px, 0) scale(0.8);
    opacity: 0.8;
    z-index: 2;
  }
  .test .carousel img.img-right {
    transform: translate(60px, 0) scale(0.8);
    opacity: 0.8;
    z-index: 2;
  }
  .test .carousel img.img-active {
    z-index: 5; opacity: 1;
  }

</style>
