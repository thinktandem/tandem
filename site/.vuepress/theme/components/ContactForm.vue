<template>
  <div class="contact-form">
    <div class="contact-form-wrapper">
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
        <div class="name">
          <input
            id="name"
            v-model="name"
            type="text"
            name="name"
            :disabled="busy"
            placeholder="Name"
            required
          >
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
        <div class="message">
          <textarea
            id="message"
            v-model="message"
            name="message"
            :disabled="busy"
            placeholder="How Can We Help You?"
          />
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
        <img
          src="/images/celery-man.gif"
          alt="Man celebrating a new connection"
        >
        <div>
          <strong>Thanks for contacting us!</strong><br>
          We'll be in touch soon!
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
      buttonText: 'Send',
      email: null,
      error: null,
      name: null,
      message: null,
      showForm: true,
      tag: null,
    };
  },
  methods: {
    contactUs() {
      // Busy UX
      this.busy = true;
      this.buttonText = 'Sending...';
      this.error = [];

      // Add in tags if we can
      if (this.$page.frontmatter && this.$page.frontmatter.tag) {
        this.tag = Array.isArray(this.$page.frontmatter.tag) ? this.$page.frontmatter.tag.join(', ') : this.$page.frontmatter.tag;
      }

      // Get ready
      const xhr = new XMLHttpRequest();
      const url = 'https://api.hsforms.com/submissions/v3/integration/submit/6864374/07fc0cf1-4a35-4d3d-b2ec-d1586a4494da';


      const data = JSON.stringify({
        fields: [
          {name: 'email', value: this.email},
          {name: 'firstname', value: this.name},
          {name: 'message', value: this.message},
          {name: 'hs_lead_status', value: 'Lead'},
          {name: 'lead_source', value: 'Contact Form'},
          {name: 'interests_last_form_submittal', value: this.tag || 'contact'},
          {name: 'last_conversion_point', value: this.$page.title || 'contact'},
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
.contact-form
  display flex
  width 98%
  background-color $lightGrey
  .contact-form-wrapper
    margin 2em
    width 100%
    @media (max-width: $MQMobile)
      font-size typeScale.g
    margin 3em
    width 100%
    input[type=text], input[type=email], textarea
      padding 1em
      width 100%
      margin auto
      margin-bottom 2em
      border 0 solid $lightGrey
      -webkit-box-sizing border-box
      -moz-box-sizing border-box
      box-sizing border-box
      { displayType }
      &:focus
        outline 1px solid $borderColor
        outline-offset 5px
    textarea
      height 216px
      { displayType }
    input[type=button]
      { tandemButton }
      width 25%
      &.busy
        background-color $tandemPink
        color #fff
        opacity 0.50
      @media (max-width: $MQMobile)
        width 100%
      &:hover
        background-color $tandemPink
        color #fff
        transition all 0.2s
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
          font-weight 300
          margin-left 1em
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
        letter-spacing -0.09rem
    @media (max-width: $MQMobile)
      margin 1.67em

</style>
