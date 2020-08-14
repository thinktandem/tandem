<template>
  <div
    id="tandem-content_page"
    ref="content"
  >
    <Content itemprop="articleBody" />
    <ContactForm v-if="path === 'contact'" />
  </div>
</template>

<script>
  import ContactForm from '@theme/components/ContactForm';

  export default {
    components: {ContactForm},
    computed: {
      path() {
        return this.$page.path.replace(/\//g, '').toLowerCase();
      },
    },
  };
</script>

<style lang="stylus">
</style>
