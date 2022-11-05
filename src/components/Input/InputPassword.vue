<script setup lang="ts">
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
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

const onError = (event: any) => {
  emit("error", event);
};
</script>
<template>
  <base-input
    type="password"
    v-model="originValue"
    rules="password"
    @error="onError"
  />
</template>
