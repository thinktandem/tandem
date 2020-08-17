<template>
  <div
    id="tandem-content_case-study"
    ref="content"
    class="case-study-layout content-wrapper-tandem"
  >
    <Content itemprop="articleBody" />
  </div>
</template>

<script>
export default {
  name: 'CaseStudy',
  mounted() {
    this.$updateTheme({
      background: '#4d9bf3',
      headerColor: 'white',
      headerActive: 'pink',
      headerHover: 'pink',
      text: 'red',
    });
  },
};
</script>

<style lang="stylus">
</style>
