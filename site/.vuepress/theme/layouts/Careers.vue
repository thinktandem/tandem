<template>
  <div class="content-wrapper-tandem content-wrapper-careers">
    <SectionHeader title="Careers.">
      <h2>
        Always looking.<br>For another.<br>Great teammate.<br>
      </h2>
      <div>
        <p>
          Join our group of diverse thinkers.
          <br>Level up your skills by learning a bunch of awesome stuff and doing a bunch of great work. Oh, and have fun doing it.
          <br><strong>Join our team!.</strong>
        </p>
      </div>
    </SectionHeader>

    <div class="custom-block point values">
      <p class="custom-block-title">
        Our team<br> values.
      </p>
      <ValuesGrid
        id="team-values"
        :items="values"
        :columns="5"
      />
    </div>

    <div class="custom-block important values-text">
      <p class="custom-block-title">
        The above five. <br>In five sentences.
      </p>
      <ol>
        <li>Putting employees first means investing in their success and well-being so they can invest the same in our clients.</li>
        <li>Building common purpose means more than just rowing in the same direction it means committing to one another even if you disagree.</li>
        <li>Maximizing flow means limiting distractions like unneccesary meetings so you can focus on what matters: <em>the actual work.</em></li>
        <li>Acting like an adult means giving people the benefit of the doubt, speaking honestly and directly with another and apologizing when you've made a mistake.</li>
        <li>Giving a shit means taking pride in your work and pulling your own weight while also helping others who are having an off-day.</li>
      </ol>
    </div>

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
        id="team-vibes"
        :items="featuredVibes"
        :columns="4"
      />
    </div>

    <div class="custom-block point connect-jobs">
      <p class="custom-block-title">
        Get in touch.
      </p>
      <div class="get-in-touch">
        <p>We are always looking to meet new people so drop us an email at <a href="mailto:jobs@thinktandem.io">jobs@thinktandem.io</a> and let's set up a time to talk!</p>
        <p>
          Oh yah! And definitely check out our <a
            href="https://handbook.thinktandem.io"
            target="_blank"
          >Handbook</a> in the meantime for more details on our policies, benefits, etc.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import LocationGrid from '@theme/components/LocationGrid';
import SectionHeader from '@theme/components/SectionHeader';
import ValuesGrid from '@theme/components/ValuesGrid';

export default {
  components: {LocationGrid, SectionHeader, ValuesGrid},
  data() {
    return {
      featuredVibes: [],
      values: [
        'Employees <strong>first</strong>',
        'Common <strong>purpose</strong>',
        'Maximize <strong>flow</strong>',
        'Act like <strong>adults</strong>',
        'Give a <strong>shit</strong>',
      ],
      locations: [],
      vibes: [],
    };
  },

  mounted() {
    this.vibes = this.$themeConfig.vibes;
    this.locations = this.$themeConfig.locations;
    this.featuredVibes = this.vibes.sort(() => Math.random() - 0.5).slice(0, 16);
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
  &.content-wrapper-careers
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
    .get-in-touch
      width 100%
      font-size 1.33rem
      letter-spacing -1.04px
      p
        width 100%
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
        @media (max-width: $MQMobile)
          padding 4em 0
          margin-bottom 0
        p
          &.custom-block-title
            font-size 3.64em
            font-family GalaxieCopernicus, PT Serif, serif
            @media (max-width: $MQMobile)
              font-size 2.1em
        &.remote-team
          margin-top 2em
          border-top 0
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
        &.connect-jobs
          border-bottom 0
</style>
