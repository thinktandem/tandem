<template>
  <div
    id="tandem-content_case-study"
    ref="content"
    class="case-study-wrapper"
    :style="bgStylez"
  >
    <style>
      h1 {color: {{ textColor }};}
      a {color: {{ textColor }};}
      a:hover {color: {{ hoverColor }};}
      blockquote {border-top: 1px solid {{ textColor }}; color: {{ textColor }};}
      blockquote::before {color: {{ hoverColor }};}
      blockquote ul li {color: {{ hoverColor }};}
      .content-wrapper-tandem.case-study-layout .section-header .section-header-left img {
      filter: {{ logoChanger }};
      height: {{ logoHeight }}px;
      margin-top: {{ logoMargin }}px;
      }
      .post-tags ul li a {
      background-color: {{ bgColor }};
      border: 1px solid {{ textColor }};
      }
      .post-tags ul li a:hover {
      background-color: {{ bgColor }};
      border: 1px solid {{ hoverColor }};
      color: {{ hoverColor }};
      }
      .post-tags ul li a:hover span {
      color: {{ hoverColor }};
      }
      .post-tags ul li a span {
      color: {{ textColor }};
      }
      .section-header .section-header-right h2 {color: {{ textColor }};}
      .content-wrapper {color: {{ textColor }}; border-color: {{ textColor }};}
      .custom-block.point {border-top: 1px solid {{ textColor }}; color: {{ textColor }};}
      .custom-block.point {border-bottom: 1px solid {{ textColor }}; color {{ textColor }};}
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
        ><img
          :alt="`${$page.frontmatter.client} Showcase`"
          :src="topper.image"
        ></a>
      </div>

      <Content itemprop="articleBody" />

      <div class="custom-block point tagz">
        <p class="custom-block-title">
          Learn more about what we've done with:
        </p>
        <div class="post-tags">
          <ul
            v-if="tags"
            class="tags"
          >
            <PostTag
              v-for="tag in tags"
              :key="tag.name"
              class="tag"
              :tag="tag.name"
              :link="`/${tag.name}`"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostTag from '@theme/components/PostTag.vue';
import SectionHeader from '@theme/components/SectionHeader';
import utils from '@theme/utils.js';

export default {
  name: 'CaseStudy',
  components: {PostTag, SectionHeader},
  data() {
    return {
      tags: [],
      theme: {},
      topper: {},
    };
  },
  computed: {
    bgColor() {
      return utils.getBgColor(this.theme);
    },
    bgStylez() {
      const styles = utils.getWorkBackgroundStyles(this.topper, this.theme);
      delete styles['background-image'];
      if (this.theme.bgImage) styles['background-image'] = this.theme.bgImage;
      return utils.getWorkBackgroundStyles(this.topper, this.theme);
    },
    hoverColor() {
      return utils.getHoverColor(this.theme);
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
    // Get da tags
    this.tags = [...this.$tags.list].filter(tag => {
      return this.$frontmatter.tags.includes(tag.name);
    });
  },
  methods: {
    getTopper() {
      return utils.parseWorkFrontMatter(this.$page.frontmatter);
    },
    resolveTags(tags) {
      return utils.resolveTags(tags);
    },
  },
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
};
</script>

<style lang="stylus">
.content-wrapper-tandem
  &.case-study-layout
    max-width 1140px
    .custom-block.point:first-child
      border-top 0
    .custom-block.point:last-child
      border-bottom 0
    blockquote
      background transparent
      border-left 0
      padding 2em 2em
      border-top 0
      &:before
        font-size 4em
      p
        font-size 1.7em
        font-weight 500
        margin-left 10px
        margin-right 10px
          font-size 1em
      ul
        li
          font-size 1.4em
      @media (max-width: $MQMobile)
        padding 0em
        p
          font-size 1em
        &:before
          font-size 3em
        ul
          position initial
          li
            font-size .8em
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
          text-align right
          letter-spacing -.19rem
          text-decoration none
    .showcase
      text-align center
      margin-bottom 4em
      img
        max-width 100%
    .custom-block
      p
        font-weight 300
        font-size 1.33rem
        letter-spacing -1.04px

      &.big
        p
          font-size 96px
          @media (max-width: $MQMobile)
            font-size 72px
      &.medium
        position absolute
        bottom 7em
        @media (max-width: $MQMobile)
          position initial
        p
          font-size 72px
      &.point
        padding 7em 0
        p
          line-height 2em
        &.tagz
          margin-bottom 0
          margin-top 0
          border-bottom 0
          .post-tags
            width 100%
            ul
              margin 0
              list-style none
              display flex
              margin 0
              padding 0
              flex-wrap wrap
              @media (max-width: $MQMobile)
                justify-content center
              li
                margin-bottom 1em
                a
                  border 1px solid inherit
                  color inherit
                  span
                    font-weight 500
                    margin 0
                  &:hover
                    transition none
                  &:before
                    all unset
                  &:after
                    all unset

      &.important
        padding 7em 0
        p
          &.custom-block-title
            font-size 3.64em
            font-family GalaxieCopernicus, PT Serif, serif
        ul
          li
            font-size 1.2em
        @media (max-width: $MQMobile)
          p
            &.custom-block-title
              font-size 2em
      &.col-full, &.col-half, &.col-third
        padding 7em 0
        ul
          li
            font-size 1.5em
            list-style none
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
        margin-bottom 1em
        img
          max-width 100vw
          margin-left -20px
          margin-right -20px
      .section-header
        .section-header-right
          h1
            margin-top 1em
            font-size 2em
            text-align center
      .custom-block
        &.col-full, &.col-half, &.col-third, &.important, &.point
          padding 3em 0em
          text-align center
        &.important
          text-align left

</style>
