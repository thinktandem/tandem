<template>
  <article
    :class="`hero-flex-wrapper ${id}`"
    :style="styles"
  >
    <div class="hero-flex-container">
      <style>
        .hero-left-content.{{ id }} a { color: {{ color }};}
        .hero-left-content.{{ id }} h2 { color: {{ color }};}
        .hero-left-content.{{ id }} .hero-summary { color: {{ color }};}
        .hero-left-content.{{ id }} .hero-type { color: {{ color }};}
        .hero-left-content.{{ id }} a:hover { color: {{ hover }};}
        .hero-left-content.{{ id }}:hover { color: {{ hover }};}
        .hero-left-content.{{ id }}:hover h2 { color: {{ hover }};}
        .hero-left-content.{{ id }}:hover .hero-summary { color: {{ hover }};}
        .hero-left-content.{{ id }}:hover .hero-type { color: {{ hover }};}
      </style>
      <div :class="`hero-right-content ${id}`">
        <YouTube
          v-if="video"
          :vid="video"
        />
      </div>
      <div :class="`hero-left-content ${id}`">
        <div class="post-tag">
          <span>{{ type }}</span>
        </div>
        <h2>{{ title }}</h2>
        <div class="hero-summary">
          {{ byline }}
        </div>
      </div>
      <NavLink
        v-if="cta"
        class="cta"
        :link="title"
      >
        {{ cta }}
      </NavLink>
    </div>
  </article>
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
    cta: {
      type: String,
      required: false,
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
    }
  },
};

</script>

<style lang="stylus">
.hero-flex-wrapper
  display flex
  height 100vh
  padding 4rem
  a.nav-link
    position absolute
    display block
    text-decoration none
    left 0
    bottom 0
  .hero-flex-container
    max-width $contentMaxWidth
    margin auto
    display flex
    position relative
    flex-direction row-reverse
    display block
    .post-tag
      { tagWrapper }
      margin-bottom 1.5rem
      background-color rgba(black, 0.3)
      color white !important
      box-sizing border-box
      span
        display blockquote
        padding-top 0.5rem
        padding-bottom 0.5rem
      &::after
        left 100%
        border-left-color rgba(black, 0.3)
      font-family typeScale.tiny
    .hero-right-content
      display none
      @media (max-width: $MQMobile)
        width 49%
        .video-responsive
          margin-top 17%
    .cta
      display block
      position absolute
      left 0
      bottom -4rem
      background-color white
      padding 0.75rem
      { displayType }
      transition-property padding, background-color, color
      transition-duration 0.25s
      transiton-timing-function ease-out
      &:hover, &:focus, &:active
        padding 1rem 0.75rem
        background-color $tandemPink
        color white
    .hero-left-content
      width 80%
      .hero-summary
        font-weight 500
        font-size 1.28rem
        line-height 2
        letter-spacing -0.025em
        margin 1rem 0 3rem 0
      h2
        { displayType }
        font-size typeScale.b
        font-weight 600
        line-height 1.2
        margin-top 0
        margin-bottom 0.5em
        cursor pointer
        transition none
        text-decoration none
        &:hover
          color inherit
          text-decoration none
      @media (max-width: $MQMobile)
        width 97%
        margin 0 1em
        h2
          font-size 3em
        .hero-summary
          width 90%
</style>
