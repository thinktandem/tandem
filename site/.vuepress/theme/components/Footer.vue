<template>
  <footer id="footer">
    <div class="footer-container">
      <div class="footer-copyright">
        <span class="copyright">© 2020</span> TANDEM
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
    letter-spacing -0.0265em
    line-height 1.265
    font-family "GalaxieCopernicus", PT Serif, Serif
    color $tandemGrey
    font-size .9em
    align-self center
    .copyright
      color $tandemPink
      font-weight 900
  .footer-links
    width 70%
    text-align right
    a
      font-family "AvenirNext", "Helvetica Neue", Arial, sans-serif
      text-decoration none

    .menu-primary
      a
        font-size inherit
        color $tandemGrey
        font-family "AvenirNext", "Helvetica Neue", Arial, sans-serif
        text-decoration none
        letter-spacing normal
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
        font-size .8em
        text-transform uppercase
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
      font-size .9em
    .footer-links
      width 75%
      .menu-primary
        ul
          justify-content center
          margin-left -20px
          li
            margin-left 20px
      .menu-secondary
        margin 25px 0 0
        a
          font-size .9em
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
