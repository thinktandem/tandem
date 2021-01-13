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
h1
  { displayType }
  font-size typeScale.e
  font-weight 900
  text-decoration underline
h2
  { bodyType }
  font-size typeScale.f
  color black
  margin-bottom 1em
.section-header
  text-align center
  flex-direction column
  margin-bottom 2em
  padding-top 8rem
  .section-header-left , .section-header-right
    width 100%
  .section-header-left
    display inline-block
    img
      width 150px
      position relative
      bottom 6px
    &.linked
      cursor pointer
  .section-header-right
    color black
    font-weight 300
    font-size 1.33rem
    letter-spacing -1.04px
    display inline-block

@media (min-width: $MQMobile)
  h2
    font-size typeScale.e
  .section-header
    display flex
    justify-content center
    flex-direction row
    padding-top 0
    .section-header-left, .section-header-right
      width auto
    .section-header-left
      width 20vw
      text-align left
    .section-header-right
      flex-grow 1
</style>
