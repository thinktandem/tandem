<template>
  <div>
    <form
      action="https://formspree.io/xyynaykb"
      method="POST"
    >
      <div class="name">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
        >
      </div>
      <div class="email">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          name="_replyto"
          required
        >
      </div>
      <div class="type-support">
        <label for="type-support">Type of Support Needed</label>
        <select
          id="type-support"
          name="type-support"
          multiple
          required
        >
          <option value="Website Migration">
            Website Migration
          </option>
          <option value="Drupal Support">
            Drupal Support
          </option>
          <option value="WordPress Support">
            WordPress Support
          </option>
          <option value="Performance Audit">
            Performance Audit
          </option>
          <option value="SEO Audit">
            SEO Audit
          </option>
        </select>
      </div>
      <div class="additional-info">
        <label for="additional-info">Please Provide Some Additional Details</label>
        <textarea
          id="additional-info"
          name="additional-info"
        />
      </div>
      <div class="submit">
        <input
          type="submit"
          value="Send"
          class="submit"
        >
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">

</style>
