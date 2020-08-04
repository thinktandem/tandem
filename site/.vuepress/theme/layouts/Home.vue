<template>
  <div>
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
      options: {
        autoScrolling: true,
        fitToSection: true,
        afterLoad: this.afterLoad,
        anchors: ['page1', 'page2', 'page3'],
        licenseKey: '405018B1-CE12431F-9F1B1D09-898738E4',
        sectionsColor: ['#41b883', '#ff5f45', '#0798ec'],
      },
    };
  },
  computed: {
    movingUp() {
      return window.scrollY < this.lastScroll;
    },
  },
  methods: {
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
    afterLoad(origin, destination, direction) {
      if (destination.isLast && direction === 'down') {
        this.breakFree(destination);
      } else if (origin.isLast && direction === null) {
        this.breakFree(origin);
      } else {
        this.options.autoScrolling = true;
        this.options.fitToSection = true;
      }
    },
  },
};

</script>

<style lang="stylus">
.content-wrapper
  padding 0
  max-width none
</style>
