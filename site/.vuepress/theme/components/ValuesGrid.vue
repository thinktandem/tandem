<template>
  <div :class="`values-container ${id}`">
    <style>
      .{{ id }} .values-item {width: {{ columnWidth }}%;}
    </style>
    <div
      v-for="item in items"
      :key="getContent(item)"
      :class="{'values-item': true, 'values-link': !!getLink(item)}"
      @click="goto(getLink(item))"
    >
      <h2 v-html="getContent(item)" />
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
  methods: {
    goto(link) {
      if (link) window.open(link, '_blank');
    },
    getContent(item) {
      // If array then assume its the first value
      if (item && typeof item === 'object' && item.constructor === Array) {
        return item[0];
      // Or an object and then assume its named something
      } else if (item && typeof item === 'object' && item.constructor === Object) {
        return item.content || item.html || item.markup;
      // Otherwise assumes its stringy and just return as is
      } else {
        return item;
      }
    },
    getLink(item) {
      // If array then assume its the first value
      if (item && typeof item === 'object' && item.constructor === Array) {
        return item[1];
      // Or an object and then assume its named something
      } else if (item && typeof item === 'object' && item.constructor === Object) {
        return item.link;
      // Otherwise assume we have no link
      } else {
        return false;
      }
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
    box-sizing border-box
    padding 2rem
    position relative
    background $lightGrey
    text-align center
    margin-bottom 1em
    display flex
    justify-content center
    align-items center
    &:before
      content ""
      float left
      padding-top 100%
    h2
      { bodyType }
      font-size typeScale.g
      font-weight normal
    @media (max-width: $MQMobile)
      width 49%
      margin .5em 0em
      min-height 125px
      h2
        font-size typeScale.g
  .values-link
    cursor pointer
    &:hover
      background $tandemPink
      h2
        color #ffffff
    h2
      color $tandemPink
</style>
