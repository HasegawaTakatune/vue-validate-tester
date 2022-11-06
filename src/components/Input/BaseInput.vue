<script setup lang="ts">
import { ref, watch } from "vue";
import Validation from "./ts/Validation";

const props = withDefaults(
  defineProps<{
    rules?: string | Array<string>;
    modelValue: string;
  }>(),
  {
    rules: "",
    modelValue: "",
  }
);

const emit = defineEmits(["update:modelValue", "error"]);

const validate = new Validation(props.rules);
const originValue = ref(props.modelValue);

watch(
  () => originValue.value,
  (value) => {
    const result = validate.check(value);
    emit("update:modelValue", value);
    emit("error", result);
  }
);
</script>
<template>
  <input v-model="originValue" />
</template>
