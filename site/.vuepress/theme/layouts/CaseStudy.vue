<template>
  <div
    id="tandem-content_case-study"
    ref="content"
    class="case-study-layout content-wrapper-tandem"
  >
    <style>
      .content-wrapper {color: {{ textColor }};}
    </style>
    <Content itemprop="articleBody" />
  </div>
</template>

<script>
export default {
  name: 'CaseStudy',
  data() {
    return {
      theme: {},
    };
  },
  computed: {
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
  },
};
</script>

<style lang="stylus">
</style>
