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
              <span class="first-text">
                Better
              </span>
              <span class="second-text">
                Together.
              </span>
              <div>
                <h1 class="home-summary">
                  Tandem is the full-service digital agency that cares as much as you do.
                </h1>
              </div>
            </div>

            <div
              v-if="message === 1"
              class="message message-two"
            >
              <span class="first-text">
                Future
              </span>
              <span class="second-text">
                Friendly.
              </span>
              <div class="home-summary">
                Tandem is the full-service digital agency that builds things to last.
              </div>
            </div>
          </div>
        </div>

        <div
          v-for="slide in slides"
          :key="slide.id"
          class="section"
          :style="slide.background"
        >
          <component
            :is="slide.component"
            :key="slide.id"
            v-bind="Object.assign({}, slide.props, {id: slide.id})"
          />
        </div>
      </full-page>
    </ClientOnly>
    <Content />
  </div>
</template>

<script>
import HeroFlex from '@theme/components/HeroFlex';
import utils from '@theme/utils.js';

export default {
  components: {HeroFlex},
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
          component: HeroFlex,
          id: 'clmp',
          background: {
            'background-image': 'url(/images/work/clmp-bg.png)',
            'background-position': '100% 20%',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
          },
          props: {
            title: 'WordPress + Redesign.',
            byline: 'We rebuilt Community of Literary Magazines and Presses on WordPress for performance, user experience and mobile.',
            link: '/work/clmp-wp-redesign/',
            type: 'recent wordpress work',
            color: 'white',
            hover: '#cb1414',
            styles: {
              'background-color': '#10203a',
              'opacity': .76,
            },
          },
        },
        {
          component: HeroFlex,
          id: 'chenmed',
          background: {
            'background-image': 'url(/images/work/chenmed-bg.png)',
            'background-position': '100% 20%',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
          },
          props: {
            title: 'Drupal 8 + Redesign.',
            byline: 'We quickly rebuilt Chenmed with a modern design that allowed their marketing team to quickly add high quality content.',
            link: '/work/chenmed-d8-redesign/',
            type: 'recent drupal work',
            color: 'white',
            hover: '#0083c1',
            styles: {
              'background-color': '#6b1e74',
              'opacity': .7,
            },
          },
        },
        {
          component: HeroFlex,
          id: 'webinar',
          background: {
            'background-image': 'url(/images/work/space.jpg)',
            'background-position': '100% 20%',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
          },
          props: {
            title: 'Drupal Migration Webinar.',
            byline: 'Learn how to debug a Drupal 7 to 9 migration with Lando.',
            video: 'C1lhgObpHd8',
            link: '/blog/2020/04/28/lando-migration-webinar-part-1-followup/',
            type: 'recent webinar',
            color: 'white',
            hover: 'white',
            styles: {
              'background-color': '#ed3f7a',
              'opacity': .95,
            },
          },
        },
        {
          component: HeroFlex,
          id: 'localdev',
          background: {
            'background-image': 'url(/images/work/whypantheon-resized-4.jpg)',
            'background-position': '100% 20%',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
          },
          props: {
            title: 'Pantheon Localdev.',
            byline: 'We built a native desktop GUI app powered by Electron and Lando so Pantheon users can easily work on their sites locally.',
            link: '/work/',
            type: 'recent electron work',
            color: 'black',
            hover: '#1794c7',
            styles: {
              'background-color': '#ffdc28',
              'opacity': .88,
            },
          },
        },
        {
          component: HeroFlex,
          id: 'careers',
          background: {
            'background-image': 'url(/images/work/space.jpg)',
            'background-position': '100% 20%',
            'background-size': 'cover',
            'background-repeat': 'no-repeat',
          },
          props: {
            title: 'Join our team!',
            byline: 'We are always looking for new and awesome people to make new and awesome stuff with.',
            link: '/careers/',
            type: 'careers',
            color: 'white',
            hover: 'white',
            styles: {
              'background-color': '#ed3f7a',
              'opacity': .95,
            },
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
    /*
    setInterval(() => {
      this.message = Math.floor(Math.random() * 2);
    }, 5000);
    */
    this.message = 0;

    for (let i = 0; i < this.slides.length; i++) {
      let img = this.slides[i].background['background-image'];
      this.slides[i].background['background-image'] = utils.checkForWebp(img);
    }
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
      this.options.autoScrolling = false;
      this.options.fitToSection = false;
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
        .first-text
          font-size 1.3em
        .second-text
          text-transform uppercase
          color $tandemPink
          font-size 1.5em
          font-weight 800
        .home-summary, h1
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
</style>
