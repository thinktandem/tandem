<template>
  <div class="content-wrapper-tandem content-wrapper-about">
    <SectionHeader title="About.">
      <h2>
        Let us build.<br>Something great.<br>Together.<br>
      </h2>
      <div>
        <p>
          We love to work with others who care as much as we do.
          <br><strong>Build your best.</strong>
        </p>
      </div>
    </SectionHeader>

    <div class="custom-block point values">
      <p class="custom-block-title">
        <a
          class="hidden-link"
          target="_blank"
          href="https://www.youtube.com/watch?v=0hiUuL5uTKc"
        >This.</a>
        <br>Is how we do it.
      </p>
      <ValuesGrid :items="values" />
    </div>

    <div class="custom-block important">
      <p class="custom-block-title">
        The above four. In four sentences.
      </p><p>Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better. Poetry lovers everywhere, rejoice: your home on the internet just got a lot better.</p>
    </div>

    <TagGrid prefix="/" />
  </div>
</template>

<script>
import SectionHeader from '@theme/components/SectionHeader';
import TagGrid from '@theme/components/TagGrid';
import ValuesGrid from '@theme/components/ValuesGrid';

export default {
  components: {SectionHeader, TagGrid, ValuesGrid},
  data() {
    return {
      values: [
        'Focus on <strong>important</strong>',
        'Keep things <strong>simple</strong>',
        'Build to last <strong>forever</strong>',
        'Do it with <strong>passion</strong>',
      ],
    };
  },
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': 'https://thinktandem.io',
          'url': 'https://thinktandem.io',
          'name': 'Tandem',
          'publisher': {
            '@id': 'https://thinktandem.io',
          },
        },
        {
          '@type': 'Organization',
          '@id': 'https://thinktandem.io',
          'name': 'Tandem',
          'url': 'https://thinktandem.io',
          'logo': {
            '@type': 'imageObject',
            'url': 'https://thinktandem.io/images/logo.png',
            'caption': 'Tandem Logo',
          },
          'sameAs': [
            'https://twitter.com/thinktandem',
            'https://github.com/thinktandem',
            'https://www.linkedin.com/company/12898991/admin/',
          ],
          'contactPoint': {
            '@type': 'ContactPoint',
            'email': 'sales@thinktandem.io',
            'contactType': 'customer service',
          },
        },
      ],
    };
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
    .hidden-link
      color inherit
      text-decoration none
    .custom-block
      p
        font-weight 300
        font-size 1.33rem
        letter-spacing -1.04px
        color black
      &.important
        padding 7em 0
        border-bottom 1px solid $borderColor
        margin-bottom 2em
        p
          &.custom-block-title
            font-size 3.64em
            font-family GalaxieCopernicus, PT Serif, serif
      &.point
        border-bottom 1px solid $borderColor
        margin-bottom 2em
        border-top 1px solid $borderColor
        padding 2em 0
        &.tags
          border-bottom 0
</style>
