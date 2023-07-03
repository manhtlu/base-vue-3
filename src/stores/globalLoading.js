import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalLoadingStore = defineStore('globalLoading', () => {
  const isLoading = ref(false)
  function displayLoading() {
    isLoading.value = true;
  }
  function hideLoading() {
    isLoading.value = false;
  }

  return { displayLoading, isLoading, hideLoading }
})
