<template>
  <div>
    <b-button class="chat-head" @click="open">chat</b-button>
    <!-- <div class="close-window" v-if="show" @click="show = false"></div> -->
    <div class="arrow" v-if="show"></div>
    <!--  -->
    <div v-if="show" class="chat-window">
      <!--  -->
      <p class="header" v-if="!conv">Home</p>
      <p class="header_" v-else @click="conv = false, chat=[]">back</p>
      <!--  -->
      <div class="chat-area">
        <div class="chat-message">

          <div v-if="!conv">
            <div v-for="m in messages" :key="m.index">
              <div class="list-client" @click="openConv(m)">
                <span>{{m.id}}</span>
              </div>
            </div>
          </div>

          <div class="conversation" v-else>
            <div>
              <div v-for="c in chat" :key="c.id">
                <p v-for="(a, index) in c.msg" :key="index">{{c.id}}: {{a}}</p>
              </div>
            </div>
          </div>

        </div>

        <div class="chat-input">
          <input v-model="message" @keyup.enter="sendMessage" />
          <b-button @click="sendMessage">Send</b-button>
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
      show: true,
      message: "",
      conv: false,
      chat: []
    };
  },
  methods: {
    open() {
      this.show = !this.show;
    },
    sendMessage() {
      if (this.message.length == 0) return;
      this.$store.dispatch("sendMessage", this.message);
      this.message = "";
    },
    openConv(e) {
      this.conv = true;
      this.chat.push(e);
    }
  },
  computed: {
    ...mapGetters({ messages: "getterMessages" })
  },
  mounted() {
    this.$store.dispatch("getMessage");
  }
};
</script>

<style scoped>
.header {
  font-weight: 600;
  height: 0.5em;
  font-size: 14px;
}
.header_ {
  cursor: pointer;
  text-decoration: underline;
  font-weight: 600;
  height: 0.5em;
  font-size: 14px;
}
.chat-head {
  position: absolute;
  top: 2em;
  right: 1.5em;
  width: 60px;
  height: 60px;
  border-radius: 100%;
}

.arrow {
  position: fixed;
  top: 5.7em;
  right: 2.1em;
  z-index: 1;
  width: 0;
  height: 0;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;

  border-bottom: 21px solid #f0efef;
}

.chat-window {
  position: fixed;
  background: #f0efef;
  width: 18em;
  height: 22em;
  top: 7em;
  right: 1em;
  padding: 1em;
  border-radius: 1.5em;
  -webkit-box-shadow: 0px 0px 40px -12px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 40px -12px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 40px -12px rgba(0, 0, 0, 0.75);
}

.chat-area {
  display: grid;
  grid-template-rows: 5fr 1fr;
  width: 100%;
  height: 95%;
  border-radius: 0.3em;
}
.chat-message {
  overflow: auto;
  background-color: #c2d4dd;
  padding: 1em;
  height: 100%;
  width: 100%;
  border-radius: 0.3em;
}

.chat-input input {
  padding: 0 0.5em;
  height: 70%;
  width: 70%;
  border-radius: 0.5em;
  border: none;
  outline: none;
}

.chat-input {
  margin-top: 0.5em;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.chat-input button {
  height: 35px;
}

.close-window {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
}

.list-client {
  cursor: pointer;
  display: block;
  padding: 0.5em 0;
}

@media screen and (max-width: 480px) {
  .chat-window {
    position: fiexd;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
}
</style>