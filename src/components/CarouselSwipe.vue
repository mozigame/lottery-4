<template>
  <div class="carousel-swipe">
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

  export default {
    name: 'carouselSwipe',
    data () {
      return {
        imgList: this.list,
        currentIndex: 1
      }
    },
    props: ['list'],
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
  .carousel-swipe .carousel {
    padding: 10px 50px;
    position: relative;
    min-height: 120px;
  }
  .carousel-swipe .carousel .carousel-scroll {
    position: relative;
  }
  .carousel-swipe .carousel img {
    width: 100%;
    position: absolute;
    z-index: 0;
    transition: all 0.3s ease-out;
    opacity: 0;
    left: 0; top: 0;
    border-radius: 5px;
  }
  .carousel-swipe .carousel img.img-left {
    transform: translate(-60px, 0) scale(0.8);
    opacity: 0.8;
    z-index: 2;
  }
  .carousel-swipe .carousel img.img-right {
    transform: translate(60px, 0) scale(0.8);
    opacity: 0.8;
    z-index: 2;
  }
  .carousel-swipe .carousel img.img-active {
    z-index: 5; opacity: 1;
  }
</style>
