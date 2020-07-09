 <template>
  <div>
    <div style="background-color: #F3F3F3" class="py-5 shadow-sm" id="park">
      <div class="container" style="height: auto;">
        <h3
          style=" text-decoration: underline; text-align: center; margin-bottom: 3rem;"
        >เลือกสถานที่</h3>

        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4">
          <div class="col" v-for="(item, index) in api" :key="index" style="text-align: center;">
            <router-link :to="item.path" class="d-flex justify-content-around">
              <div class="card my-3 rounded-lg shadow-lg" style="width: 14rem;">
                <img
                  :src="item.image"
                  class="card-img-top"
                  style="width: auto;
                  height: 150px;
                  overflow: hidden;"
                />
              </div>
            </router-link>

            <div style="text-align: center;" class="d-flex justify-content-center">
              <div style="width: 80%">
                <p class="card-text">{{lang === "th" ? item.title_th : item.title_en }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      data: []
    };
  },
  computed: {
    ...mapGetters({ api: "getterAPI", lang: "getterLang" })
  }
};
</script>

<style>
</style>