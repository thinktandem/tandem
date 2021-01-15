<template>
  <div class="content-wrapper-tandem content-wrapper-work">
    <SectionHeader title="Work.">
      <h2>
        Simple or complex,<br>big or small.<br>We've seen it all.<br>
      </h2>
      <div>
        <p>
          Our team has helped re-design large non-profits, developed native desktop applications, created popular open source projects, trained world-class agencies and built some really cool websites for some really cool brands.
          <br><strong>We've done it all.</strong>
        </p>
      </div>
    </SectionHeader>

    <div class="custom-block point clients">
      <h3>
        Featured Clients.
      </h3>
      <ClientGrid :clients="featuredClients" />
    </div>

    <ContentList
      class="work-grid"
      more-text="Show more recent work"
    />

    <div class="custom-block point tags">
      <h3>
        Explore<br> other work.
      </h3>
      <TagGrid prefix="/" />
    </div>
  </div>
</template>

<script>
import ClientGrid from '@theme/components/ClientGrid';
import ContentList from '@theme/components/ContentList';
import SectionHeader from '@theme/components/SectionHeader';
import TagGrid from '@theme/components/TagGrid';

export default {
  components: {ClientGrid, ContentList, SectionHeader, TagGrid},
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
  data() {
    return {
      clients: [
        {name: 'Academy of American Poets', link: '/work/poets-redesign/', logo: '/images/logos/poets.png'},
        {name: 'Brandywine Conservancy & Museum of Art', link: '/work/brandywine-d7-support/', logo: '/images/logos/brandywine.png'},
        {name: 'Chenmed', link: '/work/chenmed-d8-redesign/', logo: '/images/logos/chenmed.png'},
        {name: 'CLMP', link: '/work/clmp-wp-redesign/', logo: '/images/logos/clmp.png'},
        {name: 'Outsell', link: '/work/outsell-tethys/', logo: '/images/logos/outsell.png'},
        {name: 'Pantheon', link: 'https://pantheon.io/localdev', logo: '/images/logos/pantheon-logo.png'},
        {name: 'Platform.sh', logo: '/images/logos/platform.sh.png'},
        {name: 'SF-Marin Food Bank', link: '/work/sffood-d6-support/', logo: '/images/logos/sfmfb.png'},
        {name: 'Twinstar', link: '/work/twinstar-discovery/', logo: '/images/logos/twinstar.png'},
        {name: 'University of San Francisco', link: '/work/usf-d8-migration/', logo: '/images/logos/usf.png'},
      ],
      featuredClients: [],
    };
  },
  mounted() {
    this.featuredClients = this.clients.sort(() => Math.random() - 0.5).slice(0, 3);
  },
};
</script>

<style lang="stylus">
.content-wrapper-tandem
  &.content-wrapper-work
    max-width 1140px
    .section-header
      h1, h2, p
        color black
      .section-header-right
        text-align right
        @media (max-width: $MQMobile)
          text-align center
    .work-grid
      { workGrid }
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
        &.tags
          border-bottom 0

    .tag-wrapper
      .custom-block
        background $lightGrey
        margin 1em
</style>
