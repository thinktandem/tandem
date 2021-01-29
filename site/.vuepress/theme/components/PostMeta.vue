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
        class="pic"
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
  width 100%
  .written-by
    margin-top 2rem
    .pic
      display inline-block
      margin-right 0.75rem
      padding-left 0.25rem
      img
        width 42px
        border-radius 100%
        position relative
        bottom 1rem
  .written-by
    position relative
    padding-bottom 0
    display flex
    font-size typeScale.tiny
    padding-bottom 0
    a
      white-space nowrap
  .other-meta
    align-items baseline
    .meta-prefix
      margin-left 0.5rem
      margin-right 0.5rem
      { displayType }
      font-weight 500
      font-size typeScale.j
  @media (min-width: $MQSmall)
    align-items left
    display flex
    justify-content flex-start
    .written-by
      .pic
        margin-right 0.75rem
        position absolute
        left -3.25rem
        top 0
        bottom auto
    .written-by, .other-meta
      margin-top 0
      font-size typeScale.small
</style>
