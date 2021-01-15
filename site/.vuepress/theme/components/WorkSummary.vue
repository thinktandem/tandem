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
        .work.{{ page.key }} .work-title { color: {{ textColor }};}
        .work.{{ page.key }} p.work-summary { color: {{ textColor }};}
        .work.{{ page.key }} .work-logo img {filter: {{ logoChanger }}; height: {{ logoHeight }}px;}
        .work.{{ page.key }}:hover img {filter: {{ logoHover }}; height: {{ logoHeight }}px;}
        .work.{{ page.key }}:hover .work-title { color: {{ theme.headerHover }};}
        .work.{{ page.key }}:hover .work-summary { color: {{ theme.headerHover }};}
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
  margin-bottom 1em
  position relative
  .work-wrapper
    opacity .95
    padding 1em
    padding 2em 2em 4em 2em
   .work-title, .work-logo
    { displayType }
    font-size typeScale.i
    font-weight 600
    margin-top 0
    border-bottom 0
    color inherit
    cursor pointer
    transition none
    text-decoration none
    &:hover
      color inherit
      text-decoration none
  .work-title
    font-size typeScale.d
  .work-summary
    color inherit
    font-size typeScale.g
    font-weight 300
  .work-logo
    position absolute
    right 1em
    bottom 1em
    font-size .8em
  footer
    opacity 0
    height 0
    display none
@media (min-width: $MQMobile)
  .work
    margin-bottom 0.5em
    .work-wrapper
      padding 4em
    .work-title
      font-size typeScale.e
    .work-summary
      font-size typeScale.f
      margin-bottom 3em
    .work-logo
      right .5rem
      bottom .5rem
</style>
