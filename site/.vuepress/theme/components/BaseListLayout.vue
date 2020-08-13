<template>
  <div id="base-list-layout">
    <div
      class="ui-posts"
      itemscope
      itemtype="http://schema.org/Blog"
    >
      <article
        v-for="page in pages"
        :key="page.key"
        class="ui-post"
        itemprop="blogPost"
        itemscope
        itemtype="https://schema.org/BlogPosting"
      >
        <meta
          itemprop="mainEntityOfPage"
          :content="resolveLink(page)"
        >

        <header
          class="ui-post-title"
          itemprop="name headline"
        >
          <NavLink :link="resolveLink(page)">
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
        </header>

        <client-only v-if="page.excerpt">
          <!-- eslint-disable vue/no-v-html -->
          <p
            class="ui-post-summary"
            itemprop="description"
            v-html="page.excerpt"
          />
          <!-- eslint-enable vue/no-v-html -->
        </client-only>
        <p
          v-else
          class="ui-post-summary"
          itemprop="description"
        >
          {{ page.frontmatter.summary || page.summary }}
        </p>

        <footer>
          <div
            v-if="page.frontmatter.tags"
            class="ui-post-meta ui-post-tag"
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
        Load more content
      </button>
    </div>
  </div>
</template>

<script>
import {TagIcon} from 'vue-feather-icons';
import PostMeta from '@theme/components/PostMeta.vue';

export default {
  components: {PostMeta, TagIcon},
  data() {
    return {
      paginationComponent: null,
      pages: [],
    };
  },
  mounted() {
    this.pages = this.$pagination.pages;
    this.$router.afterEach(() => {
      if (this.$pagination) this.pages = this.$pagination.pages;
    });
  },
  methods: {
    more() {
      this.$pagination.paginationIndex++;
      let next = this.$pagination._paginationPages[this.$pagination.paginationIndex];
      let nextPages = this.$pagination._matchedPages.slice(next.interval[0], next.interval[1] + 1);
      for (let i = 0; i < nextPages.length; i++) {
        this.pages.push(nextPages[i]);
      }
    },
    resolveLink(page) {
      return (page.frontmatter.link2Original) ? page.frontmatter.originalLink : page.path;
    },
    resolvePostTags(tags) {
      if (!tags || Array.isArray(tags)) return tags;
      return [tags];
    },
  },

};
</script>

<style lang="stylus">
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
.common-layout
  .content-wrapper
    padding-bottom 80px

.ui-post
  padding-bottom 25px
  margin-bottom 50px
  padding-top 50px
  margin-top 50px
  border-top 1px solid $borderColor

  &:last-child
    border-botton 1px solid $borderColor
    margin-bottom 0px
  .written-by
    border 0
    margin-top 15px
  svg
    color lighten($landoBlue, 50%)

.ui-post-title
  .nav-link
    font-size 2.57em
    font-weight 600
    letter-spacing -0.0987654321em
    margin-top 0
    border-bottom 0
    font-family "Poppins", "Helvetica Neue", Arial, sans-seri
    color $textColor
  a
    cursor pointer
    color $accentColor
    transition all 0.2s
    text-decoration none

    &:hover
      color $accentColor
      text-decoration none

.ui-post-summary
  font-size 14px
  color $landoGrey
  font-weight 300
  font-size 1.14rem
  line-height 2
  letter-spacing -1.04px
  margin-bottom 2em

.ui-post-meta
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

.ui-post-author
  color rgba($darkTextColor, 0.84)
  font-weight 400

.ui-post-date
  color rgba($darkTextColor, 0.54)
  font-weight 200

.ui-post-tag
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
</style>
