<template>
  <div>
    <form
      action="https://formspree.io/xknqannd"
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
      <div class="additional-info">
        <label for="additional-info">How Can We Help You?</label>
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
export default {
  name: 'ContactForm',
};
</script>

<style lang="stylus">

</style>
