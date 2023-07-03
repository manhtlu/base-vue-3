<template>
  <div>
    <div>
      <label for="user_name">User name</label>
      <input type="text" name="user_name" id="user_name" v-model="user_name">
    </div>
    <div>
      <label for="check_box">Active</label>
      <input type="checkbox" name="check_box" id="check_box">
    </div>
    <div>
      <label for="age">Age</label>
      <input type="number" name="age" id="age">
    </div>
    <div>
      <label for="tag">Age</label>
      <select name="tag" id="tag">
        <option value="tag_1">tag_1</option>
        <option value="tag_2">tag_2</option>
        <option value="tag_3">tag_3</option>
      </select>
    </div>
    <div>
      <label for="active_date">Active Date</label>
      <date-picker v-model="active_date" />
      {{ active_date }}
    </div>
  </div>
</template>

<script setup>
import DatePicker from "@/components/common/DatePicker.vue";
import {ref} from "vue";

const user_name = ref('')
const active_date = ref(null)
</script>

<style scoped>

</style>
