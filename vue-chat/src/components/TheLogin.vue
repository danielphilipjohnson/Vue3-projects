<template>
  <aside>
    <h3>Sign in Anonymously</h3>
    <button type="button" @click="signInAnonymously(auth)">Sign In</button>

    <div v-if="newUser">
      <h3>Sign Up for a New Account</h3>
      <a href="#" @click="newUser = false">Returning User?</a>
    </div>
    <div v-else>
      <h3>Sign In with Email</h3>
      <a href="#" @click="newUser = true">New user?</a>
    </div>

    <UserForm :isNewUser="newUser" />
  </aside>
</template>
<script lang="ts">
import { getAuth, signInAnonymously } from "firebase/auth";

import { ref } from "@vue/reactivity";
import { defineComponent } from "vue";

import UserForm from "../components/UserForm.vue";
export default defineComponent({
  components: {
    UserForm,
  },
  setup() {
    let newUser = ref(false);
    const auth = getAuth();
    return {
      auth,
      newUser,
      signInAnonymously,
    };
  },
});
</script>
