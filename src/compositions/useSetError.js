import {ref} from "vue";
import {ERROR_CODE_VALIDATE} from "@/configs/http_error_code";

const useSetError = () => {
  const error = ref(null)
  const formError = ref({})

  const setError = (code, message, errors) => {
    if (code === ERROR_CODE_VALIDATE) {
      formError.value = errors
    } else {
      error.value = message
    }
  }

  return {error, formError, setError}
}

export default useSetError;
