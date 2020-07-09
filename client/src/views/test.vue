<template>
  <div></div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    axios.post(
      "http://localhost:5000/api/test",
      {},
      {
        headers:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF8iOiIkMmIkMTAkN0x4ZktrMzFhbUw0UlBzMVVwQnVBekxBMjRaUkZxUE9aQmhWbXFIYjlEN1V5Qmd2RklDIiwiaWF0IjoxNTk0MTA1MTcyfQ.ynt4T31rv7arnkgQ_yGGwsLx9hWIWcNxPED-Yw1mL4E"
      }
    )
  }
};
</script>

<style>
</style>