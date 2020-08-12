<template>
  <div>
    WORK
    <BaseListLayout v-if="$pagination" />
    <Content v-else />
  </div>
</template>
