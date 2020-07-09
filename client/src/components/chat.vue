<template>
  <div>
    <b-button class="chat-head" @click="open">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-plus-circle"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    </b-button>
    <div class="close-window" v-if="show" @click="show = false"></div>
    <!--  -->
    <div v-if="show" class="chat-window">
      <div v-if="displayChat" class="d-flex justify-content-between">
        <p class="edit_" @click="displayChat = false">Back</p>
        <p class="edit_" @click="name = '', displayChat=false">Remove</p>
      </div>

      <p class="edit" v-else>Welcome!</p>

      <div class="chat-area">
        <div :class="{'chat-message':displayChat, 'chat-message_':!displayChat}" id="chat_message">
          <div v-if="!displayChat" class="welcome">
            <label for="name">Name:</label>
            <input type="text" name="name" v-model.lazy="name" @keyup.enter="joinChat" />
            <b-button @click="joinChat">Ok</b-button>
          </div>

          <div v-else class="text-box">
            <div v-for="m in messages.msg" :key="m.id">
              <p>{{messages.name}}:{{m.m}}</p>
            </div>
          </div>
        </div>

        <div class="chat-input" v-if="displayChat">
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
      show: false,
      message: "",
      displayChat: false,
      name: ""
    };
  },

  methods: {
    open() {
      this.show = !this.show;
    },
    joinChat() {
      this.$store.dispatch("getUser", this.name);
      this.displayChat = true;
    },
    sendMessage() {
      if (this.message.length == 0) return;
      this.$store.dispatch("sendMessage", this.message);
      this.message = "";
      document.getElementById(
        "chat_message"
      ).scrollTop = document.getElementById("chat_message").scrollHeight;
    }
  },

  mounted() {
    this.$store.dispatch("getMessage");
    // setTimeout(() => {
    //   this.show = false
    // }, 10000);
  },
  updated() {
      this.$store.dispatch("getMessage");
  },

  computed: {
    ...mapGetters({ messages: "getterMessages" })
  },

  watch: {
    displayChat(a, b) {
      setTimeout(() => {
        document.getElementById(
          "chat_message"
        ).scrollTop = document.getElementById("chat_message").scrollHeight;
      }, 20);
    }
  }
};
</script>

<style scoped>
.chat-head {
  position: fixed;
  bottom: 3em;
  right: 1.5em;
  width: 60px;
  height: 60px;
  border-radius: 100%;
}

.chat-window {
  position: fixed;
  background: #f0efef;
  width: 18em;
  height: 22em;
  bottom: 3em;
  right: 6em;
  padding: 0.5em 1em 1em 1em;
  border-radius: 1.5em;

  -webkit-box-shadow: 0px 0px 40px -12px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 40px -12px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 40px -12px rgba(0, 0, 0, 0.75);
}

.chat-area {
  display: grid;
  grid-template-rows: 5fr 1fr;
  /* background-color: blanchedalmond; */
  width: 100%;
  height: 95%;
}
.chat-message {
  overflow: auto;
  display: flex;
  background-color: #c2d4dd;
  padding: 1em;
  height: 100%;
  width: 100%;
  border-radius: 0.3em;
}
.chat-message_ {
  overflow: auto;
  display: flex;
  background-color: #c2d4dd;
  padding: 1em;
  height: 112%;
  width: 100%;
  border-radius: 0.3em;
}

.chat-input {
  margin-top: 0.5em;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.chat-input input {
  padding: 0 0.5em;
  height: 70%;
  width: 70%;
  border-radius: 0.5em;
  border: none;
  outline: none;
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

.edit {
  font-weight: 600;
  height: 0.5em;
  font-size: 14px;
}
.edit_ {
  font-weight: 600;
  height: 0.5em;
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
}

.welcome {
  align-content: center;
  display: grid;
  grid-template-columns: 1fr 3fr;
  row-gap: 1em;
}

.welcome input {
  padding: 0 0.5em;
  width: 90%;
  border-radius: 0.5em;
  border: none;
  outline: none;
}

.welcome button {
  width: 90%;
  grid-column: 2 / span2;
  align-self: center;
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