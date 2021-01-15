<template>
  <div class="tag-container">
    <div class="tag-item tag-third">
      <a :href="`${prefix}strategy`"><h2>Strategy</h2></a>
      <ul v-for="(tagGroup, index) in strategy" :key="index">
        <li v-for="tag in tagGroup" :key="tag.tag">
          <a :href="`${prefix}${tag.tag}`">{{ tag.name }}</a>
        </li>
      </ul>
    </div>
    <div class="tag-item tag-third">
      <a :href="`${prefix}design`"><h2>Design</h2></a>
      <ul v-for="(tagGroup, index) in design" :key="index">
        <li v-for="tag in tagGroup" :key="tag.tag">
          <a :href="`${prefix}${tag.tag}`">{{ tag.name }}</a>
        </li>
      </ul>
    </div>
    <div class="tag-item tag-third">
      <a :href="`${prefix}development`"><h2>Development</h2></a>
      <ul v-for="(tagGroup, index) in development" :key="index">
        <li v-for="tag in tagGroup" :key="tag.tag">
          <a :href="`${prefix}${tag.tag}`">{{ tag.name }}</a>
        </li>
      </ul>
    </div>
    <div class="tag-item tag-full">
      <h2>Industry</h2>
      <ul v-for="(tagGroup, index) in industry" :key="index">
        <li v-for="tag in tagGroup" :key="tag.tag">
          <a :href="`${prefix}${tag.tag}`">{{ tag.name }}</a>
        </li>
      </ul>
    </div>
    <div class="tag-item tag-full-columns">
      <h2>Technology</h2>
      <ul v-for="(tagGroup, index) in technology" :key="index">
        <li v-for="tag in tagGroup" :key="tag.tag">
          <a :href="`${prefix}${tag.tag}`">{{ tag.name }}</a>
        </li>
      </ul>
    </div>
    <div class="tag-item tag-full">
      <h2>Other</h2>
      <ul v-for="(tagGroup, index) in other" :key="index">
        <li v-for="tag in tagGroup" :key="tag.tag">
          <a :href="`${prefix}${tag.tag}`">{{ tag.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TagGrid',
  props: {
    prefix: {
      type: String,
      default: '/tag/',
    },
  },
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
        {name: 'Accessibility', tag: 'accessibility'},
        {name: 'Responsive', tag: 'responsive'},
        {name: 'Experience', tag: 'ux'},
        {name: 'Styleguides', tag: 'styleguides'},
      ]],
      development: [[
        {name: 'Performance', tag: 'performance'},
        {name: 'Security', tag: 'security'},
        {name: 'Migrations', tag: 'migrations'},
        {name: 'Support', tag: 'support'},
        {name: 'Training', tag: 'training'},
      ]],
      industry: [[
        {name: 'Finance', tag: 'finance'},
        {name: 'Healthcare', tag: 'healthcare'},
        {name: 'Higher Ed', tag: 'higher-ed'},
        // {name: 'Media', tag: 'media'},
        {name: 'Nonprofit', tag: 'non-profit'},
        {name: 'Tech', tag: 'tech'},
      ]],
      technology: [
        [
          {name: 'PHP', tag: 'php'},
          {name: 'Drupal', tag: 'drupal'},
          {name: 'WordPress', tag: 'wordpress'},
          {name: 'Laravel', tag: 'laravel'},
        ],
        [
          {name: 'Javascript', tag: 'javascript'},
          {name: 'Node', tag: 'node'},
          {name: 'Vue', tag: 'vue'},
          {name: 'Nuxt', tag: 'nuxt'},
          {name: 'Electron', tag: 'electron'},
        ],
        [
          {name: 'DevOps', tag: 'devops'},
          {name: 'Docker', tag: 'docker'},
          {name: 'Lando', tag: 'lando'},
        ],
      ],
      other: [[
        {name: 'Magic', tag: 'magic'},
        {name: 'Localdev', tag: 'localdev'},
        {name: 'Testing', tag: 'testing'},
        {name: 'Events', tag: 'events'},
        {name: 'Webinars', tag: 'webinar'},
      ]],
    };
  },
};
</script>

<style lang="stylus" scoped>

$tagMargins = 1em 1em
.tag-container
  display flex
  flex-wrap wrap
  justify-content space-between
  width 100%
  @media (max-width: $MQMobile)
    width 99%
  .tag-item
    position relative
    background $lightGrey
    text-align left
    padding 0
    margin-bottom: 2rem
    padding 2rem
    box-sizing border-box
    a
      display block
      color $textColor
      text-decoration none
      &:hover
        color $tandemPink
        transition all .2s
    h2
      font-size typeScale.f
      font-weight 600
      line-height inherit
      min-width 16rem
      margin 0
    ol, ul
      list-style none
      padding 0
      margin 0
      li
        padding: 1rem 2rem 1rem 0
        margin: 0
        font-size typeScale.h
        font-weight 300
        border-bottom solid 1px $boderColor
        color $middleGrey
        a
          :hover
            color $tandemPink
            transition all .2s
    &.tag-third
      width 32%
      @media (max-width: $MQMobile)
        width 100%
        margin-top 1em
    &.tag-full, &.tag-full-columns
      width 100%
      display flex
      ul
        display flex
        width 100%
        justify-content left
        li
          padding-top 1.4rem
      @media (max-width: $MQMobile)
        display block
        ul
          display block
          text-align left
    &.tag-full
      ul
        li
          border none
          text-decoration none
      h2
        align-self center
    &.tag-full-columns
      ul
        display block
        margin-right 1em
        padding-top 0
        li:first-of-type
          padding-top 0.2875rem

</style>
