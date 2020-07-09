<template>
  <div>
    <div class="container-fluid">
      <b-table
        striped
        responsive
        hover
        :items="factor"
        :fields="fields"
        style="text-align: center;"
      >
        <template v-slot:cell(edit)="data">
          <b-button
            @click="edit(data.item.path)"
            v-b-popover.hover.left="'edit : ' + data.item.path"
            variant="info"
          >Edit</b-button>
        </template>

        <template v-slot:cell(image_)="data">
          <b-img
            :src="data.item.image"
            v-b-popover.hover.left="data.item.path"
            style="width: 90px;"
          ></b-img>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import io from "socket.io-client";
import chat from "./chat";
export default {
  components: { chat },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      fields: [
        { key: "edit", stickyColumn: true },
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
        "image_"
      ]
    };
  },
  computed: {
    ...mapGetters({ api: "getterAPI", res: "getterDense" }),

    factor() {
      try {
        return this.api.map((e, index) => {
          return {
            ...e,
            ...this.res[index],
            ...{ inParking: this.res[index].carIn - this.res[index].carOut },
            ...{
              available:
                this.res[index].total -
                (this.res[index].carIn - this.res[index].carOut)
            }
          };
        });
      } catch (err) {}
    }
  },
  methods: {
    edit(path) {

      const index = this.factor.indexOf(this.factor.filter(e => e.path === path)[0])
      const data = this.factor[index]; // obj
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
      let lat = VALUE("lat");
      let long = VALUE("long");
      let image = VALUE("image");
      // DYNAMIC
      let total = VALUE("total");
      let carIn = VALUE("carIn");
      let carOut = VALUE("carOut");
      // READ ONLY
      let available = VALUE("available");
      let inParking = VALUE("inParking");
      //

      await this.$store.dispatch("updateData", [
        {
          title_th,
          title_en,
          path,
          lat: parseFloat(lat),
          long: parseFloat(long),
          image
        },
        { carIn, carOut, total }
      ]);

      this.$store.dispatch('getAPI');
    }
  }
};
</script>
<style scoped>
</style>