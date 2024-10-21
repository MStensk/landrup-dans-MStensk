<script setup lang="ts">
import { HomeIcon } from '@heroicons/vue/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import { CalendarIcon } from '@heroicons/vue/24/outline';


</script>
<template>
<footer>
  <div>
      <div class="menuItem fixed bottom-0 z-10">
        <nav class="flex w-screen bg-white justify-around p-4">
        <div class="border border-black rounded-3xl p-1"><RouterLink to="/activities"><HomeIcon class="w-6 h-6" /></RouterLink></div>
        <div class="border border-black rounded-3xl p-1"><RouterLink to="/search"><MagnifyingGlassIcon class="w-6 h-6" /></RouterLink></div>
        <div class="border border-black rounded-3xl p-1"><RouterLink to="/schedule"><CalendarIcon class="w-6 h-6" /></RouterLink></div>
      </nav>
      </div>
    </div>
</footer>

</template>