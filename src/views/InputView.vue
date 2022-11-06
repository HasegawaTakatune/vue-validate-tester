<script setup lang="ts">
import { reactive } from "vue";
import InputText from "@/components/Input/InputText.vue";
import InputPassword from "@/components/Input/InputPassword.vue";

const form = reactive({
  alpha: "",
  hira: "",
  kana: "",
  numeric: "",
  length: "",
  password: "",
});

const errors = reactive({
  alpha: "",
  hira: "",
  kana: "",
  numeric: "",
  length: "",
  password: "",
});
</script>
<template>
  <main>
    <div class="input-wrapper">
      <label for="input-alpha" class="input-label">Alphabet</label>
      <input-text
        id="input-alpha"
        :class="{ 'input-error': errors.alpha }"
        v-model="form.alpha"
        rules="required|alpha"
        @error="errors.alpha = $event"
      />
      <div v-if="errors.alpha" class="input-error-message">
        {{ errors.alpha }}
      </div>
    </div>

    <div class="input-wrapper">
      <label for="input-hira" class="input-label">ひらがな</label>
      <input-text
        id="input-hira"
        :class="{ 'input-error': errors.hira }"
        v-model="form.hira"
        rules="required|hiragana"
        @error="errors.hira = $event"
      />
      <div v-if="errors.hira" class="input-error-message">
        {{ errors.hira }}
      </div>
    </div>

    <div class="input-wrapper">
      <label for="input-kata" class="input-label">カタカナ</label>
      <input-text
        id="input-kata"
        :class="{ 'input-error': errors.kana }"
        v-model="form.kana"
        rules="required|katakana"
        @error="errors.kana = $event"
      />
      <div v-if="errors.kana" class="input-error-message">
        {{ errors.kana }}
      </div>
    </div>

    <div class="input-wrapper">
      <label for="input-numeric" class="input-label">Numeric</label>
      <input-text
        id="input-numeric"
        :class="{ 'input-error': errors.numeric }"
        v-model="form.numeric"
        rules="required|numeric"
        @error="errors.numeric = $event"
      />
      <div v-if="errors.numeric" class="input-error-message">
        {{ errors.numeric }}
      </div>
    </div>

    <div class="input-wrapper">
      <label for="input-length" class="input-label">String length</label>
      <input-text
        id="input-length"
        :class="{ 'input-error': errors.length }"
        v-model="form.length"
        rules="required|max:10|min:3"
        @error="errors.length = $event"
      />
      <div v-if="errors.length" class="input-error-message">
        {{ errors.length }}
      </div>
    </div>

    <div class="input-wrapper">
      <label for="input-pwd" class="input-label">Password</label>
      <input-password
        id="input-pwd"
        :class="errors.password ? 'input-error' : ''"
        v-model="form.password"
        @error="errors.password = $event"
      />
      <div v-if="errors.password" class="input-error-message">
        {{ errors.password }}
      </div>
    </div>
  </main>
</template>

<style scoped>
.input-wrapper {
  margin-bottom: 2rem;
}

.input-label {
  display: block;
  width: 6rem;
  margin-right: 1rem;
}

.input-error {
  border-color: rgb(251, 99, 99);
  background-color: rgb(238 171 171);
}

.input-error-message {
  color: rgb(255, 55, 55);
}
</style>
