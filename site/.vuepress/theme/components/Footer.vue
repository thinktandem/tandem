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
    font-family "GalaxieCopernicus", PT Serif, Serif
    color $tandemGrey
    font-size .8em
    align-self center
    .copyright
      color $tandemPink
      font-weight 900
  .footer-links
    width 70%
    text-align right
    a
      font-family "Poppins", "Helvetica Neue", Arial, sans-serif
      text-decoration none

    .menu-primary
      a
        font-size 20px
        letter-spacing -1.67px
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
      a
        font-size .86em
        text-transform uppercase
        margin-left 1em
        color lighten($darkTextColor, 15%);
        &:hover
          color $tandemPink
@media (max-width $MQMobile)
  .footer-container
    flex-direction column-reverse

    .footer-copyright, .footer-links
      flex 1 1
      text-align center
      margin auto
      padding 1em 2em
    .footer-links
      .menu-primary
        ul
          justify-content center
          margin-left -20px
          li
            margin-left 20px
</style>
