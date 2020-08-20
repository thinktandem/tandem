<template>
  <div
    id="tandem-content_case-study"
    ref="content"
    class="case-study-wrapper"
    :style="bgStylez"
  >
    <style>
      h1 {color: {{ textColor }};}
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
        v-if="topper.logo"
        :logo="topper.logo"
        :title="topper.client"
        :link="topper.link"
      >
        <h1
          class="h2"
          v-html="topper.title"
        />
      </SectionHeader>
      <SectionHeader
        v-else
        :title="topper.client"
        :link="topper.link"
      >
        <h2 v-html="topper.title" />
      </SectionHeader>
      <div class="showcase">
        <a
          target="_blank"
          :href="topper.link"
        ><img :src="topper.image"></a>
      </div>
      <Content itemprop="articleBody" />
    </div>
  </div>
</template>

<script>
import SectionHeader from '@theme/components/SectionHeader';

export default {
  name: 'CaseStudy',
  components: {SectionHeader},
  data() {
    return {
      theme: {},
      topper: {},
    };
  },
  computed: {
    bgStylez() {
      return this.topper.background ? this.topper.background : {};
    },
    textColor() {
      return this.theme.text ? this.theme.text : '#47474a';
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
      // Get the frontmatter
      const frontmatter = this.$page.frontmatter || {};
      // Get the defaults
      const defaults = {
        logo: frontmatter.logo,
        client: frontmatter.client || frontmatter.org,
        image: frontmatter.image,
        link: frontmatter.link,
        title: frontmatter.summary || frontmatter.byline || frontmatter.title,
      };
      // Merge in new header key if we have it
      if (frontmatter.header) {
        Object.assign(defaults, this.$page.frontmatter.header);
      }
      // Return
      return defaults;
    },
  },
};
</script>

<style lang="stylus">
.content-wrapper-tandem.case-study-layout
  max-width 940px
  blockquote
    background transparent
    border-left 0
    color white
    padding 5em 5em
  .section-header
    .section-header-left
      margin-right 175px
      &.logo
        margin-top 15px
        margin-right 150px
      a, h1
        font-weight 600
        text-decoration none
    .section-header-right
      h2, .h2
        font-family "Poppins", "Helvetica Neue", Arial, sans-serif
        line-height 1.04
        font-size 3.33em
        font-weight 700
        letter-spacing -.19rem
        text-decoration none
        margin-top: 0;
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
        bottom -5em
        right 0
        opacity .08
        z-index 0

@media (max-width: $MQMobile)
  .content-wrapper-tandem.case-study-layout
    .showcase
      img
        max-width 100%
        margin-left -20px
        margin-right -20px
    .section-header
      .section-header-right
        margin-top 25px
        h2, .h2
          font-size 2.33em
    .custom-block
      &.col-full, &.col-half, &.col-third
        img
          bottom -1.2em
</style>
