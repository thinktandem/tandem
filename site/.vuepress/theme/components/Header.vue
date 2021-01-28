<template>
  <header
    id="header"
  >
    <nav
      id="nav"
      class="nav-primary"
    >
      <div
        class="title"
      >
        <NavLink
          link="/"
          class="home-link"
        >
          <TandemLogo />
          <div
            class="site-title"
          >
            {{ $site.title }}
          </div>
        </NavLink>
      </div>
      <HamburgerButton
        :is-open="isOpen"
        @toggle-sidebar="toggleSidebar($event)"
      />
      <div
        id="menu"
        class="menu"
      >
        <ul
          v-if="$themeConfig.nav"
          class="nav"
        >
          <li
            v-for="item in $themeConfig.nav"
            :key="item.text"
            class="nav-item"
          >
            <NavLink :link="item.link">
              {{ item.text }}
            </NavLink>
            <div
              v-if="isOpen"
              class="nav-item-desc"
            >
              {{ item.desc }}
            </div>
          </li>
        </ul>
        <div
          id="menu-secondary"
          class="menu-secondary"
        >
          <div
            class="links"
          >
            <NavLink
              link="/careers/"
            >
              Careers
            </NavLink>
            <NavLink
              link="https://handbook.thinktandem.io"
            >
              Handbook
            </NavLink>
            <NavLink
              link="https://twitter.com/thinktandem"
            >
              Twitter
            </NavLink>
            <NavLink
              link="https://github.com/thinktandem"
            >
              GitHub
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
// import TandemLogo from '@theme/components/TandemLogo';
import TandemLogo from '@theme/components/TandemLogo';
import HamburgerButton from '@theme/components/HamburgerButton';
export default {
  components: {
    TandemLogo,
    HamburgerButton,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      navFade: 50,
      lastScrollPos: 0,
    };
  },
  watch: {
    isOpen() {
      if (this.isOpen) {
        this.expandMenu();
        this.resetHeader();
      } else {
        this.hideHeader();
      };
    },
  },
  beforeDestroy() {
    // Remove the scroll event
    window.removeEventListener('scroll', this.onScroll);
  },
  mounted() {
    // Add a scroll watcher
    window.addEventListener('scroll', this.onScroll, {
      capture: true,
      passive: true,
    });
    this.lastScrollPos = window.pageYOffset;
  },
  methods: {
    toggleSidebar() {
      // Moved this to methods, since I thought
      // I may wanna "do more stuff, but so far no"
      this.$emit('toggle-sidebar');
    },
    expandMenu() {
      this.classChange('header', ['open']);
    },
    hideHeader() {
      this.classChange('header', ['fadeout'], ['fadein', 'dehamburger']);
    },
    resetHeader(toggleable = false) {
      this.classChange('header', ['fadein'], ['fadeout']);
      this.classChange('nav_toggle', [], ['toggleout']);
      if (!this.isOpen) this.classChange('header', ['dehamburger'], ['open']);
    },
    hideToggle() {
      this.classChange('nav_toggle', ['toggleout'], ['togglein']);
    },
    showToggle() {
      this.classChange('nav_toggle', ['togglein'], ['toggleout']);
    },
    onScroll(e) {
      // If the menu is open then just stay with that
      if (this.isOpen) return;
      // Fade out header after 50
      if (window.top.scrollY > 50) this.hideHeader();
      // Reset to normal "top" of page configuration
      else this.resetHeader();
      // Handle the menu toggle UX after 100 px
      if (window.top.scrollY > 50) {
        // Show navtoggle on scroll up
        if (this.lastScrollPos > window.pageYOffset) this.showToggle();
        // And hide on scroll down
        else this.hideToggle();
      };
      // Reset the previous position
      this.lastScrollPos = window.pageYOffset;
    },
    classChange(id, add = [], remove = []) {
      const element = document.getElementById(id);
      element.classList.add(...add);
      element.classList.remove(...remove);
    },
  },
};
</script>

