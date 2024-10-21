<script setup lang="ts">
import { ref, onMounted } from "vue";
import WelcomeImage from "../assets/images/splash-image.jpg"
import logoImg from "../assets/images/Logo.png"

const fadeInButton = ref(false);

onMounted(() => {
  setTimeout(() => {
    fadeInButton.value = true;
  }, 1500)
})
</script>

<template>
<div class="landingPage">
<div class="relative">
<img :src="WelcomeImage" class="w-screen h-screen object-cover" />
</div>
<div class="relative">
  <img :src="logoImg" class="pt-20">
<div class="z-40 w-screen flex justify-center mt-[7.6rem]">
      <router-link to="/login">
        <button v-if="fadeInButton" class="rounded-md border-1 bg-[#5E2E53] text-white w-64 h-[3.4rem] font-semibold" @click="navigate">
          Kom i gang
        </button>
    </router-link>
</div>
</div>
</div>

</template>

<style>
.landingPage {
  display: grid;
  grid-template-rows: 30em 12em;
}
.landingButton {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.fade-in {
  opacity: 1;
}
</style>