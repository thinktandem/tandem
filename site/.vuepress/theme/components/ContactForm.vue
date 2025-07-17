<template>
  <div class="contact-form">
    <div class="contact-form-wrapper">
      <form name="contact" method="POST" netlify v-if="showForm">
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
            type="hidden"
            name="form-name"
            value="contact"
          >
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
            type="submit"
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
    contactUs(event) {
      event.target.form.submit();
      this.busy = true;
      this.buttonText = 'Sending...';

      setTimeout(() => {
        this.resetForm();
      }, 1000)
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
      font-size 1.2em
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
      font-size 1em
      font-family "Poppins", "Helvetica Neue", Arial, sans-serif
      &:focus
        outline 1px solid $borderColor
        outline-offset 5px
    textarea
      height 216px
      font-family "Poppins", "Helvetica Neue", Arial, sans-serif
    input[type=button], input[type=submit]
      padding 1.2em 3em
      width 25%
      margin auto
      border 0 solid $borderColor
      -webkit-box-sizing border-box
      -moz-box-sizing border-box
      box-sizing border-box
      font-family "Poppins", "Helvetica Neue", Arial, sans-serif
      font-size 16px
      &.busy
        background-color $tandemPink
        color #ffffff
        opacity .50
      @media (max-width: $MQMobile)
        width 100%
      &:hover
        background-color $tandemPink
        color #ffffff
        transition all 0.2s
    input
      &:focus
        outline none
    .error
      color red
      font-weight 700
      ul
        li
          font-family "Poppins", "Helvetica Neue", Arial, sans-serif
          font-size .8em
          font-weight 300
          margin-left 1em
    .thanks
      display flex
      font-size 2.2em
      line-height 2
      letter-spacing -0.19rem
      justify-content space-evenly
      align-items center
      @media (max-width: $MQMobile)
        display block
        font-size 1.2em
        letter-spacing -0.09rem
    @media (max-width: $MQMobile)
      margin 1.67em

</style>
