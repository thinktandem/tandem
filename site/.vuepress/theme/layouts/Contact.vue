<template>
  <div class="content-wrapper-tandem content-wrapper-about">
    <SectionHeader title="Contact Us.">
      <h2>
        U.S. Coast to coast. <br> and travelling. <br> around the world. <br>
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
    <ContactForm />
  </div>
</template>

<script>
import ContactForm from '@theme/components/ContactForm';
import SectionHeader from '@theme/components/SectionHeader';

export default {
  components: {ContactForm, SectionHeader},
  jsonld() {
    return {
      '@context': 'https://schema.org',
      "@graph": [
        {
          "@type": "WebSite",
          "@id":"https://thinktandem.io",
          "url":"https://thinktandem.io",
          "name":"Tandem",
          "publisher":{
            "@id":"https://thinktandem.io"
          }
        },
        {
          "@type": "Organization",
          "@id":"https://thinktandem.io",
          "name":"Tandem",
          "url":"https://thinktandem.io",
          "logo":{
            "@type":"imageObject",
            'url': 'https://thinktandem.io/images/logo.png',
            "caption":"Tandem Logo"
          },
          "sameAs":[
            "https://twitter.com/thinktandem",
            "https://github.com/thinktandem",
            "https://www.linkedin.com/company/12898991/admin/",
          ],
          "contactPoint":{
            "@type":"ContactPoint",
            "email":"sales@thinktandem.io",
            "contactType":"customer service"
          }
        },
      ]
    };
  },
  mounted() {
    console.log(navigator);
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
