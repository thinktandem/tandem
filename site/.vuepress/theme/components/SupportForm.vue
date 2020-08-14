<template>
  <div
    id="mauticform_wrapper_supportrequest"
    class="mauticform_wrapper"
  >
    <form
      id="mauticform_supportrequest"
      autocomplete="false"
      role="form"
      method="post"
      action="https://mautic.thinktandem.io/form/submit?formId=2"
      data-mautic-form="supportrequest"
      enctype="multipart/form-data"
    >
      <div
        id="mauticform_supportrequest_error"
        class="mauticform-error"
      />
      <div
        id="mauticform_supportrequest_message"
        class="mauticform-message"
      />
      <div class="mauticform-innerform">
        <div
          class="mauticform-page-wrapper mauticform-page-1"
          data-mautic-form-page="1"
        >
          <div
            id="mauticform_supportrequest_first_name"
            data-validate="first_name"
            data-validation-type="text"
            class="mauticform-row mauticform-text mauticform-field-1 mauticform-required"
          >
            <label
              id="mauticform_label_supportrequest_first_name"
              for="mauticform_input_supportrequest_first_name"
              class="mauticform-label"
            >Name</label>
            <input
              id="mauticform_input_supportrequest_first_name"
              name="mauticform[first_name]"
              value=""
              class="mauticform-input"
              type="text"
            >
            <span
              class="mauticform-errormsg"
              style="display: none;"
            >This is required.</span>
          </div>

          <div
            id="mauticform_supportrequest_email"
            data-validate="email"
            data-validation-type="email"
            class="mauticform-row mauticform-email mauticform-field-2 mauticform-required"
          >
            <label
              id="mauticform_label_supportrequest_email"
              for="mauticform_input_supportrequest_email"
              class="mauticform-label"
            >Email</label>
            <input
              id="mauticform_input_supportrequest_email"
              name="mauticform[email]"
              value=""
              class="mauticform-input"
              type="email"
            >
            <span
              class="mauticform-errormsg"
              style="display: none;"
            >This is required.</span>
          </div>

          <div
            id="mauticform_supportrequest_type_of_support_needed"
            data-validate="type_of_support_needed"
            data-validation-type="select"
            data-validate-multiple="true"
            class="mauticform-row mauticform-select mauticform-field-3 mauticform-required"
          >
            <label
              id="mauticform_label_supportrequest_type_of_support_needed"
              for="mauticform_input_supportrequest_type_of_support_needed"
              class="mauticform-label"
            >Type of Support Needed</label>
            <select
              id="mauticform_input_supportrequest_type_of_support_needed"
              name="mauticform[type_of_support_needed][]"
              value=""
              class="mauticform-selectbox"
              multiple
            >
              <option value="Website Migration">
                Website Migration
              </option>                    <option value="Drupal Support">
                Drupal Support
              </option>                    <option value="WordPress Support">
                WordPress Support
              </option>                    <option value="Performance Audit">
                Performance Audit
              </option>                    <option value="SEO Audit">
                SEO Audit
              </option>
            </select>
            <span
              class="mauticform-errormsg"
              style="display: none;"
            >This is required.</span>
          </div>

          <div
            id="mauticform_supportrequest_please_provide_some_addit"
            class="mauticform-row mauticform-text mauticform-field-4"
          >
            <label
              id="mauticform_label_supportrequest_please_provide_some_addit"
              for="mauticform_input_supportrequest_please_provide_some_addit"
              class="mauticform-label"
            >Please Provide Some Additional Details</label>
            <textarea
              id="mauticform_input_supportrequest_please_provide_some_addit"
              name="mauticform[please_provide_some_addit]"
              class="mauticform-textarea"
            />
            <span
              class="mauticform-errormsg"
              style="display: none;"
            />
          </div>


          <div
            id="mauticform_supportrequest_recaptcha1"
            class="mauticform-row mauticform-div-wrapper mauticform-field-5"
          >
            <div
              class="g-recaptcha"
              data-sitekey="6Ldi0MMUAAAAAARYg2LvrR-8DB44Z2JWwyGDms8-"
              data-callback="verifyCallback_9c8f67dabc286dec24681e670cee0eb3"
            />
            <input
              id="mauticform_input_supportrequest_recaptcha1"
              name="mauticform[recaptcha1]"
              value=""
              class="mauticform-input"
              type="hidden"
            >
            <span
              class="mauticform-errormsg"
              style="display: none;"
            />
          </div>

          <input
            id="mauticform_input_contactrequest_lead_source"
            name="mauticform[lead_source]"
            value="Support Form"
            class="mauticform-hidden"
            type="hidden"
          >
          <input
            id="mauticform_input_contactrequest_lead_status"
            name="mauticform[lead_status]"
            value="In Progress"
            class="mauticform-hidden"
            type="hidden"
          >
          <div
            id="mauticform_supportrequest_submit"
            class="mauticform-row mauticform-button-wrapper mauticform-field-6"
          >
            <button
              id="mauticform_input_supportrequest_submit"
              type="submit"
              name="mauticform[submit]"
              value=""
              class="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      <input
        id="mauticform_supportrequest_id"
        type="hidden"
        name="mauticform[formId]"
        value="2"
      >
      <input
        id="mauticform_supportrequest_return"
        type="hidden"
        name="mauticform[return]"
        value=""
      >
      <input
        id="mauticform_supportrequest_name"
        type="hidden"
        name="mauticform[formName]"
        value="supportrequest"
      >
    </form>
    <script type="text/javascript">
      /** This section is only needed once per page if manually copying **/
      if (typeof MauticSDKLoaded == 'undefined') {
      var MauticSDKLoaded = true;
      var head            = document.getElementsByTagName('head')[0];
      var script          = document.createElement('script');
      script.type         = 'text/javascript';
      script.src          = 'https://mautic.thinktandem.io/media/js/mautic-form.js';
      script.onload       = function() {
      MauticSDK.onLoad();
      };
      head.appendChild(script);
      var MauticDomain = 'https://mautic.thinktandem.io';
      var MauticLang   = {
      'submittingMessage': "Please wait..."
      }
      }
    </script>
    <script type="text/javascript">
      function verifyCallback_9c8f67dabc286dec24681e670cee0eb3( response ) {
      document.getElementById("mauticform_input_supportrequest_recaptcha1").value = response;
      }
    </script>
    <script src="https://www.google.com/recaptcha/api.js" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="css">
  .mauticform_wrapper { margin: 10px auto; }
  .mauticform-innerform {}
  .mauticform-post-success {}
  .mauticform-name { font-weight: bold; font-size: 1.5em; margin-bottom: 3px; }
  .mauticform-description { margin-top: 2px; margin-bottom: 10px; }
  .mauticform-error { margin-bottom: 10px; color: red; }
  .mauticform-message { margin-bottom: 10px;color: green; }
  .mauticform-row { display: block; margin-bottom: 20px; }
  .mauticform-label { font-size: 0.8em; display: block; font-weight: bold; margin-bottom: 5px; }
  .mauticform-row.mauticform-required .mauticform-label:after { color: #e32; content: " *"; display: inline; }
  .mauticform-helpmessage { display: block; font-size: 0.9em; margin-bottom: 3px; }
  .mauticform-errormsg { display: block; color: red; margin-top: 2px; }
  .mauticform-selectbox, .mauticform-input, .mauticform-textarea { width: 100%; padding: 0.5em 0.5em; border: 1px solid #CCC; background: #fff; box-shadow: 0px 0px 0px #fff inset; border-radius: 4px; box-sizing: border-box; }
  select[multiple].mauticform-selectbox { height: 100px; }
  .mauticform-checkboxgrp-row {}
  .mauticform-checkboxgrp-label { font-weight: normal; }
  .mauticform-checkboxgrp-checkbox {}
  .mauticform-radiogrp-row {}
  .mauticform-radiogrp-label { font-weight: normal; }
  .mauticform-radiogrp-radio {}
  .mauticform-button-wrapper .mauticform-button.btn-default, .mauticform-pagebreak-wrapper .mauticform-pagebreak.btn-default { color: #5d6c7c;background-color: #ffffff;border-color: #dddddd;}
  .mauticform-button-wrapper .mauticform-button, .mauticform-pagebreak-wrapper .mauticform-pagebreak { display: inline-block;margin-bottom: 0;font-weight: 600;text-align: center;vertical-align: middle;cursor: pointer;background-image: none;border: 1px solid transparent;white-space: nowrap;padding: 6px 12px;font-size: 13px;line-height: 1.3856;border-radius: 3px;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}
  .mauticform-button-wrapper .mauticform-button.btn-default[disabled], .mauticform-pagebreak-wrapper .mauticform-pagebreak.btn-default[disabled] { background-color: #ffffff; border-color: #dddddd; opacity: 0.75; cursor: not-allowed; }
  .mauticform-pagebreak-wrapper .mauticform-button-wrapper {  display: inline; }
</style>
