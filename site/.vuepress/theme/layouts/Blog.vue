<template>
  <div>
    BLOG
    <BaseListLayout v-if="$pagination" />
    <Content v-else />
  </div>
</template>

<script>
import BaseListLayout from '@theme/components/BaseListLayout';
export default {
  components: {BaseListLayout},
  mounted() {
    console.log(this);
  },
};
</script>
