<template>
  <article
    class="work"
    itemprop="blogPost"
    itemscope
    itemtype="https://schema.org/BlogPosting"
  >
    <meta
      itemprop="mainEntityOfPage"
      :content="resolveLink(data)"
    >

    <header
      itemprop="name headline"
    >
      <NavLink
        class="work-title"
        :link="resolveLink(data)"
      >
        {{ data.title }}
      </NavLink>
      <WorkMeta
        :id="data.frontmatter.org || data.frontmatter.client"
        :name="data.frontmatter.org || data.frontmatter.client"
        :link="data.frontmatter.link"
      />
    </header>

    <client-only>
      <!-- eslint-disable vue/no-v-html -->
      <p
        v-if="data.excerpt"
        class="work-summary"
        itemprop="description"
        v-html="data.excerpt"
      />
      <p
        v-else
        class="work-summary"
        itemprop="description"
        v-html="data.frontmatter.summary || data.summary"
      />
      <!-- eslint-enable vue/no-v-html -->
    </client-only>

    <footer>
      <div
        v-if="data.frontmatter.tags"
        class="work-meta work-tag"
        itemprop="keywords"
      >
        <router-link
          v-for="tag in resolveTags(data.frontmatter.tags)"
          :key="tag"
          :to="'/tag/' + tag"
        >
          {{ tag }}
        </router-link>
      </div>
    </footer>
  </article>
</template>

<script>
import WorkMeta from '@theme/components/WorkMeta.vue';
import utils from '@theme/utils.js';

export default {
  name: 'WorkSummary',
  components: {WorkMeta},
  props: {
    data: {
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
.work
  padding-bottom 25px
  margin-bottom 50px
  padding-top 50px
  margin-top 50px
  border-top 1px solid $borderColor

  &:last-child
    border-botton 1px solid $borderColor
    margin-bottom 0px

.work-title
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

.work-summary
  font-size 14px
  color $landoGrey
  font-weight 300
  font-size 1.14rem
  line-height 2
  letter-spacing -1.04px
  margin-bottom 2em

.work-meta
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

.work-author
  color rgba($darkTextColor, 0.84)
  font-weight 400

.work-date
  color rgba($darkTextColor, 0.54)
  font-weight 200

.work-tag
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

.work-for
  border 0
footer
  opacity 0
  height 0
</style>
