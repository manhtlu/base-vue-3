<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div>
        <input type="text" name="login_id" id="login_id" v-model="loginId">
        <div v-if="formError.login_id">{{formError.login_id[0]}}</div>
      </div>
      <div>
        <input type="password" v-model="password">
        <div v-if="formError.password">{{formError.password[0]}}</div>
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {useAuthStore} from "@/stores/useAuthStore";
import useSetError from "@/compositions/useSetError";
import { useNotification } from "@kyvg/vue3-notification";

const {setError, error, formError} = useSetError()
const { notify}  = useNotification()
const loginId = ref('')
const password = ref('')
const {login} = useAuthStore();
const handleSubmit = async () => {
  const { status, code, message, errors } = await login(loginId.value, password.value)

  console.log(status, code, message)
  if (!status) {
    setError(code, message, errors)
    if (error.value) {
      notify({
        title: error.value
      });
    }
  }
}
</script>

<style scoped>

</style>
