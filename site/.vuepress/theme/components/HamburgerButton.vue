<template>
  <button id="nav_toggle"
    class="toggle collapsed hamburger"
    :class="isOpen? 'is-active' : ''"
    type="button"
    aria-controls="nav-collapse"
    aria-expanded="false"
    aria-label="Toggle navigation"
    @click="$emit('toggle-sidebar', $event)">
      <div class="hamburger-box">
        <div class="menu-toggle hamburger-inner"></div>
      </div>
  </button>
</template>

<script>
  export default {
    components: {
      name: "HamburgerButton"
    },
    props: {
      isOpen: {
        type: Boolean,
        required: true
      }
    },
  }
</script>

<style lang="stylus" scoped>
.hamburger
  position absolute
  z-index 50
  outline none
  top 2rem
  left 2.675rem
  width 3.5rem
  height 3.5rem
  border none
  display inline-block
  box-sizing border-box
  cursor pointer
  transition-property opacity, filter
  transition-duration 0.15s
  transition-timing-function linear
  font inherit
  color inherit
  text-transform none
  background-color transparent
  margin 0
  padding 0
  overflow visible
  &:focus, &:hover, &:active
    outline none
  &:hover
    opacity 0.8
  &.is-active
    &:hover
      opacity 1
    .hamburger-inner, .hamburger-inner::before, .hamburger-inner::after
      background-color white
.hamburger-box
  box-sizing border-box
  width 3.5rem
  height 3.5rem
  display block
.hamburger-inner
  display block
  position relative
  transform translate(-50%, -50%)
  top 50%
  left 50%
  width 1.75rem
  height 1.75rem
  transition-duration 0.275s
  transition-timing-function cubic-bezier(0.68, -0.55, 0.265, 1.55)
  &, &::before, &::after
    width 1.75rem
    height 0.25rem
    background-color white
    border-radius 0.25rem
    position absolute
    transition-property transform
    transition-duration 0.125s
    transition-timing-function cubic-bezier(0.175, 0.885, 0.32, 1.275)
  &::before
    top 0.575rem
    transition opacity 0.125s 0.275s ease
  &::after
    bottom 0.575rem
    color #000
    transition transform 0.275s cubic-bezier(0.68, -0.55, 0.265, 1.55)
  &::before, &::after
    content ""
    display block
&.is-active
  .hamburger-inner
    transform translate3d(-0.785rem, -0.125rem, 0) rotate(-135deg)
    transition-delay 0.075s
    &::before
      transition-delay 0s
      opacity 0
      transform translate3d(-0rem, -0.5675rem, 0) rotate(0)
    &::after
      transform translate3d(0, 9px, 0) rotate(270deg)
      transition-delay 0.075s
</style>
