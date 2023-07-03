import {ref} from "vue";

const useAuthUser = (key = 'user') => {
  const authUser = ref(null);
  const getAuthUser = () => {
    authUser.value = localStorage.getItem(key);
    return authUser;
  }

  const setAuthUser = (value) => {
     localStorage.setItem(key, value);
  }

  return {getAuthUser, authUser, setAuthUser}
}

export default useAuthUser;
