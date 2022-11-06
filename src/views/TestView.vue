<script setup lang="ts">
import { ref } from "vue";
import Tester from "@/components/Input/ts/Tester";
import type { Result } from "@/components/Input/ts/Tester";

// テストケース
const cases = ref<Array<string>>([
  "",
  "1234567890",
  "12",
  "1234567890z",
  "abcdefg",
  "ABCDEFG",
  "AbCdEfG",
  "あいうえお",
  "アイウエオ",
  "あいうえおz",
  "アイウエオz",
  "A?b/3-1qaz2",
  "A?b",
  "A?b/3-1qaz2A?b/3-1qaz2A?b/3-1qaz2",
]);

// テスト処理インスタンス
const tester = new Tester();
// バリデーションチェックの結果格納
const results = ref<Array<Result>>([]);

// 連番フォーマット
const formatNumber = (value: number) => {
  return `00${value}`.slice(-3);
};

// テストケースの削除
const removeCase = (index: number) => {
  cases.value.splice(index, 1);
};

// テストケースの追加
const addCase = () => {
  cases.value.push("");
};

// テスト実行
const tryTest = () => {
  results.value = [];

  tester.check(cases.value).then((value) => {
    results.value = value;
  });
};
</script>
<template>
  <main class="wrapper">
    <div class="test-case-wrapper">
      <h2>Test</h2>
      <div v-for="(value, index) in cases" :key="index">
        <label :for="`case-${index}`" class="test-case-label">
          {{ `case ${formatNumber(index)}:` }}
        </label>
        <input
          :id="`case-${index}`"
          class="test-case-input"
          type="text"
          placeholder="BLANK"
          v-model="cases[index]"
        />
        <img
          class="test-case-plus"
          alt="cross-icon"
          src="@/assets/cross-icon.svg"
          width="20"
          height="20"
          @click="removeCase(index)"
        />
      </div>

      <div class="test-case-icon-cross-frame">
        <img
          alt="cross-icon"
          src="@/assets/plus-icon.svg"
          width="20"
          height="20"
          @click="addCase"
        />
      </div>
    </div>

    <div class="result-wrapper">
      <div class="result-header">
        <h2>Results</h2>
        <div class="button_solid001" @click="tryTest">
          <span>Try Test</span>
        </div>
      </div>
      <div>
        <details
          v-for="(values, index) in results"
          :key="index"
          class="results"
        >
          <summary>{{ values.label }}</summary>
          <ol>
            <li
              v-for="(value, idx) in values.cases"
              :key="idx"
              :class="value.result === '' ? 'result-success' : 'result-error'"
            >
              <span class="result-inputed">{{
                value.inputed !== "" ? value.inputed : "BLANK"
              }}</span>
              <span v-if="value.result" class="result-message">
                >> {{ value.result }}
              </span>
              <span v-else> >> OK</span>
            </li>
          </ol>
        </details>
      </div>
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
}

.test-case-wrapper {
  width: 275px;
  min-width: 275px;

  margin-right: 4rem;
}

.test-case-label {
  margin-right: 10px;
}

.test-case-input {
  margin-right: 5px;
}

.test-case-icon-cross-frame {
  text-align: end;
  padding-top: 5px;
  padding-right: 9px;
}

.test-case-plus {
  top: 5px;
}

.result-wrapper {
  width: 200px;
  text-align: left;
  margin-bottom: 1rem;
  white-space: pre;
}

.result-header {
  display: flex;
}

.results {
  margin-bottom: 1rem;
}

.result-inputed {
  font-weight: 300;
  padding-right: 10px;
}

.result-message {
  font-weight: 200;
  white-space: unset;
}

.result-success {
  color: rgb(26, 184, 26);
}

.result-error {
  color: rgb(255, 55, 55);
}

.button_solid001 span {
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
  max-width: 240px;
  padding: 5px 5px;
  margin: 0 10px;
  color: #bcbcbc;
  transition: 0.3s ease-in-out;
  font-weight: 600;
  background: rgb(34, 34, 34);
  filter: drop-shadow(0px 2px 4px #ccc);
  border-radius: 3px;
}
.button_solid001 span:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px -5px rgb(0 0 0 / 15%), 0 0 5px rgb(0 0 0 / 10%);
}
</style>
