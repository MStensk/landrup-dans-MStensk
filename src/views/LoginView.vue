<script setup lang="ts">
import WelcomeImage from "../assets/images/splash-image.jpg"
import { useAuthStore } from "@/stores/auth";
import { reactive } from 'vue';
import router from '@/router';

const state = reactive({
  username: '',
  password: '',
});

const authStore  = useAuthStore();

async function login() {
  await authStore.login({
    username: state.username,
    password: state.password,
  })
  router.push({name : "home"})
} 
</script>


<template>
<div class="landingPage">
<div class="relative">
<img :src="WelcomeImage" class="w-screen h-screen object-cover" />
</div>
<div class="z-40 w-screen h-[12rem] flex justify-center">
      <form @submit.prevent="login">
        <h3 class=" text-5xl text-white">Log ind</h3>
        <div class="w-80 pt-3">
          <input class=" border-2 p-3 w-full h-[3.125rem]"
           id="username" type="text" placeholder="brugernavn" v-model="state.username" />
        </div>
        <div class="pt-3">
          <input class=" border-2 p-3 w-full h-[3.125rem]"
           id="password" type="password" placeholder="adgangskode" v-model="state.password" />
        </div>
        <button class="rounded-md border-1 bg-[#5E2E53] text-white w-64 h-[3.4rem] font-semibold p-3 mt-3 ml-8" type="submit">Log ind</button>
      </form>
</div>
<div class="absolute w-screen h-[440px] mt-20 bg-[#5E2E53] skew-y-[-28deg] opacity-50">
</div>
</div>
</template>

<style>
.landingPage {
  display: grid;
  grid-template-rows: 14em 30em;
}
</style>