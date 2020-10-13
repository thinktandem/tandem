<template>
  <div class="content-wrapper-tandem content-wrapper-about">
    <SectionHeader title="About.">
      <h2>
        Let us build.<br>Something great.<br>Together.<br>
      </h2>
      <div>
        <p>
          We love achieving great things by working together.<br>
          Combine your goals with our experience, expertise and passion and<br>
          <strong>Let's build your best.</strong>
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
      <ValuesGrid
        id="work-values"
        :items="values"
      />
    </div>

    <div class="custom-block important values-text">
      <p class="custom-block-title">
        The above four. <br>In four sentences.
      </p>
      <p>
        Working closely together allows us to distill your goals into their most important components.

        Knowing what's important means we can craft a solution that minimizes moving parts while maximizing impact.

        Combining expertise with the right tool means a solution that lasts over time.

        Caring about the outcome means even if everything else goes astray we still get it done.
      </p>
    </div>

    <div class="custom-block point what-we-do">
      <p class="custom-block-title">
        What we do.
      </p>
      <p>
        We offer <a href="/strategy"><strong>strategy</strong></a>, <a href="/design"><strong>design</strong></a> and <a href="/development"><strong>development</strong></a> services across industries and using a wide array of tech.
        <br>
        <br>
        Read more about each below.
      </p>
    </div>

    <TagGrid prefix="/" />

    <div class="custom-block important remote-team">
      <p class="custom-block-title">
        Primarily remote.
        <br>Primarily USA.
        <br>Prone to wanderlust.
      </p>
      <p>
        We have a distributed team that is primarily located in the United States and is primarily remote. We've also been known send emails from cabins in Siberia and beaches in Thailand. We also have reps in the below metro areas. <strong>Email one and say hello!</strong>
        <LocationGrid
          :locations="locations"
          :columns="5"
        />
      </p>
    </div>

    <div class="custom-block point interests">
      <p class="custom-block-title">
        Some current team vibes.
      </p>
      <ValuesGrid
        id="team-values"
        :items="featuredVibes"
        :columns="4"
      />
    </div>
  </div>
</template>

<script>
import LocationGrid from '@theme/components/LocationGrid';
import SectionHeader from '@theme/components/SectionHeader';
import TagGrid from '@theme/components/TagGrid';
import ValuesGrid from '@theme/components/ValuesGrid';

export default {
  components: {LocationGrid, SectionHeader, TagGrid, ValuesGrid},
  data() {
    return {
      featuredVibes: [],
      values: [
        'Focus on <strong>important</strong>',
        'Keep things <strong>simple</strong>',
        'Built to last <strong>craftsmanship</strong>',
        'Do it with <strong>passion</strong>',
      ],
      locations: [],
      vibes: [],
    };
  },
  mounted() {
    this.vibes = this.$themeConfig.vibes;
    this.locations = this.$themeConfig.locations;
    this.featuredVibes = this.vibes.sort(() => Math.random() - 0.5).slice(0, 8);
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
    .location-container
      margin-top 2em
    .custom-block
      p
        font-weight 300
        font-size 1.33rem
        letter-spacing -1.04px
        color black
        font-weight 300
        font-size 1.33rem
        letter-spacing -1.04px
        color #000
      &.important
        padding 7em 0
        border-bottom 1px solid $borderColor
        margin-bottom 2em
        @media (max-width: $MQMobile)
          padding 4em 0
          margin-bottom 0
        p
          &.custom-block-title
            font-size 3.64em
            letter-spacing -0.0265em
            line-height 1.265
            font-family GalaxieCopernicus, PT Serif, serif
            @media (max-width: $MQMobile)
              font-size 2.1em

        &.remote-team
          margin-top 2em
          border-top 1px solid $borderColor
          border-bottom 0
          br
            display block
      &.point
        border-bottom 1px solid $borderColor
        margin-bottom 2em
        border-top 1px solid $borderColor
        padding 2em 0
        &.interests
          margin-top 2em
          border-bottom 0
        &.what-we-do
          border 0
</style>
