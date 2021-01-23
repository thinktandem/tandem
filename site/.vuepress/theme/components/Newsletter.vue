<template>
  <div class="newsletter-form">
    <div class="newsletter-form-wrapper">
      <form v-if="showForm">
        <div
          v-if="error && error.message"
          class="error"
        >
          {{ error.message }}!
          <ul>
            <li
              v-for="e in error.errors"
              :key="e.message"
            >
              {{ e.errorType }}: {{ e.message }}
            </li>
          </ul>
        </div>
        <div class="email">
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            :disabled="busy"
            placeholder="Email"
            required
          >
        </div>
        <div class="submit">
          <input
            type="button"
            :disabled="busy"
            :value="buttonText"
            :class="{busy: busy}"
            @click="contactUs"
          >
        </div>
      </form>
      <div
        v-else
        class="thanks"
      >
        <div>
          <strong>Thanks for subscribing!</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',
  data() {
    return {
      busy: false,
      buttonText: 'Subscribe',
      email: null,
      error: null,
      name: null,
      message: null,
      showForm: true,
      tags: '',
    };
  },
  methods: {
    contactUs() {
      // Busy UX
      this.busy = true;
      this.buttonText = 'Subscribing...';
      this.error = [];

      // Add in tags if we can
      if (this.$page.frontmatter && this.$page.frontmatter.tags) {
        this.tags = Array.isArray(this.$page.frontmatter.tags) ? this.$page.frontmatter.tags.join(', ') : this.$page.frontmatter.tags;
      }

      // Get ready
      const xhr = new XMLHttpRequest();
      const url = 'https://api.hsforms.com/submissions/v3/integration/submit/6864374/3959100f-c27a-40f2-bd4e-26f5ef2aac00';
      const data = JSON.stringify({
        fields: [
          {name: 'email', value: this.email},
          {name: 'interests_last_form_submittal', value: this.tags},
          {name: 'hs_lead_status', value: 'Passive Interest'},
          {name: 'lead_source', value: 'Mailing List'},
        ],
        context: {
          pageUri: `https://thinktandem.io${this.$page.path}`,
          pageName: this.$page.title,
        },
      });
      // Prepare the request and response
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          this.resetForm();
        } else if (xhr.readyState == 4 && xhr.status == 400) {
          this.errorForm(JSON.parse(xhr.responseText));
        } else if (xhr.readyState == 4 && xhr.status == 403) {
          this.errorForm(JSON.parse(xhr.responseText));
        } else if (xhr.readyState == 4 && xhr.status == 404) {
          this.errorForm(JSON.parse(xhr.responseText));
        }
       };

      // Do it
      xhr.send(data);
    },
    errorForm(errors) {
      this.error = errors;
      this.busy = false;
      this.buttonText = 'Try again';
    },
    resetForm() {
      this.showForm = false;
      setTimeout(() => {
        this.busy = false;
        this.buttonText = 'Send';
        this.email = null;
        this.name = null;
        this.message = null;
        this.showForm = true;
      }, 5000);
    },
  },
};
</script>

<style lang="stylus">
.newsletter-form
  display flex
  width 98%
  background-color $lightGrey
  .newsletter-form-wrapper
    @media (max-width: $MQMobile)
      font-size typeScale.g
    margin 2em
    width 100%
    align-self center
    form
      display flex
      justify-content space-between
      align-items baseline
      @media (max-width: $MQMobile)
        display block
    input[type=email]
      width 100%
      padding 1em
      margin auto
      border 0 solid $lightGrey
      -webkit-box-sizing border-box
      -moz-box-sizing border-box
      box-sizing border-box
      { displayType }
      font-size 1em
      &:focus
        outline 1px solid $borderColor
        outline-offset 5px
    input[type=button]
      all unset
      { loadMore }
      &:hover
        padding-left 2rem
        padding-right 2rem
      &.busy
        background-color $tandemPink
        color #ffffff
        opacity .50
    input
      &:focus
        outline none
    .error
      color red
      font-weight 700
      ul
        li
          { displayType }
          font-size typeScale.small
          margin-left 1em
    .email, .submit
      width 48%
      @media (max-width: $MQMobile)
        width 100%
    .email
      @media (max-width: $MQMobile)
        margin-bottom 1em
    .thanks
      display flex
      font-size typeScale.d
      line-height 2
      letter-spacing -0.19rem
      justify-content space-evenly
      align-items center
      @media (max-width: $MQMobile)
        display block
        font-size typeScale.g
    @media (max-width: $MQMobile)
      margin 1.67em

</style>
