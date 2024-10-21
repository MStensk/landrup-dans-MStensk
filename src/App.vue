<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import navComponent from './components/navComponent.vue';

const route = useRoute();

</script>

<template>
  <transition :enter-active-class="route.meta.enterClass"
              :leave-active-class="route.meta.leaveClass"
          >
          <RouterView />
        </transition>
  <navComponent v-if="!$route.meta.hideNavbar" />
</template>
