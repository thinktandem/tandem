<template>
  <NavLink
    class="work-title"
    :link="resolveLink(page)"
  >
    <article
      class="work"
      :style="bgImgStylez"
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <style>
        .work .work-title {color: {{ textColor }};}
        .work .work-logo.{{ page.key }} img {filter: {{ logoChanger }};}
      </style>
      <div
        class="work-wrapper"
        :style="bgStylez"
      >
        <meta
          itemprop="mainEntityOfPage"
          :content="resolveLink(page)"
        >

        <header
          itemprop="name headline"
        >
          <NavLink
            class="work-title"
            :link="resolveLink(page)"
          >
            {{ page.title }}
          </NavLink>
        </header>

        <client-only>
          <!-- eslint-disable vue/no-v-html -->
          <p
            v-if="page.excerpt"
            class="work-summary"
            itemprop="description"
            v-html="page.excerpt"
          />
          <p
            v-else
            class="work-summary"
            itemprop="description"
            v-html="page.frontmatter.summary || page.summary"
          />
          <!-- eslint-enable vue/no-v-html -->
        </client-only>

        <div :class="logoClasses">
          <img src="/images/logos/poets.png">
        </div>
        <footer>
          <div
            v-if="page.frontmatter.tags"
            class="work-meta work-tag"
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
import utils from '@theme/utils.js';

export default {
  name: 'WorkSummary',
  props: {
    page: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      theme: {},
      topper: {},
    };
  },
  computed: {
    bgStylez() {
      return {background: this.theme.background, color: this.theme.text};
    },
    bgImgStylez() {
      return utils.getWorkBackgroundStyles(this.topper);
    },
    textColor() {
      return utils.getWorkTextColor(this.theme);
    },
    logoClasses() {
      return `work-logo ${this.page.key}`;
    },
    logoChanger() {
      return utils.getColorFilter(this.theme.text).filter;
    },
  },
  mounted() {
    // Merge in the frontmatter theme if we have it
    if (this.page.frontmatter.theme) {
      this.theme = Object.assign({}, this.page.frontmatter.theme);
    }
    // Grab the header stuffs
    this.topper = this.getTopper();
  },
  methods: {
    getTopper() {
      return utils.parseWorkFrontMatter(this.page.frontmatter);
    },
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
.work
  margin-bottom 2em
  position relative
  .work-wrapper
    opacity .86
    padding 4em 4em

  .work-title
    font-size 2.57em
    font-weight 600
    letter-spacing -0.0987654321em
    margin-top 0
    border-bottom 0
    font-family "Poppins", "Helvetica Neue", Arial, sans-seri
    color inherit
    cursor pointer
    transition all 0.2s
    text-decoration none

    &:hover
      color $accentColor
      text-decoration none

  .work-summary
    font-size 14px
    color inherit
    font-weight 300
    font-size 1.68rem
    line-height 2
    letter-spacing -1.04px

  .work-logo
    position absolute
    right 1em
    bottom 1em
    img
      height 25px

  footer
    opacity 0
    height 0
</style>
