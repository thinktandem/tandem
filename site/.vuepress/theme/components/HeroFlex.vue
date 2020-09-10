<template>
  <div
    :class="`hero-flex-wrapper ${id}`"
    :style="styles"
  >
    <div class="hero-flex-container">
      <style>
        .hero-left-content.{{ id }} a {color: {{ color }};}
        .hero-left-content.{{ id }} h2 {color: {{ color }};}
        .hero-left-content.{{ id }} hr {border-color: {{ color }};}
        .hero-left-content.{{ id }} .hero-summary {color: {{ color }};}
        .hero-left-content.{{ id }} .hero-type {color: {{ color }};}

        .hero-left-content.{{ id }} a:hover {color: {{ hover }};}
        .hero-left-content.{{ id }}:hover {color: {{ hover }};}
        .hero-left-content.{{ id }}:hover h2 {color: {{ hover }};}
        .hero-left-content.{{ id }}:hover hr {border-color: {{ hover }};}
        .hero-left-content.{{ id }}:hover .hero-summary {color: {{ hover }};}
        .hero-left-content.{{ id }}:hover .hero-type {color: {{ hover }};}
      </style>
      <div :class="`hero-right-content ${id}`">
        <YouTube
          v-if="video"
          :vid="video"
        />
      </div>

      <NavLink
        :link="link"
      >
        <div :class="`hero-left-content ${id}`">
          <h2>{{ title }}</h2>
          <hr align="left">
          <div class="hero-summary">
            {{ byline }}
          </div>
          <hr align="left">
          <div class="hero-type">
            {{ type }}
          </div>
        </div>
      </NavLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    byline: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'black',
    },
    hover: {
      type: String,
      default: '#ed3f7a',
    },
    video: {
      type: String,
      default: null,
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
};

</script>

<style lang="stylus">
.hero-flex-wrapper
  height 100%
  display flex
  a
    text-decoration none
    width 49%
  .hero-flex-container
    width 1140px
    margin auto
    display flex
    flex-direction row-reverse
    @media (max-width: $MQMobile)
      display block
      .hero-right-content
        display none
    .hero-right-content
      width 49%
      .video-responsive
        margin-top 17%
    .hero-left-content
      width 80%
      .hero-summary
        font-size 14px
        font-weight 500
        font-size 1.28rem
        line-height 2
        letter-spacing -1.04px
        margin 2em 0
      .hero-type
        font-family "Poppins", "Helvetica Neue", Arial, sans-serif
        text-transform uppercase
        letter-spacing -0.0587654321em
        font-size 1.2em
        margin-top 2em
      hr
        width 33%
      h2
        font-size 4.57em
        font-weight 600
        letter-spacing -0.0587654321em
        line-height .85
        margin-top 0
        font-family "Poppins", "Helvetica Neue", Arial, sans-serif
        cursor pointer
        transition none
        text-decoration none
        &:hover
          color inherit
          text-decoration none
      @media (max-width: $MQMobile)
        width 100%
        margin 0 1em
        h2
          font-size 3em
        .hero-summary
          width 90%
</style>
