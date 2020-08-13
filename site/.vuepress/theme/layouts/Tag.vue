<template>
  <div class="content-wrapper-tandem">
    <SectionHeader
      :title="`${tag}.`"
      :pic="pic"
    >
      <h2>{{ title }}</h2>
      <div v-if="hasByline">
        <p>{{ byline }}</p>
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
  computed: {
    byline() {
      return this.$themeConfig.tags[this.tag].byline;
    },
    hasMeta() {
      return this.$themeConfig.tags[this.tag];
    },
    hasByline() {
      return this.hasMeta && this.$themeConfig.tags[this.tag].byline;
    },
    hasPic() {
      return this.hasMeta && this.$themeConfig.tags[this.tag].pic;
    },
    pic() {
      return (this.hasPic) ? this.$themeConfig.tags[this.tag].pic : null;
    },
    tag() {
      return this.$currentTags.key;
    },
    title() {
      if (this.hasMeta) {
        return this.$themeConfig.tags[this.tag].title;
      } else {
        return `We do the ${this.tag}.`;
      }
    },
  },
};
</script>
