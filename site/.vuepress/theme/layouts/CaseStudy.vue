<template>
  <div
    id="tandem-content_case-study"
    ref="content"
    class="case-study-wrapper"
    :style="bgStylez"
  >
    <style>
      h1 {color: {{ textColor }};}
      .content-wrapper-tandem.case-study-layout .section-header .section-header-left img {
      filter: {{ logoChanger }};
      height: {{ logoHeight }}px;
      margin-top: {{ logoMargin }}px;
      }
      .section-header .section-header-right h2 {color: {{ textColor }};}
      .content-wrapper {color: {{ textColor }}; border-color: {{ textColor }};}
      blockquote {border-top: 1px solid {{ textColor }};}
      .custom-block.important {border-top: 1px solid {{ textColor }};}
      .custom-block.col-full {border-top: 1px solid {{ textColor }};}
      .custom-block.col-half {border-top: 1px solid {{ textColor }};}
      .custom-block.col-third {border-top: 1px solid {{ textColor }};}
    </style>
    <div class="content-wrapper-tandem case-study-layout">
      <SectionHeader
        :title="topper.client"
        :pic="topper.logo"
        :pic-only="topper.logo"
        :link="topper.link"
      >
        <h1 v-html="topper.title" />
      </SectionHeader>
      <div class="showcase">
        <a
          target="_blank"
          :href="topper.link"
        ><img :src="topper.image"></a>
      </div>
      <Content itemprop="articleBody" />
      <div
        v-if="$page.frontmatter.tags"
        class="work-meta work-tag"
        itemprop="keywords"
      >
        <router-link
          v-for="tag in resolveTags($page.frontmatter.tags)"
          :key="tag"
          :to="'/tag/' + tag"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from '@theme/components/SectionHeader';
import utils from '@theme/utils.js';

export default {
  name: 'CaseStudy',
  components: {SectionHeader},
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': 'https://thinktandem.io' + this.$page.path,
          },
          'name': this.$title,
          'headline': this.$title,
          'about': [
            this.$page.summary,
          ],
          'image': [
            'https://thinktandem.io' + this.$frontmatter.logo,
          ],
          'datePublished': this.$frontmatter.date,
          'dateModified': this.$frontmatter.date,
          'author': {
            '@type': 'Person',
            'name': 'Tandem',
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Tandem',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://thinktandem.io/images/logo.png',
            },
          },
        },
        {
          '@type': 'WebSite',
          '@id': 'https://thinktandem.io',
          'url': 'https://thinktandem.io',
          'name': 'Tandem',
          'publisher': {
            '@id': 'https://thinktandem.io',
          },
        },
        {
          '@type': 'Organization',
          '@id': 'https://thinktandem.io',
          'name': 'Tandem',
          'url': 'https://thinktandem.io',
          'logo': {
            '@type': 'imageObject',
            'url': 'https://thinktandem.io/images/logo.png',
            'caption': 'Tandem Logo',
          },
          'sameAs': [
            'https://twitter.com/thinktandem',
            'https://github.com/thinktandem',
            'https://www.linkedin.com/company/12898991/admin/',
          ],
          'contactPoint': {
            '@type': 'ContactPoint',
            'email': 'sales@thinktandem.io',
            'contactType': 'customer service',
          },
        },
      ],
    };
  },
  data() {
    return {
      theme: {},
      topper: {},
    };
  },
  computed: {
    bgStylez() {
      return utils.getWorkBackgroundStyles(this.topper);
    },
    logoChanger() {
      return utils.getColorFilter(this.theme.text).filter;
    },
    logoHeight() {
      const factor = this.$page.frontmatter.logoHeight ? this.$page.frontmatter.logoHeight : 1;
      return factor * 27;
    },
    logoMargin() {
      return this.$page.frontmatter.logoMargin ? this.$page.frontmatter.logoMargin : 27;
    },
    textColor() {
      return utils.getWorkTextColor(this.theme);
    },
  },
  mounted() {
    // Merge in the frontmatter theme if we have it
    if (this.$page.frontmatter.theme) {
      this.theme = Object.assign({}, this.$page.frontmatter.theme);
    }
    // Update the critical parent theme pathz
    this.$updateTheme(this.theme);
    // Grab the header stuffs
    this.topper = this.getTopper();
  },
  methods: {
    getTopper() {
      return utils.parseWorkFrontMatter(this.$page.frontmatter);
    },
    resolveTags(tags) {
      return utils.resolveTags(tags);
    },
  },
};
</script>

<style lang="stylus">
.content-wrapper-tandem.case-study-layout
  max-width 1140px
  blockquote
    background transparent
    border-left 0
    color white
    padding 5em 5em
  .section-header
    .section-header-left
      margin-right 175px
      a, h1
        font-weight 600
        text-decoration none
      img
        all unset
    .section-header-right
      h1
        font-family Poppins, Helvetica Neue, Arial, sans-serif
        line-height 1.04
        font-size 3.33em
        font-weight 700
        margin 0 0 1em
        letter-spacing -.19rem
        text-decoration none
  .showcase
    text-align center
    margin-bottom 4em
    img
      max-width 90%
  .custom-block
    p
      font-weight 300
      font-size 1.33rem
      letter-spacing -1.04px
    &.big
      p
        font-size 96px
    &.point
      padding 7em 0
      p
        line-height 2em
    &.important
      padding 7em 0
      p
        &.custom-block-title
          font-size 3.64em
          font-family GalaxieCopernicus, PT Serif, serif
    &.col-full, &.col-half, &.col-third
      padding 7em 0
      p
        &.custom-block-title
          font-size 2.71828em
          font-weight 900
      img
        position absolute
        bottom -3.5em
        right 0
        opacity .08
        z-index 0

@media (max-width: $MQMobile)
  .content-wrapper-tandem.case-study-layout
    .showcase
      img
        max-width 100vw
        margin-left -20px
        margin-right -20px
    .section-header
      .section-header-right
        h1
          font-size 2.33em
</style>
