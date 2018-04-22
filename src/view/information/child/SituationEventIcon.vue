<template>
  <span :class="icon"></span>
</template>

<script>
  let icons = [
    'football-ic-icon',
    'football-penalty-icon',
    'football-oolong-icon',
    'yellow-card',
    'red-card',
    'football-yellow-red-icon',
    'football-ic-decline-icon',
    'football-ic-rise-icon',
    'football-ic-start',
    'football-ic-start',
    'football-ic-start',
    'football-assist-icon'
  ]
  export default {
    name: 'situationEventIcon',
    props: ['type'],
    computed: {
      icon () {
        return icons[this.type];
      }
    }
  }
</script>

<style>

</style>
