<template>
  <NavLink
    :link="resolveLink(page)"
  >
    <article
      class="post"
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <div
        class="post-wrapper"
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
    </article>
  </NavLink>
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
a
  text-decoration none
.post
  position relative
  padding 4em 4em
  background $lightGrey
  margin-bottom 1em
  &:hover
    color $tandemPink
    .post-summary, .post-title, .written-by
      color $tandemPink
      text-decoration none
      transition none
  .post-wrapper
    opacity .86
    padding 1em

  .post-title
    { displayType }
    font-weight 600
    font-size typeScale.e
    text-decoration none
    margin-top 0
    border-bottom 0
    color $textColor
    cursor pointer
    transition none

  .post-summary
    { bodyType }
    font-size typeScale.i
    font-weight 300
    color $tandemGrey

  .post-meta-author
    margin-top 1em

  footer
    opacity 0
    height 0
    display none

@media (min-width: $MQMobile)
  .post
    padding 1em
    margin-bottom 2em
    .post-wrapper
      padding 4em
  .content-wrapper-tandem.content-wrapper-blog,
  .content-wrapper-tandem.content-wrapper-tag
    .post-title
      font-size typeScale.c
    .post-summary
      font-size typeScale.f
      margin-bottom 3em
    .post-logo
      right .4em
      bottom .4em
</style>
