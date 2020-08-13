<template>
  <div
    v-if="name"
    class="post-meta-author"
    itemprop="publisher author"
    itemtype="http://schema.org/Person"
    itemscope
  >
    <div class="written-by">
      <a
        v-if="picAlign === 'left'"
        :href="authorLink"
        class="pic-left"
        :target="linkTarget"
      ><img
        :src="pic"
        :alt="name"
      ></a>

      <a
        :href="authorLink"
        :target="linkTarget"
        itemprop="name"
      >{{ name }}</a>
      from <NavigationIcon />

      <span itemprop="address">{{ location }}</span>

      on <ClockIcon />
      <time
        pubdate
        itemprop="datePublished"
        :datetime="date"
      >{{ resolvedDate }}</time>

      <a
        v-if="picAlign !== 'left'"
        :href="authorLink"
        class="pic-right"
        :target="linkTarget"
      ><img
        :src="pic"
        :alt="name"
      ></a>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import {ClockIcon, NavigationIcon} from 'vue-feather-icons';

export default {
  name: 'PostMeta',
  components: {ClockIcon, NavigationIcon},
  props: {
    id: {
      type: String,
      required: true,
      default: '../',
    },
    name: {
      type: String,
      default: 'Team Tandem',
    },
    date: {
      type: String,
      default: dayjs(),
    },
    link: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: 'The Internet',
    },
    pic: {
      type: String,
      default: '/images/logo-tandem-svg.svg',
    },
    picAlign: {
      type: String,
      default: 'left',
    },
  },
  computed: {
    authorLink() {
      return (this.link === null) ? `/tag/${this.id}` : this.link;
    },
    linkTarget() {
      return (this.link === null) ? '_self' : '_blank';
    },
    resolvedDate() {
      return dayjs(this.date).format(
        this.$themeConfig.dateFormat || 'ddd MMM DD YYYY'
      );
    },
  },
};
</script>

<style lang="stylus">
.written-by
  font-size .85em
  padding-bottom: 1rem
  border-bottom 1px solid $borderColor
  img
    width 24px
    border-radius: 100%
    position relative
    bottom: 6px
  svg
    width 14px
    height 14px
    color lighten($landoBlue, 50%)
    position: relative
    top 3px
    margin-left: 3px
    margin-right: 3px
.pic-left
  float left
  margin-right 10px
  position relative
  top 5px
.pic-right
  float right
</style>
