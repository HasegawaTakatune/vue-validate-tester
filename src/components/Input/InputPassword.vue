<script setup lang="ts">
import { ref, computed, watch } from "vue";
import BaseInput from "./BaseInput.vue";

const props = withDefaults(
  defineProps<{
    id: string;
    modelValue: string;
    error?: string;
  }>(),
  {
    modelValue: "",
    error: "",
  }
);
const emit = defineEmits(["update:modelValue", "error"]);

const originValue = ref(props.modelValue);
const error = ref(props.error);
const show = ref(false);

watch(
  () => originValue.value,
  (value) => {
    emit("update:modelValue", value);
  }
);

watch(
  () => error.value,
  (value) => {
    emit("error", value);
  }
);

const type = computed(() => (show.value ? "text" : "password"));
const state = computed(() => (show.value ? "hide" : "show"));

const onError = (event: any) => {
  emit("error", event);
};
</script>
<template>
  <base-input
    :id="props.id"
    class="wrapper"
    :type="type"
    v-model="originValue"
    rules="password"
    @error="onError"
  />
  <button class="wrapper state-button" @click="show = !show">
    {{ state }}
  </button>
</template>

<style scoped>
.wrapper {
  height: 21.33px;
}
.state-button {
  width: 60px;
}
</style>
