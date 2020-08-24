<template>
  <div
    id="tandem-content_page"
    ref="content"
    class="content-wrapper-tandem content-wrapper-page"
  >
    <Content itemprop="articleBody" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
.content-wrapper-tandem
  &.content-wrapper-page
    max-width 1140px
    .section-header
      h1, h2, p
        color black
      .section-header-right
        text-align right
        @media (max-width: $MQMobile)
          text-align center

    .custom-block
      p
        font-weight 300
        font-size 1.33rem
        letter-spacing -1.04px
        color black
      &.important
        padding 7em 0
        border-top 1px solid $borderColor
        border-bottom 1px solid $borderColor
        margin-bottom 2em
        p
          &.custom-block-title
            font-size 3.64em
            font-family GalaxieCopernicus, PT Serif, serif

</style>
