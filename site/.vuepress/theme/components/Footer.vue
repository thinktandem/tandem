<template>
  <div id="footer">
    <div class="footer-top">
      <div class="inner">
        <div class="footer-image">
          <svg version="1.1"
            baseProfile="full"
            xmlns="http://www.w3.org/2000/svg"
            height="200" width="200">
            <circle cx="100" cy="100" r="50" fill="#ed3f7a"></circle>
          </svg>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div>
        <a target="_blank" href="https://twitter.com/thinktandem">Follow us</a> |
        <a target="_blank" href="https://github.com/thinktandem">GitHub</a> |
        <a target="_blank" href="https://docs.thinktandem.io">Documentation</a>
      </div>
      <div>
        <a href="/terms/">Terms</a> |
        <a href="/privacy/">Privacy Policy</a>
      </div>
    </div>
    <div class="footer-copyright">Copyright © 2016-present Tandem</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
#footer
  background-color: white
  text-align: center
  .footer-top
    padding: 2em
    border-top: 1px dashed lighten($landoGrey, 80%)
    max-width: $contentWidth
    margin: auto
    background-color: white
  .footer-bottom
    max-width: $contentWidth
    margin: auto
    text-align: center
    padding-bottom: 2em
    a
      color: $landoGrey
      font-family: "GalaxieCopernicus", PT Serif, Serif
  .footer-copyright
    background-color: lighten($landoGrey, 95%)
    color: lighten($landoGrey, 30%)
    padding: 1em
    margin: auto
    text-align: center
    font-family: "GalaxieCopernicus", PT Serif, Serif
</style>
