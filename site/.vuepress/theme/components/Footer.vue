<template>
  <footer id="footer">
    <div class="footer-container">
      <div class="footer-copyright">
        <
        <span class="copyright">© 2021</span> Tandem
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
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="stylus">
#footer
  background-color white
.footer-container
  padding 3em 0em
  display flex
  max-width 1140px
  margin auto
  border-top 1px solid $borderColor
  background-color white
  .footer-copyright, .footer-links
    padding 0
    margin 0
  .footer-copyright
    width 32%
    text-align left
    font-size typeScale.small
    align-self center
    .copyright
      color $tandemPink
      font-weight 900
  .footer-links
    width 70%
    text-align right
    a
      { displayType }
      text-decoration none

    .menu-primary
      a
        { displayType }
        font-size typeScale.g
        color $tandemGrey
        &:hover
          color $tandemPink
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
      margin-right -12px
      a
        font-size typeScale.small
        margin-left 0
        color $middleGrey
        &:after
          content '\00a0\00a0'
        &:before
          content '\00a0\00a0'
        &:hover
          color $tandemPink
          &:after
            content: " ]"
          &:before
            content: "[ "
@media (max-width $MQMobile)
  .footer-container
    flex-direction column-reverse
    margin auto 0.5em
    .footer-copyright, .footer-links
      flex 1 1
      text-align center
      margin auto
      padding 0 0.5em
    .footer-copyright
      margin-top 25px
      width 75%
      font-size typeScale.small
    .footer-links
      width 75%
      .menu-primary
        ul
          justify-content center
          margin-left -1.25rem
          li
            margin-left 1.25rem
      .menu-secondary
        margin 25px 0 0
        a
          font-size typeScale.small
          line-height 2
@media (max-width $MQMobileNarrow)
  .footer-container
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
