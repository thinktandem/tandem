<template>
  <div
    id="tandem-content_post"
    ref="content"
    class="post-layout content-wrapper-tandem"
  >
    <article
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <header class="post-theme-content">
        <h1
          class="post-title"
          itemprop="name headline"
        >
          {{ $frontmatter.title }}
        </h1>
        <PostMeta
          :id="$frontmatter.id"
          :name="$frontmatter.author"
          :date="$frontmatter.date"
          :link="$frontmatter.link"
          :location="$frontmatter.location"
          :pic="$frontmatter.pic"
          pic-align="right"
        />
      </header>
      <Content
        class="content"
        itemprop="articleBody"
      />
      <hr>
      <footer>
        <Newsletter />
        <PostFooter
          :tags="$frontmatter.tags"
          :original="$frontmatter.original"
        />
      </footer>
      <Toc />
    </article>
  </div>
</template>

<script>
import PostMeta from '@theme/components/PostMeta.vue';
import PostFooter from '@theme/components/PostFooter.vue';
import Toc from '@theme/components/Toc.vue';

export default {
  components: {PostMeta, PostFooter, Toc},
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
};
</script>

<style lang="stylus" scoped>
.content
  margin-top 3.14em
h1
  font-size 4.57em
  font-weight 600
  letter-spacing -0.0987654321em
  margin-top 0
h2
  font-size 2.5em
  font-weight 600
  letter-spacing -0.0987654321em
p
  font-weight 300
  line-height 1.712
  letter-spacing -0.56px
  font-size 1.0987654321em
.post-theme-content
  font-size 16px
  letter-spacing 0px
  font-family "GalaxieCopernicus", PT Serif, Serif
  color $textColor
  position relative
  .post-title
    padding-top 0
.vuepress-toc
  right 5%
  margin-top 120px
  font-family "Poppins", "Helvetica Neue", Arial, sans-serif
@media (max-width: $MQMobile)
  .post-theme-content
    padding-top 0
  .post-title
    margin-top 0
@media (max-width: $MQMobileNarrow)
  .content
    margin-top 2em
  h1
    font-size 3em
</style>
