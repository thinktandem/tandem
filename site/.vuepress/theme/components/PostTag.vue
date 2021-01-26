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

<style lang="stylus">
.post-tag
  { tagWrapper }
  margin-bottom 1rem
  .hot-tags &
    margin-right 1.25rem
    line-height 2
    padding 0
    a
      padding 0.25rem 0.325rem 0.25rem 0.325rem!important
  .case-study-layout &
    background-color transparent
    a
      display inline-block
      text-decoration none
      border 1px white solid
      border-right-width  1px
      border-left-width 1px
      &:hover, &:focus, &:active
        color black
        background-color white
      span
        display inline-block
        padding 1rem
    &::before, &::after
      display none
</style>
