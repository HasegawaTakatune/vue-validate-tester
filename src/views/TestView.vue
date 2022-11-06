<script setup lang="ts">
import { onMounted, ref } from "vue";
import Tester from "@/components/Input/ts/Tester";
import type { Result, ResultCase } from "@/components/Input/ts/Tester";

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

const tester = new Tester();
const results = ref<Array<Result>>([]);

const formatNumber = (value: number) => {
  return `00${value}`.slice(-3);
};

const removeCase = (index: number) => {
  cases.value.splice(index, 1);
};

const addCase = () => {
  cases.value.push("");
};

const tryTest = () => {
  tester.check(cases.value).then((value) => {
    results.value = value;
  });
};

onMounted(() => {
  tryTest();
});
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
        <button @click="tryTest">Try Test</button>
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
  width: 100%;

  margin-bottom: 1rem;
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
}

.result-success {
  color: rgb(26, 184, 26);
}

.result-error {
  color: rgb(255, 55, 55);
}
</style>
