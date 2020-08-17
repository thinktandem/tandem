<template>
  <header id="header">
    <nav id="nav">
      <style v-if="!isOpen">
        .nav-link {color: {{ color }};}
        .nav-link:hover {color: {{ hover }};}
        .nav-link.router-link-active {color: {{ active }};}
        .home-link {color: {{ color }};}
      </style>
      <button
        id="nav_toggle"
        type="button"
        aria-label="Toggle navigation"
        class="toggle collapsed"
        aria-expanded="false"
        aria-controls="nav-collapse"
      >
        <svg
          version="1.1"
          class="logo"
          baseProfile="full"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          :aria-label="`${$siteTitle}: ${$site.description}`"
          height="100"
          width="100"
        >
          <title>{{ $siteTitle }}</title>
          <desc>{{ $site.description }}</desc>
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="#ed3f7a"
          />
        </svg>
        <component
          :is="isOpen ? 'XIcon' : 'MenuIcon'"
          class="menu-toggle"
          @click="$emit('toggle-sidebar')"
        />
      </button>
      <div class="left-title">
        <NavLink
          link="/"
          class="home-link"
        >
          {{ $site.title }}
        </NavLink>
      </div>
      <div class="right-title">
        <NavLink
          link="/"
          class="home-link"
        >
          {{ $site.title }}
        </NavLink>
      </div>
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
      </div>
    </nav>
  </header>
</template>

<script>
import {MenuIcon, XIcon} from 'vue-feather-icons';

export default {
  components: {MenuIcon, XIcon},
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
      default: '#000000',
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
    window.addEventListener('scroll', this.onScroll);
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
header
  z-index 100
  position fixed
  width 100vw
  top 0
  box-sizing border-box
  background-color transparent
  padding 20px
  margin auto
  transition all 1s cubic-bezier(0.25, 0.8, 0.25, 1)
  &.fadeout
    margin-top -600px
    transition margin-top 0.5s
    -webkit-transition margin-top 0.5s
  &.fadein
    margin-top 0
    transition margin-top 0.5s
    -webkit-transition margin-top 0.5s
    button
      &.togglein
        margin-top 0
  &.dehamburger
    button
      cursor pointer
      pointer-events none
      svg
      .menu-toggle
        color $tandemPink
        transition color 0.5s
        -webkit-transition color 0.5s
  &.open
    nav
      height 400px
      background-color transparent
      flex-wrap wrap
      button, .left-title, .right-title
        width 100%
      .home-link
        background-color $lightGrey
        padding 5px
      .menu
        margin-top 50px
        width 100vw
        background-color $lightGrey
        ul
          margin auto
          padding 100px 90px
          text-align center
          .nav-item
            margin 20px
            a
              font-size 1.67em
              letter-spacing -2.54px
              font-weight 600
            .nav-item-desc
              letter-spacing -1.04px

button
  border 0
  background-color transparent
  outline none
  padding 0
  margin 0
  position absolute
  display flex
  svg
    height 50px
    width 50px
    margin-right 0
    margin-top -3px
    circle
      transition fill 0.5s
      -webkit-transition fill 0.5s
    &.logo, &.menu-toggle
      position absolute
    &.menu-toggle
      cursor pointer
      color #ffffff
      height 30px
      width 30px
      top 10px
      left 10px
      display none
      transition color 0.5s, color 0.5s
      -webkit-transition color 0.5s, color 0.5s
  &.toggleout
    margin-top -600px
    transition margin-top 0.5s
    -webkit-transition margin-top 0.5s
  &.togglein
    margin-top 600px
    transition margin-top 0.5s
    -webkit-transition margin-top 0.5s
    svg
      &.menu-toggle
        display block

.fp-enabled
  .greybeard
    svg
      circle
        fill $lightGrey
      &.menu-toggle
        color black

nav
  display flex
  line-height 40px
  height 40px

  ol, ul
    list-style none
    margin 0
    padding 0
  .left-title, .right-title
    font-size 30px
    letter-spacing 2px
    display block
    text-transform uppercase
    a
      font-weight bold
      font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
      text-decoration none

  .right-title
    display none
  .left-title
    position absolute
    margin-left 50px
  .menu
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

@media (min-width: $MQSmall)
  header
    &.open
      nav
        .menu
          ul
            .nav-item
              margin 32px
              a
                font-size 2.5em

@media (max-width: $MQMobile)
  header
    padding 10px
    &.dehamburger
      button
        pointer-events all
        svg
        .menu-toggle
          color #ffffff
    &.open
      nav
        .right-title
          flex none
        .menu
          display flex
          margin-top 10px
          ul
            flex-direction column
            padding 50px 20px
            .nav-item
              margin 10px

  nav
    .menu
      display none
    .left-title
      display none
    .right-title
      flex 1
      display flex
      justify-content flex-end
      align-items center
  button
    &.toggle
      display flex
      svg.menu-toggle
        display block

</style>
