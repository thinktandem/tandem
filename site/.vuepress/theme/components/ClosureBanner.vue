<template>
  <div class="closure-banner">
    <div class="closure-banner-content">
      <span class="closure-banner-text">
        Tandem's journey ended December 31st, 2025. 
        <router-link to="/blog/2025/12/30/tandem-closure" class="closure-banner-link">
          Learn about Mike and Alec's new adventures here.
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
.closure-banner
  position absolute 
  top 0
  left 0
  right 0
  z-index 200
  background-color $tandemPink
  color white
  padding 12px 20px
  text-align center
  box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
  .closure-banner-content
    max-width $contentWidth
    margin 0 auto
    font-family "Poppins", "Helvetica Neue", Arial, sans-serif
    font-size 14px
    line-height 1.5
    .closure-banner-text
      display block
    .closure-banner-link
      color white
      text-decoration underline
      font-weight 600
      transition opacity 0.2s
      &:hover
        opacity 0.8

@media (max-width $MQMobile)
  .closure-banner
    padding 10px 15px
    .closure-banner-content
      font-size 13px
</style>

