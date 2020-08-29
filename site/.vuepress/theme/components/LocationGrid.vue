<template>
  <div class="location-container">
    <style>
      .location-container .location-item {width: {{ columnWidth }}%;}
    </style>
    <div
      v-for="location in locations"
      :key="location.airport"
      class="location-item"
      :style="{'color': location.text, 'background-color': location.background}"
    >
      <div class="location-wrapper">
        <div class="location-email">
          <h2 :style="{'color': location.text}">
            {{ location.name }}.
          </h2>
          <a :href="`mailto:${location.email}`">{{ location.email }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LocationGrid',
  props: {
    locations: {
      type: Array,
      required: true,
    },
    columns: {
      type: Number,
      default: 4,
    },
  },
  computed: {
    columnWidth() {
      return (100 / this.columns) - 1;
    },
  },
};
</script>

<style lang="stylus" scoped>
.location-container
  display flex
  flex-wrap wrap
  justify-content space-between
  width 100%
  .location-wrapper
    background-color $lightGrey
    position relative
    text-align center
    padding 0
    opacity 1
    margin-bottom 2px
    display flex
    justify-content center
    align-items center
    &:before
      content ""
      float left
      padding-top 100%
  .location-item
    h2
      color inherit
      font-size 1.2em
      font-family "Poppins", "Helvetica Neue", Arial, sans-serif
      font-weight 400
      text-transform uppercase
      margin 0
      padding 0
    a
      font-size .67em
      color black
      text-decoration none
      &:hover
        color $tandemPink


    @media (max-width: $MQMobile)
      width 45%

      margin .5em 0em
      min-height 125px
</style>
