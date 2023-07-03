import { defineStore } from 'pinia';
import apiEndpoints from "@/configs/apiEndpoints";
import api from "@/services/api";
import {ref, watchEffect} from 'vue'
import useAuthUser from "@/compositions/useAuthUser";
import useToken from "@/compositions/useToken";
export const useAuthStore = defineStore('authStore', () => {
  const user = ref('')
  const token = ref('')
  const {setAuthUser} = useAuthUser();
  const {setToken} = useToken();
  watchEffect(() => user.value = JSON.parse(localStorage.getItem('user')))
  watchEffect(() => token.value = localStorage.getItem('token'))

  async function login(username, password) {
    const response = await api.post(apiEndpoints.login, {login_id: username, password});
    const { status, data, code } = response;

    if (status) {
      const { token: tokenRes, user: userRes } = data.result;
      user.value = userRes
      token.value = tokenRes
      setToken(tokenRes)
      setAuthUser(JSON.stringify(userRes))
      return {
        status: true,
      };
    } else {
      return {
        status: false,
        errors: data?.errors,
        code: code,
        message: data?.message,
      };
    }
  }

  return { user, token, login }
})
