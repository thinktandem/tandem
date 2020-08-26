<template>
  <div class="tag-container">
    <div class="tag-item tag-third">
      <a href="/strategy"><h2>Strategy.</h2></a>
      <ul
        v-for="(tagGroup, index) in strategy"
        :key="index"
      >
        <a
          v-for="tag in tagGroup"
          :key="tag.tag"
          :href="`/${tag.tag}`"
        ><li>{{ tag.name }}</li></a>
      </ul>
    </div>
    <div class="tag-item tag-third">
      <a href="/design"><h2>Design.</h2></a>
      <ul
        v-for="(tagGroup, index) in design"
        :key="index"
      >
        <a
          v-for="tag in tagGroup"
          :key="tag.tag"
          :href="`/${tag.tag}`"
        ><li>{{ tag.name }}</li></a>
      </ul>
    </div>
    <div class="tag-item tag-third">
      <a href="/development"><h2>Development.</h2></a>
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
        <a href="/drupal"><li>Drupal</li></a>
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
  data() {
    return {
      strategy: [[
        {name: 'Business', tag: 'business'},
        {name: 'Branding', tag: 'branding'},
        {name: 'User Research', tag: 'user-research'},
        {name: 'Content Strategy', tag: 'content-strategy'},
        {name: 'SEO', tag: 'seo'},
      ]],
      design: [[
        {name: 'Accessibility', tag: 'business'},
        {name: 'Responsive', tag: 'branding'},
        {name: 'Wireframes', tag: 'user-research'},
        {name: 'Styleguides', tag: 'content-strategy'},
        {name: 'Protyping', tag: 'seo'},
      ]],
      development: [[
        {name: 'Performance', tag: 'business'},
        {name: 'Branding', tag: 'branding'},
        {name: 'User Research', tag: 'user-research'},
        {name: 'Content Strategy', tag: 'content-strategy'},
        {name: 'SEO', tag: 'seo'},
      ]],
      technology: [
        [
          {name: 'Business', tag: 'business'},
          {name: 'Branding', tag: 'branding'},
          {name: 'User Research', tag: 'user-research'},
          {name: 'Content Strategy', tag: 'content-strategy'},
          {name: 'SEO', tag: 'seo'},
        ],
        [
          {name: 'Business', tag: 'business'},
          {name: 'Branding', tag: 'branding'},
          {name: 'User Research', tag: 'user-research'},
          {name: 'Content Strategy', tag: 'content-strategy'},
          {name: 'SEO', tag: 'seo'},
        ],
        [
          {name: 'Business', tag: 'business'},
          {name: 'Branding', tag: 'branding'},
          {name: 'User Research', tag: 'user-research'},
          {name: 'Content Strategy', tag: 'content-strategy'},
          {name: 'SEO', tag: 'seo'},
        ],
      ],
      industry: [[
        {name: 'Business', tag: 'business'},
        {name: 'Branding', tag: 'branding'},
        {name: 'User Research', tag: 'user-research'},
        {name: 'Content Strategy', tag: 'content-strategy'},
        {name: 'SEO', tag: 'seo'},
      ]],
      other: [[
        {name: 'Business', tag: 'business'},
        {name: 'Branding', tag: 'branding'},
        {name: 'User Research', tag: 'user-research'},
        {name: 'Content Strategy', tag: 'content-strategy'},
        {name: 'SEO', tag: 'seo'},
      ]],
    };
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
    a
      :hover
        color $tandemPink
        transition all .2s
    h2
      margin 1em
      font-size 1.5em
      font-weight 600
      letter-spacing -1.68px
      line-height inherit
    ol, ul
      list-style none
      padding 0em .5em
      a
        text-decoration none
        border-bottom solid 1px darken($borderColor, 10%)
        :hover
          color $tandemPink
          transition all .2s
      li
        border-bottom solid 1px darken($borderColor, 10%)
        margin 1.5em 2em
        font-weight 300
        font-size 1.13rem
        letter-spacing -1.44px
        font-family "Poppins", "Helvetica Neue", Arial, sans-serif
        color $middleGrey
    &.tag-third
      width 32%
      padding-bottom 1em
      li
        margin 1.5em 1em
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
          border none
      h2
        align-self center
      @media (max-width: $MQMobile)
        ul
          li
            border-bottom solid 1px darken($borderColor, 10%)
    &.tag-full-columns
      ul
        display block
        text-align right
        margin-right 1em
        @media (max-width: $MQMobile)
          text-align left
</style>
