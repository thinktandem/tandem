<template>
  <div class="section-header">
    <div
      v-if="logo"
      class="section-header-left logo"
    >
      <a
        v-if="link"
        :href="link"
        target="_blank"
      >
        <img
          :alt="title"
          :src="logo"
        >
      </a>
      <img
        v-else
        :alt="title"
        :src="logo"
      >
    </div>
    <div
      v-else
      class="section-header-left reg"
    >
      <img
        v-if="pic"
        :alt="title"
        :src="pic"
      >
      <a
        v-if="link"
        :href="link"
        target="_blank"
      ><h1>{{ title }}</h1></a>
      <h1 v-else>
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
    pic: {
      type: String,
      default: null,
    },
    logo: {
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
    &.reg
      margin-right 100px
      width 20%
      img
        width 100px
        border-radius: 100%
        position relative
        bottom: 6px
    &.logo
      img
        width 200px
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
    text-align center
    flex-direction column
    .section-header-left, .section-header-right
      width 100%

</style>
