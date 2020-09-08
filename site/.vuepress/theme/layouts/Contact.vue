<template>
  <div class="content-wrapper-tandem content-wrapper-contact">
    <SectionHeader title="Contact Us.">
      <h2>
        Get in touch.<br>We'd love to chat.<br>And work together.
      </h2>
      <div>
        <p>
          We have a distributed team that is primarily located in the United States but we would love to connect any time, place or timezone. Let's connect and do great things together.
          <br><strong>Let's talk!</strong>
        </p>
      </div>
    </SectionHeader>

    <div class="custom-block point metro-locations">
      <p class="custom-block-title">
        Email a metro area.
      </p>
      <LocationGrid
        :locations="locations"
        :columns="5"
      />
    </div>

    <div class="custom-block point contact-us">
      <p class="custom-block-title">
        Message us via form.
      </p>
      <ContactForm />
    </div>

    <div class="custom-block point carrier-pigeon">
      <p class="custom-block-title">
        Or dispatch carrier pigeon.
      </p>
      <DispatchPigeon>
        1300 Clay Street #600<br>
        Oakland, CA 94612
      </DispatchPigeon>
    </div>
  </div>
</template>

<script>
import ContactForm from '@theme/components/ContactForm';
import DispatchPigeon from '@theme/components/DispatchPigeon';
import LocationGrid from '@theme/components/LocationGrid';
import SectionHeader from '@theme/components/SectionHeader';

export default {
  components: {ContactForm, DispatchPigeon, LocationGrid, SectionHeader},
  data() {
    return {
      locations: [],
    };
  },
  mounted() {
    this.locations = this.$themeConfig.locations;
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
  &.content-wrapper-contact
    max-width 1140px
    .section-header
      h1, h2, p
        color black
      .section-header-right
        text-align right
        @media (max-width: $MQMobile)
          text-align center
    .custom-block
      p
        font-weight 300
        font-size 1.33rem
        letter-spacing -1.04px
        color black
      &.point
        border-bottom 1px solid $borderColor
        margin-bottom 2em
        border-top 1px solid $borderColor
        padding 2em 0
        &.metro-locations
          margin-top 2em
        &.contact-us
          border 0
        &.carrier-pigeon
          border-bottom 0

</style>
