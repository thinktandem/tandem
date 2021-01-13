<template>
  <div
    v-if="name"
    class="post-meta-data"
    itemprop="publisher author"
    itemtype="http://schema.org/Person"
    itemscope
  >
    <div class="written-by">
      <a
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
    </div>
    <div class="other-meta">
      <span class="meta-prefix">FROM </span>
      <span itemprop="address">{{ location }}</span>
      <span class="meta-prefix">ON </span>
      <time
        pubdate
        itemprop="datePublished"
        :datetime="date"
      >{{ resolvedDate }}</time>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'PostMeta',
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

<style lang="stylus" scoped>
.post-meta-data
  margin-top 1em
  display flex
  width 100%
  justify-content flex-start
  .written-by, .other-meta
    position relative
    display flex
    padding-bottom .5rem
    font-size .9em
    img
      width 42px
      border-radius 100%
      position relative
      bottom 6px
    svg
      width 14px
      height 14px
      color lighten($landoBlue, 50%)
      margin-left 10px
      margin-right 3px
  .other-meta
    align-items baseline
    .meta-prefix
      margin-left 0.5rem
      margin-right 0.5rem
      {displayType}
      font-size typeScale.j
      font-weight 500
  .pic-left
    position absolute
    left -3.25rem
    top -0.5rem
  @media (max-width: $MQMobile)
    align-items center
    display block
    .written-by, .other-meta
      font-size .9em
</style>
