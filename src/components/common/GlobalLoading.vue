<template>
  <div>
    <div class="vld-parent">
      <loading :active="isLoading"
               :can-cancel="true"
               :on-cancel="onCancel"
               :is-full-page="true"></loading>
    </div>
  </div>
</template>

<script setup>
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import Loading from 'vue3-loading-overlay';
import {useGlobalLoadingStore} from "@/stores/globalLoading";
import {storeToRefs} from "pinia";

const loadingStore = useGlobalLoadingStore();
const { isLoading } = storeToRefs(loadingStore)

const onCancel = () => {}
</script>

<style scoped>

</style>
