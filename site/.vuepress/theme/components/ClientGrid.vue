<template>
  <div class="client-container">
    <div
      v-for="client in clients"
      :key="client.name"
      :class="{'client-item': true, 'client-link': client.link}"
      @click="goto(client.link)"
    >
      <arrow-up-right-icon
        v-if="client.link"
        size="10"
        class="client-nav"
      />
      <img
        :alt="client.name"
        :src="client.logo"
      >
    </div>
  </div>
</template>

<script>
import {ArrowUpRightIcon} from 'vue-feather-icons';

export default {
  name: 'ClientGrid',
  components: {ArrowUpRightIcon},
  props: {
    clients: {
      type: Array,
      required: true,
    },
  },
  methods: {
    goto(link) {
      if (link) this.$router.push(link);
    },
  },
};
</script>

<style lang="stylus" scoped>
.client-container
  display flex
  flex-wrap wrap
  justify-content space-between
  width 100%
  .client-item
    width 32%
    position relative
    background $lightGrey
    text-align center
    padding 3em 0em
    display flex
    img
      width 150px
      margin auto
    .client-nav
      color black
      position absolute
      top .5em
      right .5em
    @media (max-width: $MQMobile)
      width 100%
      margin .5em 0em
      min-height 125px
  .client-link
    cursor pointer
    &:hover
      img
        filter invert(38%) sepia(80%) saturate(3684%) hue-rotate(319deg) brightness(98%) contrast(89%)
      .client-nav
        color $landoPink
</style>
