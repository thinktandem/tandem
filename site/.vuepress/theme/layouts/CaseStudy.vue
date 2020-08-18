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
      .content-wrapper {color: {{ textColor }};}
    </style>
    <div class="content-wrapper-tandem case-study-layout">
      <SectionHeader
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
  .section-header
    .section-header-left
      margin-right 175px
      a, h1
        font-weight 600
        text-decoration none
    .section-header-right
      h2
        font-family "Poppins", "Helvetica Neue", Arial, sans-serif
        line-height 1.04
        font-size 3.33em
        font-weight 700
  .showcase
    text-align center
    img
      max-width 90%

@media (max-width: $MQMobile)
  .content-wrapper-tandem.case-study-layout
    .showcase
      img
        max-width 100vw
        margin-left -20px
        margin-right -20px
</style>
