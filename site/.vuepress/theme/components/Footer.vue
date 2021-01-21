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
  background-color white
  padding 3rem 2rem
  display flex
  margin auto
  border-top 1px solid $borderColor
  .copyright, .footer-links
    padding 0
    margin 0
  .copyright
    { displayType }
    font-size typeScale.small
    color $tandemPink
    width 30vw
  .footer-links
    width 70vw
    a
      { displayType }
      text-align right
      text-decoration none

    .menu-primary
      a
        { displayType }
        font-size typeScale.g
        color $textColor
        &:hover
          color $textColor
      ol, ul
        list-style none
        margin 0
        padding 0
      ul
        display flex
        justify-content flex-end
        li
          margin-left 30px
    .menu-secondary
      margin-top .5em
      display flex
      justify-content flex-end
      .nav-link
        font-size typeScale.small
        margin-left 0
        color $middleGrey
        text-align right
        position relative
        left 0.75rem
        &::before, &::after
          display inline-block
          width 0.5rem
        &::after
          content '\00a0\00a0'
        &::before
          content '\00a0\00a0'
        &:hover
          color $tandemPink
          &::after
            content " ]"
          &::before
            content "[ "
@media (max-width $MQMobile)
  flex-direction column-reverse
  margin auto 0.5em
  .copyright, .footer-links
    flex 1 1
    justify-content flex-end
    text-align center
    margin auto
    padding 0 0.5em
  .copyright
    margin-top 25px
    font-size typeScale.small
  .footer-links
    .menu-primary
      ul
        justify-content center
        margin-left -1.25rem
        li
          margin-left 1.25rem
    .menu-secondary
      margin 25px 0 0 0
      a
        font-size typeScale.small
        line-height 2
@media (max-width $MQMobileNarrow)
  .footer-links
    .menu-primary
      ul
        justify-content center
        margin-left -10px
        li
          margin-left 15px
      a
        font-size 18px
</style>
