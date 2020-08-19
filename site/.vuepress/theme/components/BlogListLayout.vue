<template>
  <div
    id="blog-list-layout"
    class="blog-list-layout"
  >
    <div
      class="posts"
      itemscope
      itemtype="http://schema.org/Blog"
    >
      <article
        v-for="page in pages"
        :key="page.key"
        class="post"
        itemprop="blogPost"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <meta
          itemprop="mainEntityOfPage"
          :content="resolveLink(page)"
        >

        <header
          itemprop="name headline"
        >
          <NavLink
            class="post-title"
            :link="resolveLink(page)"
          >
            {{ page.title }}
          </NavLink>
          <PostMeta
            v-if="page.frontmatter.author"
            :id="page.frontmatter.id"
            :name="page.frontmatter.author"
            :date="page.frontmatter.date"
            :link="page.frontmatter.link"
            :location="page.frontmatter.location"
            :pic="page.frontmatter.pic"
            pic-align="left"
          />
          <WorkMeta
            v-else-if="page.frontmatter.org || page.frontmatter.client"
            :id="page.frontmatter.org || page.frontmatter.client"
            :name="page.frontmatter.org || page.frontmatter.client"
            :link="page.frontmatter.link"
          />
        </header>

        <client-only>
          <!-- eslint-disable vue/no-v-html -->
          <p
            v-if="page.excerpt"
            class="post-summary"
            itemprop="description"
            v-html="page.excerpt"
          />
          <p
            v-else
            class="post-summary"
            itemprop="description"
            v-html="page.frontmatter.summary || page.summary"
          />
          <!-- eslint-enable vue/no-v-html -->
        </client-only>

        <footer>
          <div
            v-if="page.frontmatter.tags"
            class="post-meta post-tag"
            itemprop="keywords"
          >
            <TagIcon />
            <router-link
              v-for="tag in resolvePostTags(page.frontmatter.tags)"
              :key="tag"
              :to="'/tag/' + tag"
            >
              {{ tag }}
            </router-link>
          </div>
        </footer>
      </article>
    </div>

    <div
      v-if="(this.$pagination.paginationIndex + 1) < this.$pagination.length"
      class="load-more"
      @click="more"
    >
      <button
        class="btn btn-load-more"
      >
        Load more <strong>stuff</strong>
      </button>
    </div>
  </div>
</template>

<script>
import {TagIcon} from 'vue-feather-icons';
import PostMeta from '@theme/components/PostMeta.vue';
import WorkMeta from '@theme/components/WorkMeta.vue';

export default {
  components: {PostMeta, TagIcon, WorkMeta},
  props: {
    sortOrder: {
      type: Array,
      default: () => ([]),
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
      this.pages = this.sort(this.pages);
    },
    resolveLink(page) {
      return (page.frontmatter.link2Original) ? page.frontmatter.originalLink : page.path;
    },
    resolvePostTags(tags) {
      if (!tags || Array.isArray(tags)) return tags;
      return [tags];
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
.blog-list-layout
  .section-header
    border 0
  .load-more
    text-align center
    background $lightGrey
    padding 1em
    color $darkTextColort
    margin 2em 0em
    cursor pointer
    font-family "Poppins", "Helvetica Neue", Arial, sans-serif
    button
      all unset

  .post
    padding-bottom 25px
    margin-bottom 50px
    padding-top 50px
    margin-top 50px
    border-top 1px solid $borderColor

    &:last-child
      border-botton 1px solid $borderColor
      margin-bottom 0px

  .post-title
    font-size 2.57em
    font-weight 600
    letter-spacing -0.0987654321em
    margin-top 0
    border-bottom 0
    font-family "Poppins", "Helvetica Neue", Arial, sans-seri
    color $textColor
    cursor pointer
    transition all 0.2s
    text-decoration none

    &:hover
      color $accentColor
      text-decoration none

  .post-summary
    font-size 14px
    color $landoGrey
    font-weight 300
    font-size 1.14rem
    line-height 2
    letter-spacing -1.04px
    margin-bottom 2em

  .post-meta
    display inline-flex
    align-items center
    font-size 12px
    line-height 12px

    &:not(:last-child)
      margin-bottom 3px
      margin-right 20px

    svg
      margin-right 5px
      width 14px
      height 14px

    @media (max-width: $MQMobile)
      display flex

      &:not(:last-child)
        margin-bottom 10px

  .post-author
    color rgba($darkTextColor, 0.84)
    font-weight 400

  .post-date
    color rgba($darkTextColor, 0.54)
    font-weight 200

  .post-tag
    color rgba($darkTextColor, 0.54)
    font-weight 200
    font-family "Poppins", "Helvetica Neue", Arial, sans-serif
    font-size 1.1
    a
      color inherit
      font-weight 200
      text-decoration none
      margin-right 5px

      &:hover
        color $accentColor

  .written-by, .work-for
    border 0
</style>
