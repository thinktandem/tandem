<template>
  <div class="location-container">
    <div
      v-for="location in locations"
      :key="location.airport"
      class="location-item"
      :style="{'color': location.text, 'border-bottom-color': location.background}"
    >
      <div class="location-wrapper">
        <div class="location-email">
          <h2 :style="{'color': location.text}">
            {{ location.name }}
          </h2>
          <a :href="`mailto:${location.email}`"><span>{{ emailAddressOnly(location.email) }}</span><span class="email-domain">@thinktandem.io</span></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationGrid',
  props: {
    locations: {
      type: Array,
      required: true,
    },
    columns: {
      type: Number,
      default: 4,
    },
  },
  methods: {
    emailAddressOnly(email) {
      return email.split('@')[0];
    },
  },
};
</script>

<style lang="stylus">
.location-container
  .location-item
    display inline-block
    box-sizing border-box
    background-color $lightGrey
    border-bottom 0.25rem #000 solid
    margin 0
    margin-right 0.25rem
    margin-bottom 2rem
    width 45%
    .location-wrapper
      box-sizing border-box
      background-color $lightGrey
      position relative
      text-align center
      padding 2rem
      opacity 1
      margin-bottom 0.25rem
      display flex
      justify-content center
      align-items center
      overflow hidden
      &:before
        content: "";
        float: left;
        padding-top: 100%;
    a
      font-size typeScale.tiny
      text-decoration none
      color $textColor
    a:hover, a:focus, a:active
      color $tandemPink
    h2
      color inherit
      { displayType }
      font-weight 400
      font-size typeScale.g
      text-transform uppercase
      margin 0
      padding 0
  @media (min-width: $MQSmall)
    flex-direction row
    justify-content space-evenly
    .location-item
      width auto
      width 19.25%
      padding-top 2.25rem
      min-height 10rem
      .location-wrapper:before
        display none
      h2
        font-size typeScale.g
      .location-wrapper
        padding 1rem
    @media (min-width: $MQLarge)
      a
        font-size typeScale.small
</style>
