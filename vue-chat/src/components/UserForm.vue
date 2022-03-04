<template>
  <form action=""></form>
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
</template>

<script lang="ts">
import { auth } from "../firebase";
import { defineComponent } from "vue";
import { ref, PropType } from "vue";

export default defineComponent({
  props: {
    isNewUser: { type: Boolean as PropType<boolean>, required: true },
  },

  setup(isNewUser) {
    let email = ref("");
    let password = ref("");
    let errorMessage = ref("");
    let loading = ref(false);

    const signInOrCreateUser = async () => {
      loading.value = true;
      errorMessage.value = "";
      try {
        if (isNewUser.isNewUser) {
          await auth.createUserWithEmailAndPassword(
            email.value,
            password.value
          );
        } else {
          await auth.signInWithEmailAndPassword(email.value, password.value);
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
