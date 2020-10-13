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
      v-if="(this.paginationIndex * this.paginator) < this.$pagination.pages.length"
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
    moreText: {
      type: String,
      default: 'Load more stuff',
    },
    paginator: {
      type: Number,
      default: 5,
    },
    sortOrder: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      paginationComponent: null,
      paginationIndex: 1,
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
      this.paginationIndex++;
      this.pages = this.sort(this.$pagination.pages);
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
      return data.sort(this.sortByType).slice(0, this.paginator * this.paginationIndex);
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
    padding 1em
    color $tandemPink
    cursor pointer
    font-family "AvenirNext", "Helvetica Neue", Arial, sans-serif
    button
      all unset
      display inline-block
      width 50%
      margin 0 auto
      font-size 2em
      font-weight 900
      padding-bottom 0.333em
      border-bottom 0.333em $tandemPink solid
      padding-top 0.5em
      line-height 1.75
      transition-property background-color, width, color
      transition-duration 0.25s
      white-space nowrap
      &:hover
        width 100%
        color white
        background-color $tandemPink
  .written-by, .work-for
    border 0
</style>
