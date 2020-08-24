<template>
  <NavLink
    class="work-title"
    :link="resolveLink(page)"
  >
    <article
      :class="wrapperClasses"
      :style="bgImgStylez"
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <style>
        .work.{{ page.key }} .work-title {color: {{ textColor }};}
        .work.{{ page.key }} .work-logo img {filter: {{ logoChanger }}; height: {{ logoHeight }}px;}
        .work.{{ page.key }}:hover img {filter: {{ logoHover }}; height: {{ logoHeight }}px;}
        .work.{{ page.key }}:hover .work-title {color: {{ theme.headerHover }};}
        .work.{{ page.key }}:hover .work-summary {color: {{ theme.headerHover }};}
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

        <div
          class="work-logo"
        >
          <img
            v-if="page.frontmatter.logo"
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
a
  text-decoration none
.work
  margin-bottom 2em
  position relative
  .work-wrapper
    opacity .86
    padding 4em

  .work-title, .work-logo
    font-size 2.57em
    font-weight 600
    letter-spacing -0.0987654321em
    margin-top 0
    border-bottom 0
    font-family "Poppins", "Helvetica Neue", Arial, sans-seri
    color inherit
    cursor pointer
    transition none
    text-decoration none

    &:hover
      color inherit
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
    font-size .8em

  footer
    opacity 0
    height 0
@media (max-width: $MQMobile)
  .work
    margin-bottom 1em
    .work-wrapper
      padding 1em
  .content-wrapper-tandem.content-wrapper-work,
  .content-wrapper-tandem.content-wrapper-tag
    .work-title
      font-size 1.68em
    .work-summary
      font-size .76em
      margin-bottom 3em
    .work-logo
      right .4em
      bottom .4em
</style>
