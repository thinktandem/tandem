<template>
  <div id="tandem-content" ref="content" class="case-study-layout content-wrapper-tandem">
    <div class="case-study-theme-content">
      <h1 class="post-title">{{ $frontmatter.title }}</h1>
      <PostHeader
        :name="$frontmatter.author"
        :pic="$frontmatter.pic"
        :link="$frontmatter.link"
        :date="$frontmatter.date"
      />
      <Content />
      <PostFooter
        :tags="$frontmatter.tags"
        :original="$frontmatter.original"
      />
    </div>
    <Toc />
  </div>
</template>

<script>
import PostHeader from '@theme/components/PostHeader.vue';
import PostFooter from '@theme/components/PostFooter.vue';
import Toc from '@theme/components/Toc.vue';

export default {
  components: {PostHeader, PostFooter, Toc},
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': 'https://thinktandem.io' + this.$page.path,
      },
      'name': this.$title,
      'headline': this.$title,
      'about': [
        this.$page.summary,
      ],
      'image': [
        'https://thinktandem.io' + this.$frontmatter.mainImage,
      ],
      'datePublished': this.$frontmatter.date,
      'dateModified': this.$frontmatter.date,
      'author': {
        '@type': 'Person',
        'name': this.$frontmatter.author,
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'Tandem',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://thinktandem.io/images/logo.png',
        },
      },
    };
  },
  mounted() {
    console.log(this);
  },
};
</script>

<style lang="stylus">
.post-content
  .vuepress-toc
    padding-top: 250px
    max-width: 295px
    width: 295px
  hr
    border-top: 1px dotted #ddd
  .custom-block
    &.caption
      background-color: #f8f8f8
      padding: .1em 1em
      color: $landoBlue
      font-size: .8em
      font-weight: 700
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif
    &.thumbnail
      border: 1px dashed #ccc
      padding: 1em
.case-study-theme-content
  font-size 16px
  letter-spacing 0px
  font-family "GalaxieCopernicus", PT Serif, Serif
  color $textColor
  position relative
  .post-title
    padding-top 0
@media (max-width: $MQMobile)
  .case-study-theme-content
    padding-top 0
  .post-title
    margin-top 0
</style>
