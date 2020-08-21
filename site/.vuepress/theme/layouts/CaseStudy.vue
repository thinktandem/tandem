<template>
  <div
    id="tandem-content_case-study"
    ref="content"
    class="case-study-wrapper"
    :style="bgStylez"
  >
    <style>
      h1 {color: {{ textColor }};}
      .content-wrapper-tandem.case-study-layout .section-header .section-header-left img {filter: {{ logoChanger }};}
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
    </div>
  </div>
</template>

<script>
import SectionHeader from '@theme/components/SectionHeader';
import utils from '@theme/utils.js';

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
      return utils.getWorkBackgroundStyles(this.topper);
    },
    logoChanger() {
      return utils.getColorFilter(this.theme.text).filter;
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
      a, h1
        font-weight 600
        text-decoration none
      img
        all unset
        height 27px
        margin-top 27px
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
        h2
          font-size 2.33em
</style>
