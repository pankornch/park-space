<template>
  <footer class="m-footer sticky">
    <p>Copyright © 2020 {{email}}. All Rights Reserved</p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      email: "pankorn.ch@gmail.com"
    };
  }
};
</script>

<style scoped>
.m-footer {
  height: 4vh;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: start;
  align-items: center;
}

.sticky {
  position: fixed;
  bottom: 0;
}

.m-footer p {
  color: white;
  margin: 0 1em;
}

@media screen and (max-width: 480px){
  p{
    font-size: 12px;
  }
}
</style>