<style lang="stylus">
// Test
menu = @block
  position absolute
  box-sizing border-box
  transition-duration 0.5s
  transition-property top
  transition-timing-function cubic-bezier(0.25, 0.8, 0.25, 1)
  top -105vh
  height 100vh
  width 100%
  align-items center
  background-color #fff
  box-shadow 0 0rem 2.5rem rgba(black, 0.2)
  margin 0
  padding 8rem 2rem 2rem 3rem
  .nav
    width 100%
    margin 0
    padding 0
    .nav-item
      display: block
      margin 0 0 1rem 4.5rem
      padding 0
      .nav-link
        { displayType }
        display inline-block
        text-decoration none
        border none
        color $textColor
        font-size typeScale.f
        &:focus, &:hover, &:active, &.router-link-active
          color $tandemPink
        &:active
          outline none
      .nav-item-desc
        font-size typeScale.i
        white-space nowrap
  @media (min-width: $MQSmall)
    box-shadow none
    top 0
    flex-direction row
    height auto
    padding 3.25rem 0 0 0
    background-color transparent
    .nav
      width auto
      flex 0 0 auto
      display flex
      justify-content flex-end
      .nav-item
        margin-left: 0
        margin-right 2rem
        margin-bottom 1rem
        display inline-block
        text-align left
        padding-top 0.57 5rem
        .nav-link
          font-size typeScale.g
        .nav-item-desc
          { visuallyHidden }
      .nav-item:last-of-type
        margin-right 1rem

menuSecondary = @block
  display flex
  flex 1 100%
  flex-direction row
  flex-basis 100%
  .links
    padding-top 1em
    padding-left 0
    border-top 1px solid $borderColor
    flex 1 100%
    .nav-link
      { displayType }
      letter-spacing 0.025rem
      font-size typeScale.i
      text-decoration none
      margin-right 1rem
      color $textColor
      &:hover
        color $tandemPink
  @media (min-width: $MQSmall)
    .links
      display flex
      justify-content flex-end
      padding-left 0
      { visuallyShown }
      border-top none !important
#header
  z-index 100
  position fixed
  width 100vw
  top 0cta
  box-sizing border-box
  background-color transparent
  display flex
  transition-property padding background-color
  transition-duration 0.25s
  transition-timing-funciton ease-out
  &.fadeout, &.dehamburger.fadein:not(.open)
    .menu
      top -106vh
  &.fadein
    .menu
      top: 0
  &.open
    .nav-primary
      height 100vh
      background-color transparent
      display block
      flex-wrap wrap
      @media (min-width: $MQLarge)
        .menu
          justify-content center
  .title
    { logoDimensions }
    padding 2rem 0 2rem 2rem
    position relative
    z-index 50
    @media (min-width: $MQSmall)
      padding 2rem 0 2rem 3rem
  .site-title
    { visuallyHidden }
  .nav-primary
    width 100vw
    position relative
    display flex
    @media (min-width: $MQSmall)
      .menu
        padding-right 3rem
        padding-left 30vw
  .menu
    { menu }
  .menu-secondary
    { menuSecondary }
  .hamburger
    top 2rem
    left 1.675rem
    opacity 1
  @media (min-width: $MQSmall)
    .hamburger
      top 2rem
      left 2.675rem
    &.fadein:not(&.dehamburger)
      background-color #eee
      box-shadow 0 -0.25rem 1rem rgba(0, 0, 0, 0.4)
    &.dehamburger.fadein, &.dehamburger.fadein:not(.open)
      .menu
        top 2.525rem
        padding-top 0.625rem
    &.fadein
      .menu
        height 4rem
        top 0.625rem
        // padding-top 2.25rem
      .nav .nav-item .nav-item-desc
        display block
        { visuallyShown }
        font-size typeScale.i
      .nav-primary
        height 9.5rem
    &.open.fadein
      padding 2rem
      background-color #eee
      box-shadow 0 -0.25rem 1rem rgba(0, 0, 0, 0.4)
      .menu
        padding-top 2.575rem
      .menu-secondary
        { visuallyShown }
    &.dehamburger
      .menu
        top 2.625rem
        padding-top 0
      .hamburger
        pointer-events none
        opacity 0
    &.open
      .nav-primary
        height 9.5rem
  @media (min-width: $MQLarge)
    &.fadeout
      .menu
        top -12rem
</style>
