<template>
  <aside>
    <h3>Sign in Anonymously</h3>
    <button type="button" @click="auth.signInAnonymously()">Sign In</button>

    <div v-if="newUser">
      <h3>Sign Up for a New Account</h3>
      <a href="#" @click="newUser = false">Returning User?</a>
    </div>
    <div v-else>
      <h3>Sign In with Email</h3>
      <a href="#" @click="newUser = true">New user?</a>
    </div>

    <label for="email">Email</label>
    <br />
    <input v-model="email" placeholder="email" type="email" class="input" />

    <label for="password">Password</label>
    <br />
    <input v-model="password" type="password" class="input" />

    <br />
    <button
      class="button is-info"
      :class="{ 'is-loading': loading }"
      @click="signInOrCreateUser()"
    >
      {{ newUser ? "Sign Up" : "Login" }}
    </button>

    <p class="has-text-danger" v-if="errorMessage">{{ errorMessage }}</p>
  </aside>
</template>
<script lang="ts">
import { ref } from "@vue/reactivity";
import { defineComponent } from "vue";
import { auth } from "../firebase";
export default defineComponent({
  setup() {
    let newUser = ref(false);
    let email = ref("");
    let password = ref("");
    let errorMessage = ref("");
    let loading = ref(false);

    const signInOrCreateUser = async () => {
      loading.value = true;
      errorMessage.value = "";
      try {
        if (newUser) {
          await auth.createUserWithEmailAndPassword(
            email.value,
            password.value
          );
        } else {
          await auth.signInWithEmailAndPassword(email.value, password.value);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          errorMessage.value = error.message;
        }
      }

      loading.value = false;
    };

    return {
      auth,
      newUser,
      email,
      password,
      errorMessage,
      loading,
      signInOrCreateUser,
    };
  },
});
</script>
