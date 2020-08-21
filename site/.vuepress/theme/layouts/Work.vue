<template>
  <div class="content-wrapper-tandem content-wrapper-work">
    <SectionHeader title="Work.">
      <h2>
        Black background. <br> White text. <br> Wider container. <br>
      </h2>
      <div>
        <p>These are the things you want for a showcase of work.</p>
      </div>
    </SectionHeader>
    <ContentList
      v-if="$pagination"
      class="work-grid"
    />
    <Content v-else />
    <div class="custom-block important">
      <p class="custom-block-title">
        Ageless poetry. No boundaries.
      </p> <p>Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better.</p>
    </div>
  </div>
</template>

<script>
import ContentList from '@theme/components/ContentList';
import SectionHeader from '@theme/components/SectionHeader';

export default {
  components: {ContentList, SectionHeader},
  mounted() {
    this.$updateTheme({background: 'black', headerColor: 'white', text: 'white'});
  },
};
</script>

<style lang="stylus">
.content-wrapper-tandem
  &.content-wrapper-work
    max-width 1140px
    .section-header
      h1, h2, p
        color white
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
        color white
      &.important
        padding 7em 0
        border-top 1px solid white
        border-bottom 1px solid white
        p
          &.custom-block-title
            font-size 3.64em
            font-family GalaxieCopernicus, PT Serif, serif

</style>
