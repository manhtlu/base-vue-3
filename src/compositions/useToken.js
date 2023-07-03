import {ref} from "vue";

const useToken = (key = 'token') => {
  const token = ref(null);
  const getToken = () => {
    token.value = localStorage.getItem(key);
    return token;
  }

  const setToken = (value) => {
    localStorage.setItem(key, value)
  }

  return {getToken, setToken, token}
}

export default useToken;
