<template>
  <div
    id="vuepress-theme-blog__global-layout"
    :style="wrapperTheme"
  >
    <GlobalHeader
      :is-open="isMobileHeaderOpen"
      :active="theme.headerActive"
      :color="theme.headerColor"
      :hover="theme.headerHover"
      @toggle-sidebar="isMobileHeaderOpen = !isMobileHeaderOpen"
    />
    <div
      class="content-wrapper"
      @click="isMobileHeaderOpen = false"
    >
      <DefaultGlobalLayout />
    </div>
    <GlobalFooter />
  </div>
</template>

<script>
import GlobalLayout from '@app/components/GlobalLayout.vue';
import GlobalHeader from '@theme/components/GlobalHeader.vue';
import GlobalFooter from '@theme/components/GlobalFooter.vue';

export default {
  components: {
    DefaultGlobalLayout: GlobalLayout,
    GlobalHeader,
    GlobalFooter,
  },
  data() {
    return {
      isMobileHeaderOpen: false,
      theme: {},
    };
  },
  computed: {
    wrapperTheme() {
      return {background: this.theme.background};
    },
  },
  created() {
    this.$themeListener(theme => {
      this.theme = Object.assign({}, theme);
    });
  },
  mounted() {
    this.$router.afterEach(() => {
      this.isMobileHeaderOpen = false;
      this.$updateTheme({});
    });
  },
};
</script>

<style lang="stylus">
#vuepress-theme-blog__global-layout
  word-wrap break-word
.content-wrapper
  padding 160px 15px 80px 15px
  min-height calc(100vh - 80px - 60px - 160px)
  max-width $contentWidth
  margin 0 auto
  @media (max-width: $MQMobile)
    &
      padding 100px 15px 20px 15px
      min-height calc(100vh - 20px - 60px - 100px)
</style>
