<template>
  <div>
    <div id="bg"></div>

    <!-- Header -->
    <div class="container-fluid">
      <!-- Logo -->
      <div
        class="demo"
        style="position: absolute;
              top: 0%;
              left: 0%;
              padding: 1.5rem"
      >
        <h1 class="header_1" style="text-transform: uppercase;">Park space</h1>
        <h6 class="header_2" style="text-align: center;">University of Phayao</h6>
      </div>

      <!-- Language -->
      <div
        @click="setLang"
        style="position: absolute;
              top: 0%;
              right: 0%;
              padding: 1.5rem"
      >
        <img
          v-if="lang !== 'th'"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_Thailand.svg/1200px-Flag_of_Thailand.svg.png"
          style="cursor: pointer; height: 2.5rem; width: 4rem; border-radius: 10px;"
        />
        <!-- th -->
        <img
          v-else
          src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
          style="cursor: pointer; height: 2.5rem; width: 4rem; border-radius: 10px;"
        />
        <!-- en -->
      </div>

      <!-- Paragraph -->
      <div
        style="position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;"
      >
        <h4>ยินดีต้อนรับเข้าสู่ PARK SPACE</h4>
        <h4>ที่จะช่วยให้คุณค้นหาพื้นที่จอดรถยนต์</h4>
        <h4>ในมหาวิทยาลัยพะเยา</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    data() {
      return {
        lang: location.getItem('lang')
      }
    },
    setLang() {
      let setlang = this.lang == 'th' ? 'en' : 'th'
      this.$store.dispatch('setLang', setlang);
    }
  },
  computed: {
    ...mapGetters({lang: 'getterLang'})
  },
  mounted() {
    localStorage.setItem('lang', 'th') 
  },
};
</script>

<style scoped>
#bg {
  height: 100vh;
  background-image: url("https://www.up.ac.th/th/assets/images/sliders/slide-bg/2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(2px);
  -webkit-filter: blur(2px);
}
.header_1,
.header_2 {
  color: #707070;
}

h4 {
  color: white;
  text-shadow: 2px 2px black;
}
@media only screen and (max-width: 480px) {
  .demo {
    width: 100%;
    text-align: center;
  }
  .header_1 {
    font-size: 1.5rem;
  }
  .header_2 {
    font-size: 0.5rem;
  }
  h4 {
    font-size: 1.2rem;
  }
}
</style>