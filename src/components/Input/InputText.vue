<script setup lang="ts">
import { ref, watch } from "vue";
import BaseInput from "./BaseInput.vue";

const props = withDefaults(
  defineProps<{
    id: string;
    modelValue: string;
    rules?: string | Array<string>;
  }>(),
  {
    modelValue: "",
    rules: "",
  }
);
const emit = defineEmits(["update:modelValue", "error"]);

const originValue = ref(props.modelValue);

watch(
  () => originValue.value,
  (value) => {
    // 入力値を返す
    emit("update:modelValue", value);
  }
);
// 基底コンポーネントからのメッセージをそのまま返す
const onError = (event: any) => {
  emit("error", event);
};
</script>
<template>
  <base-input
    :id="props.id"
    type="text"
    v-model="originValue"
    :rules="props.rules"
    @error="onError"
  />
</template>
