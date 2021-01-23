<template>
  <div class="content-wrapper-tandem content-wrapper-blog">
    <SectionHeader title="LeBlog">
      <h2>
        Content demands<br>a simple design.<br>Like this.
      </h2>
      <div>
        <p>
          Articles, webinars, events, podcasts, trainings, case studies, technical guides and memes. We've got years and years and years of thought leadership from design to development, from non-profits to healthcare.
          <br><strong>All the media. All over the world.</strong>
        </p>
      </div>
    </SectionHeader>

    <div class="custom-block point clients">
      <h3>
        Hot tags.
      </h3>
      <div class="hot-tags">
        <ul
          v-if="hotTags"
          class="tags"
        >
          <PostTag
            v-for="tag in hotTags"
            :key="tag.name"
            class="tag"
            :tag="tag.name"
          />
        </ul>
      </div>
    </div>

    <ContentList />

    <div class="custom-block point tags">
      <h3>
        Explore<br> other content.
      </h3>
      <TagGrid />
    </div>
  </div>
</template>

<script>
import ContentList from '@theme/components/ContentList';
import dayjs from 'dayjs';
import PostTag from '@theme/components/PostTag.vue';
import SectionHeader from '@theme/components/SectionHeader';
import TagGrid from '@theme/components/TagGrid';

export default {
  components: {ContentList, PostTag, SectionHeader, TagGrid},
  data() {
    return {
      daysAgo: 90,
      hotTags: [],
      hotTagsAmount: 6,
    };
  },
  mounted() {
    // Get time ago threshhold
    const timeline = dayjs().unix() - 60 * 60 * 24 * this.daysAgo;
    // Copy our tags so we can operate on them
    const recentTags = [...this.$tags.list];
    // Loop through and filter out anything older than daysAgo
    recentTags.forEach(tag => {
      tag.pages = tag.pages.filter(page => {
        const date = page.frontmatter.date || page.lastUpdated;
        return dayjs(date).unix() > timeline;
      });
    });
    // Rank order by pages
    recentTags.sort((a, b) => (a.pages.length > b.pages.length) ? -1 : 1);
    // And grab the first five
    this.hotTags = recentTags.slice(0, this.hotTagsAmount);
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
.content-wrapper-tandem
  &.content-wrapper-blog
    .hot-tags
      width 100%
      ul
        margin 0
        padding 0
        list-style none
        display flex
        flex-wrap wrap
        justify-content center
    @media (min-width: $MQMobile)
      .hot-tags
        justify-content space-between
        padding-top 0.765rem
        ul
          justify-content flex-start
</style>
