<template>
  <div class="content-wrapper-tandem content-wrapper-about">
    <SectionHeader title="About.">
      <h2>
        We get it done. <br> & do it right. <br> To build your best. <br>
      </h2>
      <div>
        <p>We focus on what's important </p>
      </div>
    </SectionHeader>
    <div class="custom-block important">
      <p class="custom-block-title">
        Care. And. Communicate.
      </p> <p>Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better.</p>
    </div>
    <div class="custom-block point">
      <p class="custom-block-title">
        1. Focus on important.
      </p> <p>Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better.</p>
    </div>
    <div class="custom-block point">
      <p class="custom-block-title">
        2. Keep it simple.
      </p> <p>Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better.</p>
    </div>
    <div class="custom-block point">
      <p class="custom-block-title">
        3. Build it to last.
      </p> <p>Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better.</p>
    </div>
    <div class="custom-block point">
      <p class="custom-block-title">
        4. Give a shit.
      </p> <p>Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better.</p>
    </div>
  </div>
</template>

<script>
import SectionHeader from '@theme/components/SectionHeader';

export default {
  components: {SectionHeader},
  mounted() {
  },
};
</script>

<style lang="stylus">
.content-wrapper-tandem
  &.content-wrapper-about
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
        border-top 1px solid $borderColor
        border-bottom 1px solid $borderColor
        margin-bottom 2em
        p
          &.custom-block-title
            font-size 3.64em
            font-family GalaxieCopernicus, PT Serif, serif

</style>
