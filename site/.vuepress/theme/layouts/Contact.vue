<template>
  <div class="content-wrapper-tandem content-wrapper-contact">
    <SectionHeader title="Contact Us">
      <h2>
        Get in touch.<br>We'd love to chat<br>and work together.
      </h2>
      <div>
        <p>
          We have a distributed team located in the United States but available any timezone or place. Let's connect and do great things together.
          <br><strong>Let's talk!</strong>
        </p>
      </div>
    </SectionHeader>

    <div class="custom-block point metro-locations">
      <h3>
        Email a metro area.
      </h3>
      <LocationGrid
        :locations="locations"
        :columns="5"
      />
    </div>

    <div class="custom-block point contact-us">
      <h3>
        Message us via form.
      </h3>
      <ContactForm />
    </div>

    <div class="custom-block point carrier-pigeon">
      <h3>
        Or dispatch carrier pigeon.
      </h3>
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
.content-wrapper-tandem.content-wrapper-contact
  .custom-block
    &.metro-locations
      margin-top 2em
    &.contact-us
      border 0
    &.carrier-pigeon
      border-bottom 0
</style>
