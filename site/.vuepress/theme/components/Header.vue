<template>
  <header id="header">
    <nav id="nav" class="nav-primary">
      <style v-if="!isOpen">
        .nav-link {color: {{ color }};}
        .nav-link:hover {color: {{ hover }};}
        .nav-link.router-link-active {color: {{ active }};}
        .nav-link.home-link {color: {{ color }};}
        .nav-link.home-link:hover {color: {{ color }};}
        .nav-link.home-link.router-link-active {color: {{ color }};}
      </style>
      <div class="title">
        <NavLink
          link="/"
          class="home-link"
        >
          <TandemLogo />
          <div class="site-title">{{ $site.title }}</div>
        </NavLink>
      </div>
      <button
        id="nav_toggle"
        type="button"
        aria-label="Toggle navigation"
        class="toggle collapsed hamburger"
        aria-expanded="false"
        aria-controls="nav-collapse"
      >
        <component
          :is="isOpen ? 'XIcon' : 'MenuIcon'"
          class="menu-toggle"
          @click="$emit('toggle-sidebar')"
        />
      </button>

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
import MenuIcon from 'vue-feather-icons/icons/MenuIcon';
import XIcon from 'vue-feather-icons/icons/XIcon';
export default {
  components: {
    TandemLogo,
    MenuIcon,
    XIcon
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    active: {
      type: String,
      default: '#ed3f7a',
    },
    color: {
      type: String,
      default: '#47474a',
    },
    hover: {
      type: String,
      default: '#ed3f7a',
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

$hamburger-button
  border 0
  outline none
  padding 0
  margin 0
  position absolute
  background-color transparent
  z-index 30
  width typeScale.e
  height typeScale.e
  transition-property: top
  transition-duration: 0.5s
  transition-timing-function: ease-out
  &.toggleout
    .menu-toggle
      top -20rem
  &.togglein
    .menu-toggle
      top 2.75rem
  .menu-toggle
    color #ffffff
    width typeScale.e
    height typeScale.e
    position relative
    top 2.75rem
    left 2.5rem
    cursor pointer
  @media (min-width $MQMobile)
    display none

$nav-primary
  width 100vw
  position relative
  display flex

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
  background-color white
  box-shadow 0 0rem 2.5rem rgba(black, 0.2)
  margin 0
  padding 11rem 2rem 2rem 2rem
  .nav
    width 100%
    margin 0
    padding 0
    .nav-item
      display: block
      margin 0 0 2rem 4.5rem
      padding 0
      a
        { displayType }
        text-decoration none
        font-weight 900
        font-size typeScale.f
  @media (min-width $MQMobile)
    box-shadow none
    top 0
    flex-direction row
    height auto
    padding 2rem 0 0 0
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
      font-size typeScale.i
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
      height 100vh
      background-color transparent
      flex-wrap wrap
  .title
    { logoDimensions }
    padding 2rem
    z-index 20
  .site-title
    { visuallyHidden }
  .hamburger
    @extends $hamburger-button
  .nav-primary
    @extends $nav-primary
  .menu
    @extends $menu--primary
  .menu-secondary
    @extends $menu-secondary

  @media (min-width $MQMobile)
    &.dehamburger
      border 2px #000 solid
      .hamburger
        pointer-events none
      .menu-toggle
        display none
        color $tandemPink
    .nav-primary
      .menu
        display flex
        flex 1
        justify-content flex-end
      .menu-secondary
        { visuallyHidden }
// &.fadeout
    .menu
      top 0
    // &.fadein
    // &.open
    //   border 4px #000 solid
</style>
