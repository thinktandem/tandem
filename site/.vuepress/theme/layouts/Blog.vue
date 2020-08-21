<template>
  <div class="content-wrapper-tandem content-wrapper-blog">
    <SectionHeader title="LeBlog.">
      <h2>
        A <em>content</em> focus demands a simple design. Like this.
      </h2>
      <div>
        <p>Articles, webinars, events, podcasts, trainings, work, case studies and technical guides. We've done all the media all over the world.</p>
      </div>
    </SectionHeader>
    <ContentList v-if="$pagination" />
    <Content v-else />
  </div>
</template>

<script>
import ContentList from '@theme/components/ContentList';
import SectionHeader from '@theme/components/SectionHeader';
export default {
  components: {ContentList, SectionHeader},
};
</script>

<style lang="stylus">
.content-wrapper-tandem
  &.content-wrapper-blog
    max-width 1140px
    .section-header
      h1, h2, p
        color black
      .section-header-right
        text-align right
        @media (max-width: $MQMobile)
          text-align center
    .work-grid
      display flex-grid
      article
        width 100%
        height 500px
        display inline-flex
        @media (max-width: $MQMobile)
          width 100%
          height 100%
          display block
    .work-title
      font-size 2em

    .custom-block
      p
        font-weight 300
        font-size 1.33rem
        letter-spacing -1.04px
        color black
      &.important
        padding 7em 0
        border-top 1px solid black
        border-bottom 1px solid black
        p
          &.custom-block-title
            font-size 3.64em
            font-family GalaxieCopernicus, PT Serif, serif
</style>
