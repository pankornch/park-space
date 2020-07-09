<template>
  <div style="height: auto; padding: 1rem 0 3rem 0; background-color: #F3F3F3" class="shadow-lg">
    <div class="container">
      <h3 style="text-align: center; text-decoration: underline;">พื้นที่จอดรถยอดนิยม</h3>
      <div class="row mt-5">
        <div
          class="col-md d-flex justify-content-center pb-5 mt-2"
          v-for="(item, index) in denseFactor"
          :key="index"
        >
          <div
            v-if="!loading"
            class="card rounded-circle mb-5 shadow-lg"
            style="width: 14rem; height: 14rem; background-color: #FEF3BA; border:none;"
          >
            <router-link :to="item.path" class="text-decoration-none h-100" style="color: black;">
              <img
                :src="item.image"
                class="card-img-top rounded-circle"
                alt="..."
                style="height: 100%; width: 100%;"
              />

              <div class="card-body">
                <p
                  class="card-text"
                  style="text-align: center;"
                >{{ item.title_th }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { mapGetters, mapState } from "vuex";
export default {
  name: "denseArea",
  data() {
    return {
      socket: "",
      loading: true
    };
  },
  props: ["api"],
  computed: {},
  mounted() {
    this.$store.dispatch("getDense", this.api);
  },
  computed: {
    ...mapGetters({ dense: "getterDense" }),
    denseFactor() {
      let api = this.api;
      let dense = this.dense;
      try {
        return api
          .map((el, index) => {
            return { ...el, ...dense[index] };
          })
          .sort((a, b) => (a.carIn > b.carIn ? -1 : 1))
          .slice(0, 3);
      } catch (error) {}
    }
  },
  watch: {
    denseFactor(a, b) {
      if (a && b) this.loading = false;
    }
  }
};
</script>

<style scoped>
@media only screen and (max-width: 480px) {
}
</style>