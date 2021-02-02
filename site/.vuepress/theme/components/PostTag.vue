<template>
  <li class="post-tag">
    <router-link :to="getLink(tag)">
      {{ tag }}
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
  display inline-block
  position relative
  background black //lightGrey
  transition none
  border none
  margin-right 0
  margin-bottom 1rem
  padding 0 0.5rem
  line-height 1.2
  a, span
    display inline-block
    box-sizing border-box
    margin 0
    border none
    padding 0.5rem
    line-height inherit
    color $textColor
    font-size typeScale.i
    font-weight 300
    text-decoration none
  a:hover
    color: $tandemPink
</style>
