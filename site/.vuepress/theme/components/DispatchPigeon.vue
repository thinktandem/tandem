<template>
  <div class="pigeon-form">
    <div class="pigeon-form-wrapper">
      <slot />
      <form>
        <div class="submit">
          <input
            type="button"
            value="Dispatch Pigeon"
            class="submit"
            @click="sendPigeon"
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DispatchPigeon',
  methods: {
    sendPigeon() {
      window.open('https://www.youtube.com/watch?v=uio1J2PKzLI', '_blank');
    },
  },
};
</script>

<style lang="stylus">
.pigeon-form
  { cb_form }
  .pigeon-form-wrapper
    margin 2em
    width 100%
    @media (max-width: $MQMobile)
      font-size typeScale.g
    input[type=button]
      { tandemButton }
    input
      &:focus
        outline none

</style>
