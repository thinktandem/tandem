<template>
  <div
    id="tandem-content"
    ref="content"
    class="content-wrapper-home"
  >
    <ClientOnly>
      <full-page
        id="fullpage"
        ref="fullpage"
        :options="options"
      >
        <div class="section">
          <div class="home-section-container section-31">
            <div
              v-if="message === 0"
              class="message message-one"
            >
              <span class="better">
                Better
              </span>
              <span class="together">
                Together.
              </span>
              <div class="home-summary">
                Tandem is the full-service digital agency that cares about your success as much as you do.
              </div>
            </div>

            <div
              v-if="message === 1"
              class="message message-two"
            >
              <span class="future">
                Future
              </span>
              <span class="friendly">
                Friendly.
              </span>
              <div class="home-summary">
                Tandem is the full-service digital agency that builds things to last.
              </div>
            </div>
          </div>
        </div>

        <div v-for="slide in slides" :key="slide.id" class="section" :style="slide.background">
          <div class="hero-article-wrapper" :style="slide.theme">
            <div class="home-section-container hero-article">
              <h2>{{ slide.data.title }}</h2>
              <hr>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="home-section-container">
            final section ...
          </div>
        </div>
        <div class="section">
          <div class="home-section-container">
            final section 2...
          </div>
        </div>
      </full-page>
    </ClientOnly>
    <Content />
  </div>
</template>

<script>

// LAZY LOAD VIA: <img data-src="image.png">

/*
  when moving up from bottom move to last slide and reset autoScroll/fitToSection
*/

export default {
  data() {
    return {
      message: 0,
      lastScroll: 0,
      options: {
        licenseKey: '405018B1-CE12431F-9F1B1D09-898738E4',
        autoScrolling: true,
        fitToSection: true,
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
        afterLoad: this.afterLoad,
        onLeave: this.onLeave,
      },
      slides: [
        {
          // component: ''
          id: 'localdev',
          background: {
            'background-image': 'url(/images/work/whypantheon-resized-4.jpg)',
            'background-position': '100% 20%',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
          },
          theme: {
            'background-color': '#ffdc28',
            'color': 'black',
            'opacity': .88,
          },
          data: {
            title: 'Localdev for the masses.',
            byline: 'We built a native desktop GUI app powered by Electron and Lando so Pantheon users can easily work on their sites locally.',
            link: 'https://google.com',
          },
        },
      ],
    };
  },
  computed: {
    movingUp() {
      return window.scrollY < this.lastScroll;
    },
  },
  mounted() {
    // If we start at the top make sure we pink
    const toggle = document.getElementById('nav_toggle');
    toggle.classList.remove('greybeard');
    // Get a random message every 5000 seconds
    setInterval(() => {
      this.message = Math.floor(Math.random() * 2);
    }, 5000);
  },
  methods: {
    afterLoad(origin, destination, direction) {
      // Handle breaking free of the prison of FULLPAGE.js
      if (destination.isLast && direction === 'down') {
        this.breakFree(destination);
      } else if (origin.isLast && direction === null) {
        this.breakFree(origin);
      } else {
        this.options.autoScrolling = true;
        this.options.fitToSection = true;
      }
    },
    onLeave(origin, destination, direction) {
      // Smooth out the header animation
      const header = document.getElementById('header');
      const toggle = document.getElementById('nav_toggle');
      if (!destination.isFirst) {
        header.classList.add('fadeout');
        toggle.classList.add('togglein', 'greybeard');
        header.classList.remove('fadein', 'dehamburger');
      } else {
        header.classList.add('dehamburger', 'fadein');
        header.classList.remove('fadeout', 'open');
        header.classList.remove('not-first');
        toggle.classList.remove('greybeard');
      }
    },
    breakFree() {
      setTimeout(() => {
        this.options.autoScrolling = false;
        this.options.fitToSection = false;
        window.onscroll = () => {
          // If we are the bottom and start scrolling up lets bump
          // to the last slide
          if (window.scrollY > window.screen.availHeight && this.movingUp) {
            this.$refs.fullpage.api.fitToSection();
            window.onscroll = null;
          }
          // Set teh last scroll position
          this.lastScroll = window.scrollY;
        };
      }, 500);
    },
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
.content-wrapper-home
  .section
    .hero-article-wrapper
      height 100%
      display flex
    .home-section-container
      width 1140px
      margin auto
      @media (max-width: $MQMobile)
        width 90%
      &.section-31
        font-family "Poppins", "Helvetica Neue", Arial, sans-serif
        color black
        font-size 6em
        padding 0
        text-align center
        line-height .85
        font-weight 600
        letter-spacing -.07em
        .better
          font-size 1.3em
        .together
          text-transform uppercase
          color $tandemPink
          font-size 1.5em
          font-weight 800
        .future
          font-size 1.3em
        .friendly
          text-transform uppercase
          color $tandemPink
          font-size 1.5em
          font-weight 800
        .home-summary
          margin auto
          margin-top 1em
          width 100%
          text-align center
          font-family GalaxieCopernicus, PT Serif, serif
          color black
          font-weight 300
          font-size .5em
          line-height 1.8
          letter-spacing -1.04px

        @media (max-width: $MQMobile)
          text-align center
          font-size 2.5em
          .home-summary
            text-align center
            font-size .6em
      &.hero-article
        h2
          font-size 6.57em
          font-weight 600
          letter-spacing -0.0587654321em
          line-height .75
          margin-top 0
          font-family "Poppins", "Helvetica Neue", Arial, sans-seri
          color black
          cursor pointer
          transition none
          text-decoration none
          &:hover
            color inherit
            text-decoration none
</style>
