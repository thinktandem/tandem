<template>
  <div>
    <form action="https://formspree.io/xknqannd" method="POST">
      <div class="name">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" required>
      </div>
      <div class="email">
        <label for="email">Email</label>
        <input type="email" name="_replyto" id="email" required>
      </div>
      <div class="additional-info">
        <label for="additional-info">How Can We Help You?</label>
        <textarea id="additional-info" name="additional-info"></textarea>
      </div>
      <div class="submit">
        <input type="submit" value="Send" class="submit">
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
