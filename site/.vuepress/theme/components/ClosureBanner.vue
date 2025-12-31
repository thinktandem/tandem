<template>
  <div class="closure-banner">
    <div class="closure-banner-content">
      <p class="closure-banner-text">
        Tandem's journey ended December 31st, 2025. 
        <router-link to="/blog/2025/12/31/tandem-closure" class="closure-banner-link">
          Learn about Mike and Alec's new adventures here.
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClosureBanner',
};
</script>

<style lang="stylus" scoped>
.closure-banner
  position fixed
  top 0
  left 0
  right 0
  width 100%
  background-color $tandemPink
  color #ffffff
  z-index 101
  box-shadow 0 2px 4px rgba(0, 0, 0, 0.1)
  padding 12px 20px

.closure-banner-content
  max-width $contentWidth
  margin 0 auto
  text-align center

.closure-banner-text
  margin 0
  font-size 14px
  line-height 1.5
  font-family "Poppins", "Helvetica Neue", Arial, sans-serif

.closure-banner-link
  color #ffffff
  text-decoration underline
  font-weight 600
  transition opacity 0.2s
  &:hover
    opacity 0.8

@media (max-width $MQMobile)
  .closure-banner
    padding 10px 15px
  .closure-banner-text
    font-size 13px
</style>

