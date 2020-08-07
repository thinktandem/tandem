<template>
  <section id="header-wrapper">
    <header id="header" class="show">
      <div class="header-wrapper">
        <img
          v-if="$site.themeConfig.logo"
          class="logo"
          :src="$withBase($site.themeConfig.logo)"
          :alt="$siteTitle"
        >
        <div class="title">
          <NavLink link="/" class="home-link">{{ $site.title }} </NavLink>
        </div>
        <nav class="header-right-wrap">
          <ul v-if="$themeConfig.nav" class="nav">
            <li
              v-for="item in $themeConfig.nav"
              :key="item.text"
              class="nav-item"
            >
              <NavLink :link="item.link">{{ item.text }}</NavLink>
            </li>
          </ul>
          <Feed />
        </nav>
      </div>
    </header>
    <div id="nav_toggle" class="nav-toggle hide">
      <a href="#">
        <img
          v-if="$site.themeConfig.logo"
          class="icon"
          :src="$withBase($site.themeConfig.logo)"
          :alt="$siteTitle"
        >
      </a>
    </div>
  </section>
</template>

<script>
import Feed from '@parent-theme/components/Feed';

export default {
  components: {Feed},
  data() {
    return {
      lastScrollPos: window.pageYOffset,
      navFade: 50,
    };
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  },
  mounted() {
    // @TODO: do not do this on the homepage

    // Add a scroll watcher
    window.addEventListener('scroll', this.onScroll);

    // Hide the menu toggle to start
    this.hideNavToggle();
  },
  methods: {
    onScroll(e) {
      // Do stuff after 50px
      if (window.top.scrollY > 50) {
        // Hide header
        this.hideHeader();

        // Show navtoggle on scroll up
        console.log(this.lastScrollPos > window.pageYOffset);
        if (this.lastScrollPos > window.pageYOffset) {
          this.showMenuToggle();
        } else {
          this.hideNavToggle();
        }

      // Show header if we are approaching the top
      } else {
        this.showHeader();
      }

      // Reset the previous position
      this.lastScrollPos = window.pageYOffset;
    },
    hideHeader() {
      const header = document.getElementById('header');
      header.classList.remove('show');
      header.classList.add('hide');
    },
    hideNavToggle() {
      const navToggle = document.getElementById('nav_toggle');
      navToggle.classList.remove('show');
      navToggle.classList.add('hide');
    },
    showHeader() {
      const header = document.getElementById('header');
      header.classList.remove('hide');
      header.classList.add('show');
    },
    showMenuToggle() {
      const navToggle = document.getElementById('nav_toggle');
      navToggle.classList.remove('hide');
      navToggle.classList.add('show');
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~@app/style/config';

#header
  z-index 100
  position fixed
  top 0
  width 100vw
  box-sizing border-box
  background-color transparent
  padding 20px
  margin auto
  transition all 1s cubic-bezier(0.25, 0.8, 0.25, 1)

  ol, ul
    list-style none
    margin 0
    padding 0

  &.hide
    visibility: hidden
    opacity: 0
    margin-top: -100px
    transition: visibility 0s 0.25s, opacity 0.25s linear, margin-top 0.5s
    -webkit-transition:  visibility 0s 0.25s, opacity 0.25s linear, margin-top 0.5s
  &.show
    visibility: visible
    opacity: 1
    margin-top: 0
    transition: opacity 0.5s linear, margin-top 0.5s

#nav_toggle
  z-index 90
  position fixed
  top 0
  box-sizing border-box
  background-color transparent
  padding 20px
  margin auto
  &.hide
    visibility: hidden
    opacity: 0
    margin-top: -100px
    transition: visibility 0s 0.25s, opacity 0.25s linear, margin-top 0.5s
    -webkit-transition:  visibility 0s 0.25s, opacity 0.25s linear, margin-top 0.5s
  &.show
    visibility: visible
    opacity: 1
    margin-top: 0
    transition: opacity 0.5s linear, margin-top 0.5s
  .icon
    height 50px
    width 50px
    margin-right 10px
    margin-top -3px

.header-wrapper
  display flex
  line-height 40px
  height 40px
  .logo
    height 50px
    width 50px
    margin-right 10px
    margin-top -3px
  .title
    /* flex 0 0 200px */
    font-size 30px
    margin 0
    letter-spacing 2px
    display block
    text-transform uppercase

    a
      color $darkTextColor
      font-weight bold
      font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
      text-decoration none

  .header-right-wrap
    flex 1
    display flex
    justify-content flex-end
    align-items center

    .nav
      flex 0 0 auto
      display flex
      margin 0

      .nav-item
        margin-left 20px

        a
          font-family "Poppins", "Helvetica Neue", Arial, sans-serif
          // color lighten(#3eaf7c, 30%)
          font-size: 20px;
          text-decoration: none;
          letter-spacing: -1.67px;


@media (max-width: $MQMobile)
  #header, #nav_toggle
    padding 10px
  .header-wrapper
    .header-right-wrap
      display none
    .logo
      display none
</style>
