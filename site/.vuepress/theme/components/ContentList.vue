<template>
  <div
    id="content-list-layout"
    class="content-list-layout"
  >
    <component
      :is="page.id === 'work' ? 'WorkSummary' : 'PostSummary'"
      v-for="page in pages"
      :key="page.key"
      :page="page"
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    />
    <div
      v-if="(this.$pagination.paginationIndex + 1) < this.$pagination.length"
      class="load-more"
      @click="more"
    >
      <button
        class="btn btn-load-more"
      >
        {{ moreText }}
      </button>
    </div>
  </div>
</template>

<script>
import PostSummary from '@theme/components/PostSummary.vue';
import WorkSummary from '@theme/components/WorkSummary.vue';

export default {
  components: {PostSummary, WorkSummary},
  props: {
    sortOrder: {
      type: Array,
      default: () => ([]),
    },
    moreText: {
      type: String,
      default: 'Load more stuff',
    },
  },
  data() {
    return {
      paginationComponent: null,
      pages: [],
    };
  },
  mounted() {
    this.pages = this.sort(this.$pagination.pages);
    this.$router.afterEach(() => {
      if (this.$pagination) this.pages = this.sort(this.$pagination.pages);
    });
  },
  methods: {
    more() {
      this.$pagination.paginationIndex++;
      let next = this.$pagination._paginationPages[this.$pagination.paginationIndex];
      let nextPages = this.$pagination._matchedPages.slice(next.interval[0], next.interval[1] + 1);
      for (let i = 0; i < nextPages.length; i++) this.pages.push(nextPages[i]);
    },
    sortByType(a, b) {
      if (this.sortOrder.indexOf(a.id) > this.sortOrder.indexOf(b.id)) {
        return 1;
      } else if (this.sortOrder.indexOf(a.id) < this.sortOrder.indexOf(b.id)) {
        return -1;
      } else {
        return 0;
      }
    },
    sort(data) {
      return data.sort(this.sortByType);
    },
  },

};
</script>

<style lang="stylus">
.content-list-layout
  .section-header
    border 0
  .load-more
    text-align center
    background $lightGrey
    padding 1em
    color $darkTextColor
    margin 0em
    cursor pointer
    font-family "Poppins", "Helvetica Neue", Arial, sans-serif
    button
      all unset
  .written-by, .work-for
    border 0
</style>
