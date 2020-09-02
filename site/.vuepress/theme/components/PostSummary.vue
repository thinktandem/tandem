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
            <TagIcon />
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
import {TagIcon} from 'vue-feather-icons';
import PostMeta from '@theme/components/PostMeta.vue';
import utils from '@theme/utils.js';

export default {
  name: 'PostSummary',
  components: {PostMeta, TagIcon},
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
  margin-bottom 2em
  position relative
  padding 4em 4em
  background $lightGrey
  &:hover
    color $tandemPink
    .post-summary, .post-title, .written-by
      color $tandemPink
      text-decoration none
      transition none
  .post-wrapper
    opacity .86
    padding 4em

  .post-title
    font-size 3.18em
    font-weight 600
    letter-spacing -0.0987654321em
    margin-top 0
    border-bottom 0
    font-family "Poppins", "Helvetica Neue", Arial, sans-seri
    color $textColor
    cursor pointer
    transition none
    text-decoration none

  .post-summary
    font-size 14px
    color $tandemGrey
    font-weight 300
    font-size 1.68rem
    line-height 2
    letter-spacing -1.04px

  .post-meta-author
    margin-top 1em
  footer
    opacity 0
    height 0
    display none
@media (max-width: $MQMobile)
  .post
    padding 1em
    margin-bottom 1em
    .post-wrapper
      padding 1em
  .content-wrapper-tandem.content-wrapper-blog,
  .content-wrapper-tandem.content-wrapper-tag
    .post-title
      font-size 2em
    .post-summary
      font-size 1.2em
      margin-bottom 3em
    .post-logo
      right .4em
      bottom .4em
</style>
