<template>
  <div
    id="tandem-content"
    ref="content"
    class="layout-layout content-wrapper-tandem"
  >
    <PostList
      v-if="$pagination"
      :title="tagTitle"
    />
    <Content v-else />
  </div>
</template>

<script>
import PostList from '@theme/components/PostList.vue';

export default {
  components: {PostList},
  computed: {
    tagTitle() {
      if (!this.$currentTag) {
        return 'all';
      } else {
        return this.$currentTag.key;
      }
    },
  },
};
</script>

<style lang="stylus">
</style>
