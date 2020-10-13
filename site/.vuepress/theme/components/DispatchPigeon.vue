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
  display flex
  width 98%
  background-color $lightGrey
  .pigeon-form-wrapper
    margin 2em
    width 100%
    font-size 2.2em
    line-height 2
    letter-spacing -0.19rem
    @media (max-width: $MQMobile)
      font-size 1.2em
    input[type=button]
      padding 1.2em 3em
      width 40%
      margin auto
      margin-top 2em
      border 0 solid $borderColor
      -webkit-box-sizing border-box
      -moz-box-sizing border-box
      box-sizing border-box
      font-family "AvenirNext", "Helvetica Neue", Arial, sans-serif
      font-size 16px
      @media (max-width: $MQMobile)
        width 100%
      &:hover
        background-color $tandemPink
        color #ffffff
    input
      &:focus
        outline none

</style>
