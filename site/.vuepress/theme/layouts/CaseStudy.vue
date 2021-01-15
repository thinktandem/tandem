<template>
  <div
    id="tandem-content_case-study"
    ref="content"
    class="case-study-wrapper"
    :style="bgStylez"
  >
    <style>
      /* I recommend, settng a class in the js logic, for "inverse" or something, specially if it's more
      "dark/light" rather than specific colors, this method is a bit of a rube goldberg */
      h1 { color: {{ textColor }} !important;}
      a { color: {{ textColor }} !important;}
      a:hover { color: {{ hoverColor }} !important;}
      blockquote { color: {{ textColor }} !important;}
      blockquote::before { color: {{ hoverColor }} !important;}
      blockquote ul li { color: {{ hoverColor }} !important;}
      .content-wrapper-tandem.case-study-layout .section-header .section-header-left img {
      filter: {{ logoChanger }};
      height: {{ logoHeight }}px;
      margin-top: {{ logoMargin }}px;
      }
      .post-tags ul li a {
      background-color: {{ bgColor }}  !important;
      border: 1px solid {{ textColor }}  !important;
      }
      .post-tags ul li a:hover {
      background-color: {{ bgColor }} !important;
      border: 1px solid {{ hoverColor }} !important;
      color: {{ hoverColor }} !important;
      }
      .post-tags ul li a:hover span {
      color: {{ hoverColor }}!important;
      }
      .post-tags ul li a span {
      color: {{ textColor }} !important;
      }
      .section-header .section-header-right h2 { color: {{ textColor }} !important; }
      .content-wrapper { color: {{ textColor }} !important; border-color: {{ textColor }} !important; }
      .custom-block.point {border-top: 1px solid {{ textColor }} !important; color: {{ textColor }} !important; }
      .custom-block.point {border-bottom: 1px solid {{ textColor }} !important; color {{ textColor }} !important; }
      .custom-block.important {border-top: 1px solid {{ textColor }} !important; }
      .custom-block.col-full {border-top: 1px solid {{ textColor }} !important; }
      .custom-block.col-half {border-top: 1px solid {{ textColor }} !important; }
      .custom-block.col-third {border-top: 1px solid {{ textColor }} !important; }
      .custom-block.point.tagz { color: {{ textColor }}; border-top: 1px solid {{ textColor }} !important; }
      .custom-block.point.tagz h2 { color: {{ textColor }} !important; }
      .custom-block p { color: {{ textColor }} !important; }
    </style>
    <div class="content-wrapper-tandem case-study-layout">
      <SectionHeader
        :title="topper.client || this.$frontmatter.client"
        :pic="topper.logo || this.$frontmatter.logo"
        :no-header="true"
        :link="topper.link || this.$frontmatter.link"
      >
        <h1 v-html="topper.title || this.$frontmatter.title" />
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
        <h2>
          Learn more about what we've done with:
        </h2>
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
        font-size typeScale.g
        font-weight 500
        margin-left 10px
        margin-right 10px
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
          margin 0 0 1em
          { displayType }
          font-weight 700
          font-size typeScale.c
          text-align right
          text-decoration none
    .showcase
      text-align center
      margin-bottom 4em
      img
        max-width 100%
    .custom-block
      p
        font-weight 300
        { bodyType }
        font-size typeScale.g

      &.big
        p
          font-size typeScale.a
          @media (min-width: $MQMobile)
            font-size typeScale.b
      &.medium
        position absolute
        position initial
        @media (min-width: $MQMobile)
          bottom 7em
        p
          font-size typeScale.b
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
        ul
          li
            font-size 1.2em
      &.col-full, &.col-half, &.col-third
        padding 7em 0
        ul
          li
            font-size typeScale.f
            list-style none
        img
          position absolute
          bottom -3.5em
          right 0
          opacity .08
          z-index 0

@media (max-width: $MQMobile)
  .content-wrapper-tandem
    &.case-study-layout
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
