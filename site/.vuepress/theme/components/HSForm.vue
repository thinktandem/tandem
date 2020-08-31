<template>
  <div>
    <script src="//js.hsforms.net/forms/shell.js" />
    <div id="hs_form_injector" />
  </div>
</template>

<script>
export default {
  props: {
    delay: {
      type: Number,
      default: 500,
    },
    form: {
      type: String,
      required: true,
    },
    portal: {
      type: String,
      default: '6864374',
    },
  },
  data() {
    return {};
  },
  watch: {
    form: function() {
      this.injectForm();
    },
  },
  mounted() {
    this.injectForm();
  },
  methods: {
    injectForm() {
      // Get and reset the element
      const hsFormInjector = document.getElementById('hs_form_injector');
      hsFormInjector.innerHTML = '';

      // Attempt to load the form
      const iid = setInterval(() => {
        if (hbspt) {
          // Add the new script tag
          const injector = document.createElement('script');
          injector.type = 'text/javascript';
          injector.text = `hbspt.forms.create({
            portalId: '${this.portal}',
            formId: '${this.form}',
          });`;
          hsFormInjector.appendChild(injector);
          window.clearInterval(iid);
        }
      }, this.delay);
    },
  },
};
</script>

<style lang="stylus">
#hs_form_injector
  display flex
  flex-wrap wrap
  justify-content space-between
  width 100%
</style>
