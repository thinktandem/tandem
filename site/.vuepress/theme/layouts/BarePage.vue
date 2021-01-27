<template>
  <div
    id="tandem-content_bare-page"
    ref="content"
    class="bare-page-layout content-wrapper-tandem"
  >
    <Content class="content" />
    <Toc />
  </div>
</template>

<script>

import Toc from '@theme/components/Toc.vue';
export default {
  components: {Toc},
};
</script>

<style lang="stylus" scoped>
.content-wrapper-tandem
  padding-top calc(80px + 0.5rem);
.content
  margin-top 0.14em
</style>
