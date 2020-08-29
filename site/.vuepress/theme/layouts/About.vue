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
      <ValuesGrid :items="values" />
    </div>

    <div class="custom-block important values-text">
      <p class="custom-block-title">
        The above four. In four sentences.
      </p>
      <p>
        Working closely together means we can distill your goals into their most important components.

        Knowing what's important means we can craft a solution that minimizes moving parts while maximizing impact.

        Using the right tool and right expertise means we can engineer a solution that lasts over time.

        Caring about the outcome just as much as you do means even if everything goes astray we will still get it done.
      </p>
    </div>

    <div class="custom-block point what-we-do">
      <p class="custom-block-title">
        What we do.
      </p>
      <p>
        We offer <strong>strategy</strong>, <strong>design</strong> and <strong>development</strong> services across industries and using a wide array of tech.
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
      locations: [
        {airport: 'OAK', name: 'Oakland', email: 'oak@thinktandem.io', background: '#EFB21E', text: '#003831'},
        {airport: 'BOS', name: 'Boston', email: 'bos@thinktandem.io', background: '#BD3039', text: '#0C2340'},
        {airport: 'SRQ', name: 'Sarasota', email: 'srq@thinktandem.io', background: '#8FBCE6', text: '#092C5C'},
        {airport: 'DCA', name: 'DC', email: 'dc@thinktandem.io', background: '#AB0003', text: '#14225A'},
        {airport: 'SAN', name: 'San Diego', email: 'san@thinktandem.io', background: '#FFC425', text: '#2F241D'},
      ],
      vibes: [
        'Budweiser in a can',
        'Swimming in lake baikal',
        'Miley Cyrus',
        'Nightclubs in Belarus',
        'Retro gaming',
        'Vivaldi',
        'Christopher Hitchens',
        'Sour beers',
        'The larch',
        'Todd Snider',
        'The Scream',
        'Miracle',
        'Wayne White',
        'Bertrand Russell',
        'Super Mario Bros.',
        'The Badlands',
        'String instruments',
        'Sturgill Simpson',
        'homebrewed cider',
        'The Englischer Garten',
        'Wallace Stegner',
        'Lawrence Halprin',
        'Orchard planting',
      ],
    };
  },

  mounted() {
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
      &.important
        padding 7em 0
        border-bottom 1px solid $borderColor
        margin-bottom 2em
        p
          &.custom-block-title
            font-size 3.64em
            font-family GalaxieCopernicus, PT Serif, serif
        &.remote-team
          margin-top 2em
          border-top 1px solid $borderColor
          border-bottom 0
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
