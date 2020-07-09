<template>
  <div>
    <background />
    <content-area />
    <dense-area :api="api" />
    <about />
    <!-- <chat /> -->
  </div>
</template>

<script>
import background from "../components/background";
import contentArea from "../components/contentArea";
import denseArea from "../components/denseArea";
import about from "../components/about";
import chat from "../components/chat";
import { mapGetters } from "vuex";
export default {
  name: "mainPage",
  components: {
    background,
    contentArea,
    denseArea,
    about,
    chat
  },
  computed: {
    ...mapGetters({ api: "getterAPI" })
  }
};
</script>

<style scoped>
</style>
