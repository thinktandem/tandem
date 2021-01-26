<template>
  <article
    class="post summary"
    itemprop="blogPost"
    itemscope
    itemtype="https://schema.org/BlogPosting"
  >
    <NavLink
    class="link-flex-container"
      :link="resolveLink(page)"
    >
      <div
        class="wrapper"
      >
        <meta
          itemprop="mainEntityOfPage"
          :content="resolveLink(page)"
        >
        <header
          class="headline"
          itemprop="name headline"
        >
          <h4 class="title">{{ page.title }}</h4>
        </header>
        <client-only>
          <!-- eslint-disable vue/no-v-html -->
          <p
            v-if="page.excerpt"
            class="description"
            itemprop="description"
            v-html="page.excerpt"
          />
          <p
            v-else
            class="summary post-summary"
            itemprop="description"
            v-html="page.frontmatter.summary || page.summary"
          />
          <!-- eslint-enable vue/no-v-html -->
        </client-only>
        <PostMeta
          :id="page.frontmatter.id"
          :name="page.frontmatter.author"
          :date="page.frontmatter.date"
          :link="page.frontmatter.link"
          :location="page.frontmatter.location"
          :pic="page.frontmatter.pic"
          pic-align="left"
        />
        <footer>
          <div
            v-if="page.frontmatter.tags"
            class="post-meta post-tag"
            itemprop="keywords"
          >
            <router-link
              v-for="tag in resolveTags(page.frontmatter.tags)"
              :key="tag"
              :to="'/tag/' + tag"
            >
              {{ tag }}
            </router-link>
          </div>
        </footer>
      </div>
    </NavLink>
  </article>
</template>

<script>
import PostMeta from '@theme/components/PostMeta.vue';
import utils from '@theme/utils.js';

export default {
  name: 'PostSummary',
  components: {PostMeta},
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
  methods: {
    resolveLink(page) {
      return utils.resolveLink(page);
    },
    resolveTags(tags) {
      return utils.resolveTags(tags);
    },
  },
};
</script>

<style lang="stylus" scoped>
.post.summary
  { summaryWrapper }
  background $lightGrey
  &:hover
    color $tandemPink
    .post-summary, .post-title, .written-by
      color $tandemPink
      text-decoration none
      transition none
  .post-meta-author
    margin-top 1em
  footer
    opacity 0
    height 0
    display none
</style>
