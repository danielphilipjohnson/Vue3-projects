<template>
  <form>
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
      @click.prevent="signInOrCreateUser()"
    >
      {{ isNewUser ? "Sign Up" : "Login" }}
    </button>

    <p class="has-text-danger" v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<script lang="ts">
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { defineComponent } from "vue";
import { ref, PropType } from "vue";

export default defineComponent({
  props: {
    isNewUser: { type: Boolean as PropType<boolean>, required: true },
  },

  setup(isNewUser) {
    const auth = getAuth();

    let email = ref("");
    let password = ref("");
    let errorMessage = ref("");
    let loading = ref(false);

    const signInOrCreateUser = async () => {
      loading.value = true;
      errorMessage.value = "";
      try {
        if (isNewUser.isNewUser) {
          await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
          );
        } else {
          await signInWithEmailAndPassword(auth, email.value, password.value);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          //TODO handle error nicely when displaying feedback to user
          errorMessage.value = error.message;
        }
      }

      loading.value = false;
    };

    return {
      auth,
      email,
      password,
      errorMessage,
      loading,
      signInOrCreateUser,
    };
  },
});
</script>
