<template>
  <footer id="footer" class="site__footer">
    <div class="copyright">
      © 2021 Tandem
    </div>
    <div class="footer-links">
      <div
        class="menu-primary"
      >
        <ul
          v-if="$themeConfig.nav"
        >
          <li
            v-for="item in $themeConfig.nav"
            :key="item.text"
          >
            <NavLink :link="item.link">
              {{ item.text }}
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        class="menu-secondary"
      >
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
        <NavLink link="/terms/">
          Terms of Use
        </NavLink>
        <NavLink link="/privacy/">
          Privacy Policy
        </NavLink>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="stylus">
.site__footer
  padding 3rem 2rem
  background-color white
  border-top 1px solid $borderColor
  a
    { displayType }
    text-align left
    text-decoration none
  .copyright, .footer-links
    padding 0
    margin 0
  .copyright
    width 30vw
    margin-bottom 1rem
    white-space nowrap
    font-size typeScale.tiny
  .menu-primary
    a
      { displayType }
      font-size typeScale.h
      color $textColor
      &:hover
        color $textColor
    ol, ul
      list-style none
      margin 0
      padding 0
    ul
      display flex
      justify-content flex-start
      li
        margin-right 1rem
  .menu-secondary
    margin-top .5em
    .nav-link
      display inline-block
      font-size typeScale.tiny
      position relative
      left -0.75rem
      margin-left 0
      color $middleGrey
      white-space nowrap
      &::before, &::after
        display inline-block
        width 0.5rem
        content '\00a0\00a0'
      &:hover
        color $tandemPink
        &::after
          content " ]"
        &::before
          content "[ "
  @media (min-width: $MQNarrow)
    display flex
    a
      text-align right
    .copyright, .footer-links
      text-align left
    .copyright
      { displayType }
      margin-bottom 0
      padding-top 0.5875rem
    .footer-links
      width 70vw
    .menu-primary ul, .menu-secondary
      justify-content flex-end
      text-align right
    .menu-primary
      li
        margin-right 0
        margin-left 1rem
      .nav-link
        font-size typeScale.g
    .menu-secondary
      display flex
      justify-content flex-end
        a
          font-size typeScale.f
</style>
