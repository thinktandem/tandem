<template>
  <div
    id="vuepress-theme-blog__global-layout"
    :style="wrapperTheme">
    <Header
      :is-open="isMobileHeaderOpen"
      :active="theme.headerActive"
      :color="theme.headerColor"
      :hover="theme.headerHover"
      @toggle-sidebar="toggleSidebar()" />
    <div
      class="content-wrapper"
      @click="isMobileHeaderOpen = false">
      <DefaultGlobalLayout />
    </div>
    <Footer />
  </div>
</template>

<script>
import GlobalLayout from '@app/components/GlobalLayout.vue';
import Header from '@theme/components/Header.vue';
import Footer from '@theme/components/Footer.vue';

export default {
  components: {
    DefaultGlobalLayout: GlobalLayout,
    Header,
    Footer,
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
  methods: {
    toggleSidebar() {
      this.isMobileHeaderOpen = !this.isMobileHeaderOpen
    }
  }
};
</script>

<style lang="stylus">
#vuepress-t$eventheme-blog__global-layout
  word-wrap break-word
</style>
