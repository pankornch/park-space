<template>
  <div>
    <background />
    <content-area />
    <dense-area />
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
  }
};
</script>

<style scoped>
</style>
