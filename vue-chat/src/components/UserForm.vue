<template>
  <form>
    <label for="email">Email</label>
    <br />
    <input v-model="email" placeholder="email" type="email" class="input" />

    <label for="password">Password</label>
    <br />
    <input v-model="password" type="password" class="input" />

    <br />

    <ButtonSignIn :loading="loading" :isNewUser="isNewUser" @click="signUp()" />

    <p class="has-text-danger" v-if="errorMessage">{{ errorMessage }}</p>
  </form>
</template>

<script lang="ts">
import { signInOrCreateUser, AuthErrorHandle } from "../firestore-client/index";
import ButtonSignIn from "./firebase/ButtonSignIn.vue";
import { defineComponent, Ref } from "vue";
import { ref, PropType } from "vue";
import { FirebaseError } from "@firebase/util";

export default defineComponent({
  components: {
    ButtonSignIn,
  },
  props: {
    isNewUser: { type: Boolean as PropType<boolean>, required: true },
  },

  setup(isNewUser) {
    let email = ref("");
    let password = ref("");
    let errorMessage: Ref<string | null> = ref(null);
    let loading = ref(false);

    const signUp = async () => {
      loading.value = true;

      const error = await signInOrCreateUser(
        isNewUser.isNewUser,
        email,
        password
      );

      if (error instanceof FirebaseError) {
        errorMessage.value = AuthErrorHandle(error);
        loading.value = false;
      }
    };

    return {
      email,
      password,
      errorMessage,
      loading,
      signInOrCreateUser,
      signUp,
    };
  },
});
</script>
