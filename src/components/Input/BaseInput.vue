<script setup lang="ts">
// 入力コンポーネント（基底）
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

// 入力チェックインスタンス
const validate = new Validation(props.rules);
const originValue = ref(props.modelValue);
const inputBase = ref();

watch(
  () => originValue.value,
  (value) => {
    // 毎回、入力チェックする
    const result = validate.check(value);
    emit("update:modelValue", value);
    emit("error", result);
  }
);

// フォーカス
const inputFocus = () => {
  inputBase.value.focus();
};

defineExpose({ inputFocus });
</script>
<template>
  <input v-model="originValue" ref="inputBase" autocomplete="off" />
</template>
