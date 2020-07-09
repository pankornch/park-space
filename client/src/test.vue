<template>
  <div>{{data}}</div>
</template>

<script>
import io from "socket.io-client";

export default {
  data() {
    return {
      socket: {},
      query: {},
      data: []
    };
  },
  created() {
    this.socket = io("http://localhost:5050");
  },
  mounted() {
    this.socket.emit("ict")
    .on("query", data => {
      this.data = data;
    });
  }
};
</script>

<style>
</style>