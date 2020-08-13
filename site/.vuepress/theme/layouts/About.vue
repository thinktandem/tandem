<template>
  <div>
    ABOUT
    <BaseListLayout v-if="$pagination" />
    <Content v-else />
  </div>
</template>

<script>
import BaseListLayout from '@theme/components/BaseListLayout';
export default {
  components: {BaseListLayout},
};
</script>

<style lang="stylus">
</style>
