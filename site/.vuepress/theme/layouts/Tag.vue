<template>
  <div class="content-wrapper-tandem">
    <SectionHeader :title="`${title}.`">
      <h2>
        We know {{ title }}.
      </h2>
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
  computed: {
    title() {
      return this.$currentTags.key;
    },
  },
};
</script>
