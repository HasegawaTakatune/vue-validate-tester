<script setup lang="ts">
import { reactive } from "vue";
import InputText from "@/components/Input/InputText.vue";

const form = reactive({
  alpha: "",
  hira: "",
  kana: "",
  numeric: "",
});

const errors = reactive({
  alpha: "",
  hira: "",
  kana: "",
  numeric: "",
});
</script>
<template>
  <main>
    <label for="">Alphabet</label>
    <input-text
      v-model="form.alpha"
      rules="required|alpha"
      @error="errors.alpha = $event"
    />
    <div v-if="errors.alpha">{{ errors.alpha }}</div>
  </main>
</template>
