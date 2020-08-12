<template>
  <div>
    BLOG
    <BaseListLayout v-if="$pagination" />
    <Content v-else />
  </div>
</template>
