<template>
  <li class="post-tag">
    <router-link :to="getLink(tag)">
      <span>{{ tag }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'PostTag',
  props: {
    tag: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
  },
  methods: {
    getLink(tag) {
      return (this.link) ? this.link : `/tag/${tag}`;
    },
  },
};
</script>

<style scoped lang="stylus">
.post-tag
  // height 26px
  &:not(:last-child)
    margin-right 10px
  a
    background-color $postTagBgColor
    border-radius 3px 0 0 3px
    padding 0.5rem 0.725rem 0.5rem 1.5rem
    position relative
    text-decoration none
    height 2.5rem
    font-size typeScale.h
    display inline-block
    white-space nowrap
    span
      color $postTagColor
      transition color 0.2s
    &:after
      position absolute
      right 0
      top 0
      background $bgColor
      border-bottom 1.125rem solid transparent
      border-left 0.875rem solid $postTagBgColor
      border-top 1.125rem solid transparent
      content ''
    &:hover
      background-color $accentColor
      &:after
        border-left-color $accentColor
      span
        color #fff
</style>
