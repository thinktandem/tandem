<template>
  <div>
    ABOUT
    <BaseListLayout v-if="$pagination" />
    <Content v-else />
  </div>
</template>
