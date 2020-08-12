<template>
  <div class="content-wrapper-tandem">
    <SectionHeader title="LeBlog.">
      <h2>
        A <em>content</em> focus demands a simple design. Like this.
      </h2>
      <div>
        <p>Articles, webinars, events, podcasts, trainings and technical guides. We've done all the media all over the world.</p>
      </div>
    </SectionHeader>
    <BaseListLayout v-if="$pagination" />
    <Content v-else />
  </div>
</template>

<script>
import BaseListLayout from '@theme/components/BaseListLayout';
import SectionHeader from '@theme/components/SectionHeader';
export default {
  components: {BaseListLayout, SectionHeader},
};
</script>

<style lang="stylus" scoped>
</style>
