<template>
  <div class="content-wrapper-tandem">
    <SectionHeader title="Work.">
      <h2>
        A <em>content</em> focus demands a simple design. Like this.
      </h2>
      <div>
        <p>Articles, webinars, events, podcasts, trainings, work, case studies and technical guides. We've done all the media all over the world.</p>
      </div>
    </SectionHeader>
    <BlogListLayout v-if="$pagination" />
    <Content />
  </div>
</template>

<script>
import SectionHeader from '@theme/components/SectionHeader';
import BlogListLayout from '@theme/components/BlogListLayout';
export default {
  components: {SectionHeader, BlogListLayout},
  mounted() {
    this.$updateTheme({background: 'white', headerColor: 'black'});
  },
};
</script>

<style lang="stylus">

</style>
