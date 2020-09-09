<template>
  <div class="content-wrapper-tandem content-wrapper-landing-page">
    <SectionHeader
      :title="`${tag}.`"
      :pic="pic"
    >
      <h2>{{ title }}</h2>
      <div>
        <p v-html="byline" />
      </div>
    </SectionHeader>

    <Content />

    <div class="custom-block point recent-work work-grid">
      <p class="custom-block-title">
        Recent {{ upperTag }}<br>work.
      </p>
      <div class="recent-work-wrapper">
        <WorkSummary
          v-for="page in featuredWork"
          :key="page.key"
          :page="page"
          itemprop="blogPost"
          itemscope
          itemtype="https://schema.org/BlogPosting"
        />
        <div
          class="load-more"
          @click="incrementFeaturedWork"
        >
          <button class="btn btn-load-more">
            Next
          </button>
        </div>
      </div>
    </div>

    <div v-if="grids.length > 0">
      <div
        v-for="grid in grids"
        :key="grid.id"
        class="custom-block point grid"
      >
        <p class="custom-block-title">
          {{ grid.caption }}
        </p>
        <ValuesGrid
          :id="grid.id"
          :class="`columns-${grid.columns}`"
          :columns="grid.columns"
          :items="grid.content"
        />
      </div>
    </div>

    <div class="custom-block point recent-posts">
      <p class="custom-block-title">
        Recent {{ upperTag }}<br>content.
      </p>
      <div class="recent-posts-wrapper">
        <PostSummary
          v-for="page in recentPosts.reverse()"
          :key="page.key"
          :page="page"
          itemprop="blogPost"
          itemscope
          itemtype="https://schema.org/BlogPosting"
        />
        <div
          v-if="(posts.length - postsSize) >= ((postsIndex * postsSize) + 1)"
          class="load-more"
          @click="incrementPosts"
        >
          <button class="btn btn-load-more">
            Gimme two more
          </button>
        </div>
      </div>
    </div>

    <div class="custom-block point contact-us">
      <p class="custom-block-title">
        Let's make some great {{ upperTag }} together.<br>
        <small>Get in touch!</small>
      </p>
      <ContactForm />
    </div>

    <div class="custom-block point clients">
      <p class="custom-block-title">
        You might also want to check out.
      </p>
      <div class="related-tags">
        <ul
          v-if="relatedTags"
          class="tags"
        >
          <PostTag
            v-for="relatedTag in relatedTags"
            :key="relatedTag.name"
            :link="`/${relatedTag.name}`"
            class="tag"
            :tag="relatedTag.name"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ContactForm from '@theme/components/ContactForm';
import PostSummary from '@theme/components/PostSummary.vue';
import PostTag from '@theme/components/PostTag.vue';
import SectionHeader from '@theme/components/SectionHeader';
import ValuesGrid from '@theme/components/ValuesGrid';
import WorkSummary from '@theme/components/WorkSummary.vue';

export default {
  components: {ContactForm, PostSummary, PostTag, SectionHeader, ValuesGrid, WorkSummary},
  data() {
    return {
      featuredWork: null,
      recentPosts: [],
      recentWork: [],
      posts: [],
      postsIndex: 0,
      postsSize: 2,
      workIndex: 0,
    };
  },
  computed: {
    byline() {
      return this.$frontmatter.byline;
    },
    hasPic() {
      return this.$frontmatter.image;
    },
    pic() {
      return (this.hasPic) ? this.$frontmatter.image : null;
    },
    grids() {
      return this.$frontmatter.grids;
    },
    gridExists(index) {
      return !this.grids[index] !== undefined;
    },
    relatedTags() {
      return this.$frontmatter.relatedTags.map(tag => ({name: tag}));
    },
    tag() {
      return this.$frontmatter.tag;
    },
    title() {
      return this.$frontmatter.title;
    },
    upperTag() {
      return this.tag.charAt(0).toUpperCase() + this.tag.slice(1);
    },
    wins() {
      return this.$frontmatter.wins;
    },
  },
  mounted() {
    // Get all content tagged with the tag
    const content = this.$tags.map[this.tag].pages;
    // Separate content into posts and works
    this.posts = content.filter(page => page.id === 'blog');
    this.recentWork = content.filter(page => page.id === 'work');
    // Set "page 1" inititially
    this.featuredWork = [this.recentWork[this.workIndex]];
    this.recentPosts = this.posts.slice(-1 * this.postsSize);
  },
  methods: {
    incrementFeaturedWork() {
      // Increment the featured work
      this.workIndex++;
      // But if we are at the end of the line lets loop back around
      if (this.recentWork.length === this.workIndex) this.workIndex = 0;
      // Set the featured work
      this.featuredWork = [this.recentWork[this.workIndex]];
    },
    incrementPosts() {
      // Increment the posts
      this.postsIndex++;
      // Calculate start and end
      const start = this.posts.length - (this.postsIndex * this.postsSize) - 1;
      const end = start + this.postsSize;
      // Return the slice
      this.recentPosts = this.posts.slice(start, end);
    },
  },
};
</script>

<style lang="stylus">
.content-wrapper-tandem
  &.content-wrapper-landing-page
    max-width 1140px
    article
      &.post
        .post-wrapper
          padding 3em
        padding 0em
        .post-title
          font-size 2em
        .post-summary
          display none
      &.work
        .work-summary
          @media (max-width: $MQMobile)
            padding-bottom 5em
    .load-more
      text-align center
      background $lightGrey
      padding 1em
      color $darkTextColor
      margin 0em
      cursor pointer
      font-family "Poppins", "Helvetica Neue", Arial, sans-serif
      button
        all unset
    .section-header
      h1, h2, p
        color black
      .section-header-right
        text-align right
        @media (max-width: $MQMobile)
          text-align center
    .related-tags
      width 100%
      ul
        margin 0
        list-style none
        display flex
        flex-wrap wrap
        li
          margin-top 1em
    .custom-block
      p
        font-weight 300
        font-size 1.33rem
        letter-spacing -1.04px
        color black
        font-weight 300
        font-size 1.33rem
        letter-spacing -1.04px
        color #000
      &.important
        padding 7em 0
        margin-bottom 2em
        border-top 1px solid $borderColor
        p
          &.custom-block-title
            font-size 3.64em
            font-family GalaxieCopernicus, PT Serif, serif
        &.remote-team
          margin-top 2em
          border-top 1px solid $borderColor
          border-bottom 0
      &.point
        p
          width 100%
          &.custom-block-title
            width 20%
            small
              font-size .75em
              color $darkTextColor
              font-family "GalaxieCopernicus", PT Serif, Serif
            @media (max-width: $MQMobile)
              width 100%
        border-top 1px solid $borderColor
        padding 4em 0
        &.recent-work
          .recent-work-wrapper
            width 100%
        &.recent-posts
          .recent-posts-wrapper
            width 100%
        &.grid
          .columns-1
            .values-item
              padding 1em 2em
              &:before
                all unset
              @media (max-width: $MQMobile)
                width 100%
    @media (max-width: $MQMobile)
      .related-tags
        ul
          margin 0
          padding 0
          flex-wrap wrap
          justify-content center
</style>
