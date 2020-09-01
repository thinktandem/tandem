<template>
  <div :class="`values-container ${id}`">
    <style>
      .{{ id }} .values-item {width: {{ columnWidth }}%;}
    </style>
    <div
      v-for="item in items"
      :key="item"
      class="values-item"
    >
      <h2 v-html="item" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'ValuesGrid',
  props: {
    id: {
      type: String,
      default: 'values-grid',
    },
    items: {
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
.values-container
  display flex
  flex-wrap wrap
  justify-content space-between
  width 100%
  .values-item
    h2
      font-size 1.3em
      font-family GalaxieCopernicus, PT Serif, serif
      font-weight 400
      width 75%
    position relative
    background $lightGrey
    text-align center
    padding 0
    margin-bottom 1em
    display flex
    justify-content center
    align-items center
    &:before
      content ""
      float left
      padding-top 100%

    @media (max-width: $MQMobile)
      width 49%

      margin .5em 0em
      min-height 125px
</style>
