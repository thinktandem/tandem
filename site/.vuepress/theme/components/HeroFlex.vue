<template>
  <article
    :class="`hero-flex-wrapper ${id}`"
    :style="styles"
  >
    <div class="hero-flex-container">
      <style>
        .hero-flex-wrapper.{{ id }} a { color: {{ color }};}
        .hero-flex-wrapper.{{ id }} h2 { color: {{ color }};}
        .hero-flex-wrapper.{{ id }} .hero-summary { color: {{ color }};}
        .hero-flex-wrapper.{{ id }} a:hover { color: {{ hover }};}
        .hero-flex-wrapper.{{ id }} a:hover h2 { color: {{ hover }};}
        .hero-flex-wrapper.{{ id }} a:hover .hero-summary { color: {{ hover }};}
        .hero-flex-wrapper.{{ id }}:hover .cta { color: {{ hover }};}
      </style>
      <NavLink
        class="link--wrapper"
        :link="title"
      >
        <div class="hero-right-content">
          <YouTube
            v-if="video"
            :vid="video"
          />
        </div>
        <div
          class="hero-left-content"
        >
          <div
            class="post-tag"
          >
            <span>
              {{ type }}
            </span>
          </div>
          <h2>
            {{ title }}
          </h2>
          <div
            class="hero-summary"
          >
            {{ byline }}
          </div>
        </div>
      </NavLink>
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
      default: undefined,
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
  box-sizing border-box
  width 100vw
  height 100vh
  display flex
  text-decoration none
  left 0
  bottom 0
  padding 3rem
  @media (min-width: $MQMobile)
    padding 2rem
  @media (min-width: $MQSmall)
    padding 0
  a
    text-decoration none
  .hero-flex-container
    max-width $contentMaxWidth
    margin auto
    padding-bottom 6rem
    display flex
    position relative
    flex-direction row-reverse
    .link--wrapper
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
      { tandemButton }
      font-weight 300
      position absolute
      bottom 0
      left 0
      padding 0.75em 1.25em
      &:hover
        padding 0.75em 3em 0.75em 1.5em
    .hero-left-content
      .hero-summary
        { bodyType }
        margin 0 0 3rem 0
      h2
        { displayType }
        font-size typeScale.b
        font-weight 600
        line-height 1.2
        margin-top 0
        margin-bottom 0.5em
        transition none
        text-decoration none
        &:hover
          color inherit
          text-decoration none
      @media (max-width: $MQMobile)
        h2
          font-size typeScale.c
</style>
