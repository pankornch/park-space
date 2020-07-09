<template>
  <div>
    <div v-if="!loading">
      <nav-bar />
      <div
        style="height: 5.5rem; background-color: #6f9fd8;"
        class="d-flex justify-content-center align-items-center"
      >
        <h1 class="text-uppercase text-white">park space</h1>
      </div>

      <div class="bg-light">
        <h2
          style="text-align: center; padding: 3rem 0;"
        >{{ lang === "th" ? data.title_th : data.title_en }}</h2>
        <!--  -->

        <div class="container-fluid h-auto px-5 pb-5">
          <b-row class="pb-5 shadow-sm">
            <div class="col-lg">
              <b-img
                :src="data.image"
                fluid-grow
                alt="Fluid-grow image"
                style="border-radius: 30px; max-height: 22em; oject-fit: cover;"
                class="shadow-lg"
              ></b-img>
            </div>

            <b-col style="text-align: center; display: flex; align-items: center">
              <b-row align-h="between">
                <div class="item-header">
                  <h5>จำนวนพื้นที่ทั้งหมด</h5>
                  <h5>{{ data.total}}</h5>
                </div>

                <div class="item">
                  <h5>จำนวนรถจอดในพื้นที่</h5>
                  <h5>{{ data.inParking}}</h5>
                </div>

                <div class="item">
                  <h5>จำนวนลานจอดว่าง</h5>
                  <h5>{{ data.available}}</h5>
                </div>

                <div class="item">
                  <h5>จำนวนรถขาเข้า</h5>
                  <h5>{{ data.carIn}}</h5>
                </div>

                <div class="item">
                  <h5>จำนวนรถขาออก</h5>
                  <h5>{{ data.carOut}}</h5>
                </div>
              </b-row>
            </b-col>
          </b-row>
          <nearby-component :distance="data.distance" />
        </div>

        <!--  -->
      </div>
    </div>

    <div
      v-else
      style="height: 100vh;"
      class="d-flex justify-content-center align-items-center bg-light"
    >
      <div id="loading" class="spinner-grow" role="status"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import navBar from "../components/navBar";
import nearbyComponent from "../components/neaby";
export default {
  name: "viewPage",
  data() {
    return {
      path: this.$route.params.id,
      socket: {}
    };
  },
  components: {
    navBar,
    nearbyComponent
  },
  created() {
    this.$store.dispatch("getView", this.path);
    window.scroll({top: 0});
  },
  computed: {
    ...mapGetters({ data: "getterView", lang: "getterLang" }),
    loading() {
      if (this.data === "") {
        return true;
      }
      return false;
    }
  }
};
</script>
<style scoped>
.item-header {
  background-color: #d6d6d8;
  padding: 1rem;
  width: 100%;
  border-radius: 1em;
}
.item {
  background-color: #e4e4e5;
  padding: 1rem;
  width: 45%;
  margin-top: 2em;
  border-radius: 1em;
}
@media screen and (max-width: 990px) {
  .item-header {
    margin-top: 3em;
  }
}
</style>