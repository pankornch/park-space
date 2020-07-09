<template>
  <div>
    <!-- Header -->
    <div style=" padding: 2rem 0;" class="d-flex shadow-sm bg-light">
      <router-link
        to="/"
        :class="{'w-75':isLogin, 'w-100':!isLogin}"
        style="text-align:center; text-decoration: none"
      >
        <h1>Home</h1>
      </router-link>

      <div class="w-50 d-flex justify-content-center align-items-center" v-if="isLogin">
        <button class="btn btn-danger h-75" @click="logout" style="text-align:center;">Logout</button>
      </div>
    </div>

    <!-- content -->
    <div class="container-fluid">
      <b-table
        responsive
        hover
        striped
        :items="dataLocation"
        :fields="fields"
        style="text-align: center; height: 75.8vh;"
      >
        <!-- EDIT BUTTON -->
        <template v-slot:cell(edit)="data">
          <b-button
            @click="edit(data.index)"
            v-b-popover.hover.left="'edit : ' + data.item.path"
            variant="info"
          >Edit</b-button>
        </template>

        <!-- IMAGE -->

        <template v-slot:cell(image)="data">
          <div class="d-flex justify-content-around">
            <p class="text-break w-50">{{ data.item.image}}</p>
            <img
              :src="data.item.image"
              v-b-popover.hover.left="data.item.path"
              style="width: 90px;"
            />
          </div>
        </template>
      </b-table>
      <!-- end table  -->
    </div>
     <chat/>
    <!--  -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import chat from './chat'
export default {
  components: {chat},
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      fields: [
        { key: "edit", stickyColumn: true },
        { key: "id", sortable: true },
        "title_th",
        "title_en",
        "path",
        { key: "total", sortable: true },
        { key: "carIn", sortable: true },
        { key: "carOut", sortable: true },
        { key: "available", sortable: true },
        { key: "inParking", sortable: true },
        { key: "position.lat", label: "Latitude", sortable: true },
        { key: "position.long", label: "Longitude", sortable: true },
        "image"
      ]
    };
  },
  computed: {
    ...mapGetters({ dataLocation: "getterLocation" }),
    ...mapGetters({ isLogin: "getterisLogin" })
  },
  methods: {
    edit(index) {
      const data = this.dataLocation[index]; // obj
      const h = this.$createElement;
      const style = {
        div: "d-flex justify-content-between align-items-center my-1",
        input: "w-75"
      };
      // loop in Obj
      // const arr = [];
      // for (let e in data) arr.push({ [e]: data[e] });

      const TITLE = `${data.title_th}, ${data.path.toUpperCase()}`;

      // Using HTML : h('div', { domProps: { innerHTML: 'Title from <i>HTML<i> string' } })

      const SET_HTML = (v, l = null, b = false) => {
        if (!l) l = v;
        return h("div", { class: [style.div] }, [
          h("label", l.charAt(0).toUpperCase() + l.slice(1)),
          h("b-form-input", {
            props: {
              value: v !== "lat" && v !== "long" ? data[v] : data.position[v],
              id: v,
              readonly: b
            },
            class: [style.input]
          })
        ]);
      };
      const CONTENT = h("div", { class: ["px-2"] }, [
        SET_HTML("title_th", "title TH"),
        SET_HTML("title_en", "title EN"),
        SET_HTML("path"),
        SET_HTML("total"),
        SET_HTML("carIn", "Car In"),
        SET_HTML("carOut", "Car Out"),
        SET_HTML("available", "", true),
        SET_HTML("inParking", "In Parking", true),
        SET_HTML("lat", "latitude"),
        SET_HTML("long", "longitude"),
        SET_HTML("image")
      ]);

      this.$bvModal
        .msgBoxConfirm([CONTENT], {
          title: [TITLE]
        })
        .then(v => {
          if (v) {
            this.setData(data);
          }
        });
    },

    async setData(data) {
      const VALUE = v => document.getElementById(v).value;
      // STATIC
      let title_th = VALUE("title_th");
      let title_en = VALUE("title_en");
      let path = VALUE("path");
      let total = VALUE("total");
      let lat = VALUE("lat");
      let long = VALUE("long");
      let image = VALUE("image");

      // INPUT
      let carIn = VALUE("carIn");
      let carOut = VALUE("carOut");

      // READ ONLY
      let available = VALUE("available");
      let inParking = VALUE("inParking");
      //

      await this.$store.dispatch("updateData", [
        {
          id: parseInt(data.id),
          title_th,
          title_en,
          path,
          total: parseInt(total),
          lat: parseFloat(lat),
          long: parseFloat(long),
          image
        },
        { carIn, carOut }
      ]);
      this.$store.dispatch("requestData");
    },

    login() {
      this.$store.dispatch("getLogin", ["login", this.form]);
    },

    logout() {
      this.form.password = "";
      this.$store.dispatch("getLogin", ["logout"]);
      this.$router.push("/");
    },

  },
  mounted() {
    this.$store.dispatch("getVerifyToken");
  }
};
</script>
<style>
</style>