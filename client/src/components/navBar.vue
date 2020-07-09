<template>
  <div>
    <b-navbar toggleable="lg" type="light" style="background-color: #3c7bc9"> 
      <b-navbar-brand>
        <router-link to="/">
          <img src="../assets/logo.png" alt style="width:20%;" />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <router-link
            to="/" 
            class="nav_item"
          >หน้าหลัก</router-link>

          <a href="/#park"
             class="nav_item"
          >พื้นที่จอดรถ</a>
          
          <a href="/#about"
             class="nav_item"
          >เกี่ยวกับเรา</a>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.nav_item {
  text-decoration: none; color: white; font-size: 1.5rem; padding:0 4rem;
}
</style>
  