<template>
  <div class="content-wrapper-tandem content-wrapper-tag">
    <SectionHeader
      :title="`${tag}.`"
      :pic="pic"
      :radius="radius"
    >
      <h2>{{ title }}</h2>
      <div v-if="hasByline">
        <p>{{ byline }}</p>
      </div>
    </SectionHeader>
    <ContentList v-if="$pagination" />
    <Content v-else />
  </div>
</template>

<script>
import ContentList from '@theme/components/ContentList';
import SectionHeader from '@theme/components/SectionHeader';
export default {
  components: {ContentList, SectionHeader},
  data() {
    return {
      sortOrder: ['work', 'blog'],
    };
  },
  computed: {
    byline() {
      return this.$themeConfig.tags[this.tag].byline;
    },
    hasMeta() {
      return this.$themeConfig.tags[this.tag];
    },
    hasByline() {
      return this.hasMeta && this.$themeConfig.tags[this.tag].byline;
    },
    hasPic() {
      return this.hasMeta && this.$themeConfig.tags[this.tag].pic;
    },
    pic() {
      return (this.hasPic) ? this.$themeConfig.tags[this.tag].pic : null;
    },
    radius() {
      if (this.hasMeta && this.$themeConfig.tags[this.tag].radius) {
        return this.$themeConfig.tags[this.tag].radius;
      } else {
        return '0%';
      }
    },
    tag() {
      return this.$currentTags.key;
    },
    title() {
      if (this.hasMeta) {
        return this.$themeConfig.tags[this.tag].title;
      } else {
        return `We do the ${this.tag}.`;
      }
    },
  },
};
</script>

<style lang="stylus">
.content-wrapper-tandem
  &.content-wrapper-tag
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
        border-top 1px solid black
        border-bottom 1px solid black
        p
          &.custom-block-title
            font-size 3.64em
            font-family GalaxieCopernicus, PT Serif, serif
</style>
