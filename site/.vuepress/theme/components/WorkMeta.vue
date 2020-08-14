<template>
  <div
    v-if="name"
    class="post-meta-author"
    itemprop="publisher author"
    itemtype="http://schema.org/Organization"
    itemscope
  >
    <div class="work-for">
      Awesome stuff done for <a
        :href="link"
        target="_blank"
        itemprop="name"
      >{{ name }}</a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WorkMeta',
  props: {
    id: {
      type: String,
      required: true,
      default: '../',
    },
    name: {
      type: String,
      default: 'Tandem',
    },
    link: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="stylus" scoped>
.work-for
  font-size .85em
  padding-bottom: 1rem
  border-bottom 1px solid $borderColor
</style>
