<template>
  <span class="count-down text-primary">{{result | dateFormat('mm:ss')}}</span>
</template>

<script>
  export default {
    name: 'countDown',
    props: ['time'],
    data () {
      return {
        result: 0,
        timeEnd: 0
      }
    },
    methods: {
      setTime () {
        const gap = this.timeEnd - Date.now();
        if (gap <= 0) {
          this.$emit('timeOver');
          return;
        }
        const t = setInterval(() => {
          this.result = (this.timeEnd - Date.now()) / 1000;
          if (this.result <= 0) {
            clearInterval(t);
            this.$emit('timeOver');
          }
        }, 1000);
      }
    },
    watch: {
      time (val) {
        this.timeEnd = Date.now() + val * 1000;
        this.setTime();
      }
    }
  }
</script>
