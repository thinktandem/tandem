<template>
  <div class="content-wrapper-tandem content-wrapper-fourohfour">
    <h1>404 - Not found</h1>

    <blockquote>
      <p>{{ chosen.message }}</p>
      <ul>
        <li>{{ chosen.author }}</li>
      </ul>
    </blockquote>

    <div class="custom-block point vids">
      <h2>
        Enjoy a random 404 video.
      </h2>
      <div>
        <ClientOnly>
          <YouTube :vid="chosen.vid" />
        </ClientOnly>
      </div>
    </div>

    <div class="custom-block point what-we-do">
      <h2>
        Or explore more of what we do.
      </h2>
      <p>
        We offer <strong>strategy</strong>, <strong>design</strong> and <strong>development</strong> services across industries and using a wide array of tech.
        <br>
        <br>
        Read more about each below.
      </p>
    </div>

    <TagGrid prefix="/" />
  </div>
</template>
<script>
import TagGrid from '@theme/components/TagGrid';
import YouTube from '@theme/../components/YouTube';

// 404 messages
const msgs = [
  {
    author: 'Bruce Hornsby',
    message: `There is nothing here. That's just the way it is.`,
    vid: 'cOeKidp-iWo',
  },
  {
    author: 'Bono',
    message: `And I still haven't found what I'm looking for.`,
    vid: 'e3-5YC_oHjE',
  },
  {
    author: 'Eric Carmen',
    message: `All by myself. Don't wanna be. All by myself.`,
    vid: 'iN9CjAfo5n0',
  },
  {
    author: 'Men at Work',
    message: `I'll be trapped, and here I'll have to stay.`,
    vid: 'SECVGN4Bsgg',
  },
  {
    author: 'BSB',
    message: `Tell me why I can't be there where you are?`,
    vid: 'aBt8fN7mJNg',
  },
  {
    author: 'Lisa Loeb',
    message: 'No no no, bad',
    vid: 'i9HGwRbMiVY',
  },
  {
    author: 'David Hasselhoff',
    message: 'The phoenix rise again',
    vid: 'ZTidn2dBYbY',
  },
  {
    author: 'Björk',
    message: `It's oh so quiet, It's oh so still`,
    vid: 'MNdFYbe1XoM',
  },
  {
    author: 'The Beatles',
    message: `He's a real nowhere man`,
    vid: '8scSwaKbE64',
  },
  {
    author: 'The Zombies',
    message: `She's not there`,
    vid: 'it68QbUWVPM',
  },
];

export default {
  components: {TagGrid, YouTube},
  data() {
    return {
      chosen: {},
    };
  },
  mounted() {
    this.chosen = this.getMsg();
  },
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)];
    },
  },
};
</script>


<style lang="stylus">
.content-wrapper-tandem
  &.content-wrapper-fourohfour
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
      &.point
        { cb_point }
        &.what-we-do
          border 0
        &.vids
          div
            width 100%
          .video-responsive
            margin-top 0
</style>
