<template>
  <article
    class="summary work"
    :class="wrapperClasses"
    :style="bgImgStylez"
    itemprop="blogPost"
    itemscope
    itemtype="https://schema.org/BlogPosting"
  >
    <style>
      .work.{{ page.key }} .title { color: {{ textColor }};}
      .work.{{ page.key }} .description { color: {{ textColor }};}
      .work.{{ page.key }} .work-logo img {filter: {{ logoChanger }}; height: {{ logoHeight }}px;}
      .work.{{ page.key }}:hover img {filter: {{ logoHover }}; height: {{ logoHeight }}px;}
      .work.{{ page.key }}:hover .title { color: {{ theme.headerHover }};}
      .work.{{ page.key }}:hover .description { color: {{ theme.headerHover }};}
    </style>
    <NavLink
      class=""
      :link="resolveLink(page)"
    >
      <div
        class="wrapper"
        :style="bgStylez"
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
            class="description"
            itemprop="description"
            v-html="page.frontmatter.summary || page.summary"
          />
          <!-- eslint-enable vue/no-v-html -->
        </client-only>

        <div
          class="work-logo"
        >
          <img
            v-if="page.frontmatter.logo"
            :alt="page.frontmatter.client"
            :src="page.frontmatter.logo"
          >
          <div v-else>
            {{ page.frontmatter.client }}
          </div>
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
    </NavLink>
  </article>
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
    logoChanger() {
      return utils.getColorFilter(this.theme.text).filter;
    },
    logoHover() {
      return utils.getColorFilter(this.theme.headerHover).filter;
    },
    logoHeight() {
      const factor = this.page.frontmatter.logoHeight ? this.page.frontmatter.logoHeight : 1;
      return factor * 25;
    },
    textColor() {
      return utils.getWorkTextColor(this.theme);
    },
    wrapperClasses() {
      return `work ${this.page.key}`;
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
.summary
  { summaryWrapper }
  .wrapper
    bottom 4rem
  .work-logo
    position absolute
    right 1em
    bottom 1em
    font-size typeScale.small
  footer
    opacity 0
    height 0
    display none
  @media (min-width: $MQMobile)
    .work-logo
      right 2rem
      bottom 2rem
</style>
