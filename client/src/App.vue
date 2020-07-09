<template>
  <div id="app">
    <router-view />
    <footer-m />
    <!-- <test /> -->
  </div>
</template>
<script>
import test from "./test";
import footerM from "./components/footer";

export default {
  components: {
    test,
    footerM
  },
  created() {
    this.$store.dispatch("getAPI");
    this.$store.dispatch("getDense");
  }
};
</script>
