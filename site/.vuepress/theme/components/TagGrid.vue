<template>
  <div class="tag-container">
    <div class="tag-item tag-third">
      <a href="/tag/strategy"><h2>Strategy.</h2></a>
      <ul>
        <li>Business</li>
        <li>Branding</li>
        <li>User Research</li>
        <li>Content Strategy</li>
        <li>SEO</li>
      </ul>
    </div>
    <div class="tag-item tag-third">
      <h2>Design.</h2>
      <ul>
        <li>Accessibility</li>
        <li>Responsive</li>
        <li>Wireframes</li>
        <li>Styleguides</li>
        <li>Protyping</li>
      </ul>
    </div>
    <div class="tag-item tag-third">
      <h2>Development.</h2>
      <ul>
        <li>Performance</li>
        <li>Security</li>
        <li>Migrations</li>
        <li>Support</li>
        <li>Training</li>
      </ul>
    </div>
    <div class="tag-item tag-full-columns">
      <h2>Technology.</h2>
      <ul>
        <li>PHP</li>
        <a href="/tag/drupal"><li>Drupal</li></a>
        <li>WordPress</li>
        <li>Laravel</li>
        <li>Symfony</li>
      </ul>
      <ul>
        <li>Javascript</li>
        <li>Node</li>
        <li>Vue</li>
        <li>Nuxt</li>
        <li>Electron</li>
      </ul>
      <ul>
        <li>DevOps</li>
        <li>Docker</li>
        <li>Lando</li>
      </ul>
    </div>
    <div class="tag-item tag-full">
      <h2>Industry.</h2>
      <ul>
        <li>Finance</li>
        <li>Healthcare</li>
        <li>Higher Ed</li>
        <li>Tech</li>
        <li>Media</li>
        <li>Non Profit</li>
      </ul>
    </div>
    <div class="tag-item tag-full">
      <h2>Other.</h2>
      <ul>
        <li>Training</li>
        <li>Support</li>
        <li>Business</li>
        <li>Thing</li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TagGrid',
  mounted() {
    console.log(this);
  },
};
</script>

<style lang="stylus" scoped>
.tag-container
  display flex
  flex-wrap wrap
  justify-content space-between
  width 100%
  .tag-item
    position relative
    background $lightGrey
    text-align left
    padding 0
    h2
      margin .5em .5em
      font-size 1.5em
      font-weight 600
      letter-spacing -1.68px
      line-height inherit
    ol, ul
      list-style none
      padding-left 0
      li
        border-bottom solid 1px darken($borderColor, 10%)
        margin 1em 1em
        font-weight 300
        font-size 1.13rem
        letter-spacing -1.44px
        font-family "Poppins", "Helvetica Neue", Arial, sans-serif
        color $middleGrey
    &.tag-third
      width 32%
      @media (max-width: $MQMobile)
        width 100%
        margin-top 1em
    &.tag-full, &.tag-full-columns
      width 100%
      margin-top 1em
      display flex
      ul
        display flex
        width 100%
        justify-content space-evenly
      @media (max-width: $MQMobile)
        display block
        ul
          display block
          text-align left
    &.tag-full
      ul
        justify-content flex-end
        li
          margin-right 10px
      h2
        align-self center
    &.tag-full-columns
      ul
        display block
        text-align right
        margin-right 1em
        @media (max-width: $MQMobile)
          text-align left
</style>
