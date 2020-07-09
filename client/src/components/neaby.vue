<template>
  <div>
    <div class="d-flex justify-content-between pt-5">
      <h3>พื้นที่ใกล้เคียง</h3>
      <h3>
        <router-link to="/" class="text-decoration-none">ทั้งหมด</router-link>
      </h3>
    </div>
    <!--  -->
    <hr style="border: 2px solid grey;" />
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 shadow-sm pb-4">
      <div class="col" v-for="(item, index) in distance" :key="index" style="text-align: center;">
        <a :href="item.path" class="d-flex justify-content-around">
          <div class="card my-3 rounded-lg shadow-lg" style="width: 14rem;">
            <img
              :src="item.image"
              class="card-img-top"
              style="width: auto;
        height: 150px;
        overflow: hidden"
            />
          </div>
        </a>

        <div style="text-align: center;" class="d-flex justify-content-center">
          <div style="width: 80%">
            <p class="card-text">{{ lang === "th" ? item.title_th : item.title_en }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "nearby",
  props: ["distance"],

  computed: {
    ...mapGetters({ lang: "getterLang" })
  },

  destroyed() {
    this.$store.state.view = "";
  }
};
</script>

<style>
</style>