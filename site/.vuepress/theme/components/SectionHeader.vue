<template>
  <div class="section-header">
    <div class="section-header-left">
      <img
        v-if="pic"
        :alt="title"
        :src="pic"
      >
      <h1>{{ title }}</h1>
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
    pic: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="stylus" scoped>
h1
  font-size 28px
  font-weight 900
  letter-spacing -2.32px
  text-decoration underline
h2
  color black
  font-family GalaxieCopernicus, PT Serif, serif
  font-weight 300
  line-height 1.33
  margin 0
  margin-bottom 1em
  letter-spacing -0.19rem
.section-header
  display flex
  justify-content center
  margin-bottom 2em
  .section-header-left, .section-header-right
    display inline-block
  .section-header-left
    margin-right 100px
    width 20%
    img
      width 100px
      border-radius: 100%
      position relative
      bottom: 6px
  .section-header-right
    color black
    font-weight 300
    font-size 1.33rem
    letter-spacing -1.04px
    width 70%
    display inline-block

@media (max-width: $MQMobile)
  .section-header
    flex-direction column
    .section-header-left, .section-header-right
      width 100%

</style>
