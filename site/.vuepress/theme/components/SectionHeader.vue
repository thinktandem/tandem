<template>
  <div class="section-header">
    <div
      class="section-header-left"
      :class="{linked: link}"
    >
      <img
        v-if="pic"
        :alt="title"
        :src="pic"
        :style="`border-radius: ${radius};`"
        @click="goto(link)"
      >
      <h1
        v-if="title && !noHeader"
        @click="goto(link)"
      >
        {{ title }}
      </h1>
    </div>
    <div class="section-header-right">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SectionHeader',
  props: {
    title: {
      type: String,
      required: true,
      default: 'Title',
    },
    link: {
      type: String,
      default: null,
    },
    noHeader: {
      type: Boolean,
      default: false,
    },
    radius: {
      type: String,
      default: '0',
    },
    pic: {
      type: String,
      default: null,
    },
  },
  methods: {
    goto(link) {
      if (link) window.open(link, '_blank');
    },
  },
};
</script>

<style lang="stylus" scoped>

.section-header
  text-align center
  flex-direction column
  margin-bottom 2em
  h1
    font-size typeScale.d
    display inline-block
    text-decoration underline
    padding-top 0.35rem
    white-space nowrap
    color $textColor
  .section-header-left, .section-header-right
    width 100%
  .section-header-left
    display inline-block
    img
      display inline-block
      width 3rem
      position relative
      top 0.75rem
    &.linked
      cursor pointer
  .section-header-right
    text-align center;
    h1
      text-decoration none
      line-height 1
      margin-top 0.775rem
    p
      font-size typeScale.f
      font-weight 300
    h2
      { bodyType }
      margin-top 0.425em
      font-weight 500
      font-size typeScale.f
      color $textColor
      margin-bottom 1em
  @media (min-width: $MQMobile)
    display flex
    justify-content center
    flex-direction row
    padding-top 0
    .section-header-left, .section-header-right
      width auto
    .section-header-left
      white-space nowrap
      text-align left
    .section-header-right
      flex-grow 1
      text-align right
      h2
        font-size typeScale.c
    p
      max-width 55em
  @media (min-width: $MQSmall)
    h1
      padding-left 0
</style>
