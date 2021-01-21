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
  &:not(:last-child)
    margin-right 10px
  a
    {tagWrapper}
</style>
