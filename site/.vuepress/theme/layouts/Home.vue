<template>
  <div id="tandem-content" ref="content" class="home-page-layout">
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        First section ...
      </div>
      <div class="section">
        Second section ...
      </div>
      <div class="section">
        thd section ...
      </div>
      <div class="section">
        thd section ...
      </div>
        <div class="section">
        thd section ...
      </div>
    </full-page>
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
      lastScroll: 0,
      isMobileHeaderOpen: false,
      options: {
        autoScrolling: true,
        fitToSection: true,
        afterLoad: this.afterLoad,
        onLeave: this.onLeave,
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5'],
        licenseKey: '405018B1-CE12431F-9F1B1D09-898738E4',
        sectionsColor: ['#fffff', '#41b883', '#ff5f45', '#0798ec', '#c0ffee'],
      },
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
};

</script>

<style lang="stylus">

</style>
