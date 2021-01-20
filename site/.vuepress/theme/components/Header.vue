<template>
  <header id="header">
    <nav id="nav" class="nav-primary">
      <div class="title">
        <NavLink
          link="/"
          class="home-link"
        >
          <TandemLogo />
          <div class="site-title">{{ $site.title }}</div>
        </NavLink>
      </div>

      <HamburgerButton @click="$emit('toggle-sidebar')" />

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
          <div class="links">
            <NavLink link="/careers/">
              Careers
            </NavLink>
            <NavLink link="https://handbook.thinktandem.io">
              Handbook
            </NavLink>
            <NavLink link="https://twitter.com/thinktandem">
              Twitter
            </NavLink>
            <NavLink link="https://github.com/thinktandem">
              GitHub
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
//import TandemLogo from '@theme/components/TandemLogo';
import TandemLogo from '@theme/components/TandemLogo';
import HamburgerButton from '@theme/components/HamburgerButton';
import MenuIcon from 'vue-feather-icons/icons/MenuIcon';
import XIcon from 'vue-feather-icons/icons/XIcon';
export default {
  components: {
    TandemLogo,
    HamburgerButton,
    MenuIcon,
    XIcon
  },
  props: {
    isHamburgerVisible: {
      type: Boolean,
      required: false
    },
    isOpen: {
      type: Boolean,
      required: true,
    }
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
      }
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
    // Set to window.pageYOffset
    this.lastScrollPos = window.pageYOffset;
  },
  methods: {
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
      }

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

$nav-primary
  width 100vw
  position relative
  display flex
  @media (min-width $MQMobile)
    .menu
      display flex
      flex 1
      justify-content flex-end
      padding-right 2rem
    .menu-secondary
      { visuallyHidden }
      display none !important
  @media (min-width $MQLarge)
    .menu
      padding-right 3rem

$menu--primary
  position absolute
  box-sizing border-box
  transition-duration 0.5s
  transition-property top
  transition-timing-function cubic-bezier(0.25, 0.8, 0.25, 1)
  top -105vh
  height 100vh
  width 100%
  align-items center
  background-color #ffffff
  box-shadow 0 0rem 2.5rem rgba(black, 0.2)
  margin 0
  padding 11rem 2rem 2rem 2.625rem
  .nav
    width 100%
    margin 0
    padding 0
    .nav-item
      display: block
      margin 0 0 2rem 4.5rem
      font-size typeScale.f
      padding 0
      .nav-link
        { displayType }
        display inline-block
        text-decoration none
        border none
        color $textColor
        // border 1px #f00 solid
        &:focus, &:hover, &:active, &.router-link-active
          color $tandemPink
        &:active
          outline none
  @media (min-width $MQMobile)
    box-shadow none
    top 0
    flex-direction row
    height auto
    padding 2rem 0 0 0
    background-color transparent
    .nav
      width auto
      flex 0 0 auto
      display flex
      .nav-item
        margin-left: 0
        margin-right 2rem
        display inline-block
        text-align left
        padding-top 1.125rem
        .nav-item-desc
          { visuallyHidden }

$menu-secondary
  display flex
  flex 1 100%
  flex-direction row
  .links
    padding 1em
    border-top 1px solid $borderColor
    flex 1 100%
    a
      { displayType }
      font-size typeScale.h
      text-decoration none
      text-transform uppercase
      margin-left 1em
      color $middleGrey
      &:hover
        color $tandemPink

header
  z-index 100
  position fixed
  width 100vw
  top 0
  box-sizing border-box
  background-color transparent
  display flex
  &.fadeout
    .menu
      top -106vh
  &.fadein
    .menu
      top: 0
  &.open
    .nav-primary
      border 0.25rem solid #f00
      height 100vh
      background-color transparent
      flex-wrap border 1px #000 solid
    wrap
  .title
    { logoDimensions }
    padding 2rem 0 2rem 3rem
    z-index 20
  .site-title
    { visuallyHidden }
  .nav-primary
    @extends $nav-primary
  .menu
    @extends $menu--primary
  .menu-secondary
    @extends $menu-secondary
  .hamburger
    top 2rem
    left 2.675rem
    opacity 1
  @media (min-width $MQMobile)
    &.dehamburger
      .menu
        top 0rem
        padding-top 1.475rem
      .hamburger
        pointer-events none
        opacity 0
  @media (min-width $MQLarge)
    &.fadeout
      .menu
        top -8rem
      &.fadein
      &.open
        border 4px #000 solid
</style>
