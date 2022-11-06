<script setup lang="ts">
import { ref, computed, watch } from "vue";
import BaseInput from "./BaseInput.vue";

const props = withDefaults(
  defineProps<{
    id: string;
    modelValue: string;
  }>(),
  {
    modelValue: "",
  }
);
const emit = defineEmits(["update:modelValue", "error"]);

const originValue = ref(props.modelValue);
// パスワード表示切り替えフラグ
const show = ref(false);

watch(
  () => originValue.value,
  (value) => {
    // 入力値を返す
    emit("update:modelValue", value);
  }
);

// 入力タイプ
const type = computed(() => (show.value ? "text" : "password"));
// ボタンステータス
const state = computed(() => (show.value ? "hide" : "show"));
// 基底コンポーネントからのメッセージをそのまま返す
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
