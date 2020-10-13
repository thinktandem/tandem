<template>
  <div class="tag-container">
    <div class="tag-item tag-third">
      <a :href="`${prefix}strategy`"><h2>Strategy.</h2></a>
      <ul
        v-for="(tagGroup, index) in strategy"
        :key="index"
      >
        <a
          v-for="tag in tagGroup"
          :key="tag.tag"
          :href="`${prefix}${tag.tag}`"
        ><li>{{ tag.name }}</li></a>
      </ul>
    </div>
    <div class="tag-item tag-third">
      <a :href="`${prefix}design`"><h2>Design.</h2></a>
      <ul
        v-for="(tagGroup, index) in design"
        :key="index"
      >
        <a
          v-for="tag in tagGroup"
          :key="tag.tag"
          :href="`${prefix}${tag.tag}`"
        ><li>{{ tag.name }}</li></a>
      </ul>
    </div>
    <div class="tag-item tag-third">
      <a :href="`${prefix}development`"><h2>Development.</h2></a>
      <ul
        v-for="(tagGroup, index) in development"
        :key="index"
      >
        <a
          v-for="tag in tagGroup"
          :key="tag.tag"
          :href="`${prefix}${tag.tag}`"
        ><li>{{ tag.name }}</li></a>
      </ul>
    </div>
    <div class="tag-item tag-full">
      <h2>Industry.</h2>
      <ul
        v-for="(tagGroup, index) in industry"
        :key="index"
      >
        <a
          v-for="tag in tagGroup"
          :key="tag.tag"
          :href="`${prefix}${tag.tag}`"
        ><li>{{ tag.name }}</li></a>
      </ul>
    </div>
    <div class="tag-item tag-full-columns">
      <h2>Technology.</h2>
      <ul
        v-for="(tagGroup, index) in technology"
        :key="index"
      >
        <a
          v-for="tag in tagGroup"
          :key="tag.tag"
          :href="`${prefix}${tag.tag}`"
        ><li>{{ tag.name }}</li></a>
      </ul>
    </div>

    <div class="tag-item tag-full">
      <h2>Other.</h2>
      <ul
        v-for="(tagGroup, index) in other"
        :key="index"
      >
        <a
          v-for="tag in tagGroup"
          :key="tag.tag"
          :href="`${prefix}${tag.tag}`"
        ><li>{{ tag.name }}</li></a>
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
    a
      text-decoration none
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
        border-bottom solid 1px $borderColor
        :hover
          color $tandemPink
          transition all .2s
      li
        border-bottom solid 1px $borderColor
        margin 1.5em 2em
        font-weight 300
        font-size 1.13rem
        letter-spacing -1.44px
        font-family "AvenirNext", "Helvetica Neue", Arial, sans-serif
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
          li
            margin 1.5em 1em
            margin-right 30px

    &.tag-full
      ul
        justify-content flex-end
        a
          border none
        li
          margin-right 10px
          border none
          text-decoration none
      h2
        align-self center
      @media (max-width: $MQMobile)
        ul
          li
            margin 1.5em 1em
            margin-right 30px
            border-bottom solid 1px $borderColor
    &.tag-full-columns
      ul
        display block
        text-align right
        margin-right 1em
        @media (max-width: $MQMobile)
          text-align left
</style>
