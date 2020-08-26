<template>
  <div class="content-wrapper-tandem content-wrapper-work">
    <SectionHeader title="Work.">
      <h2>
        Black background. <br> White text. <br> Wider container. <br>
      </h2>
      <div>
        <p>These are the things you want for a showcase of work. These are the things you want for a showcase of work. These are the things you want for a showcase of work. These are the things you want for a showcase of work.</p>
      </div>
    </SectionHeader>

    <div class="custom-block point clients">
      <p class="custom-block-title">
        Featured Clients.
      </p>
      <ClientGrid :clients="featuredClients" />
    </div>

    <ContentList
      class="work-grid"
      more-text="Show more recent work"
    />

    <div class="custom-block point tags">
      <p class="custom-block-title">
        Explore<br> other work.
      </p>
      <TagGrid prefix="/" />
    </div>
  </div>
</template>

<script>
import ClientGrid from '@theme/components/ClientGrid';
import ContentList from '@theme/components/ContentList';
import SectionHeader from '@theme/components/SectionHeader';
import TagGrid from '@theme/components/TagGrid';

export default {
  components: {ClientGrid, ContentList, SectionHeader, TagGrid},
  data() {
    return {
      clients: [
        {name: 'Academy of American Poets', link: '/work/poets-redesign/', logo: '/images/logos/poets.png'},
        {name: 'Amazee.io', logo: '/images/logos/amazeeio_right.png'},
        {name: 'University of San Francisco', link: '/work/usf-d8-migration/', logo: '/images/logos/usf.png'},
      ],
      featuredClients: [],
    };
  },
  mounted() {
    this.featuredClients = this.clients.sort(() => Math.random() - 0.5).slice(0, 3);
  },
};
</script>

<style lang="stylus">
.content-wrapper-tandem
  &.content-wrapper-work
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
      .load-more
        margin-bottom 2em

    .work-title
      font-size 2em
    .custom-block
      p
        font-weight 300
        font-size 1.33rem
        letter-spacing -1.04px
        color black
      &.point
        border-bottom 1px solid $borderColor
        margin-bottom 2em
        border-top 1px solid $borderColor
        padding 2em 0
        &.tags
          border-bottom 0

    .tag-wrapper
      .custom-block
        background $lightGrey
        margin 1em
</style>
