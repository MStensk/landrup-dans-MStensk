<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore()
const userData = computed(() => store.userData);

onMounted(() => {
store.fetchUserData()
});

</script>



<template>
  <main class="p-6">
    <h1 class="text-4xl text-white font-medium">Kalender</h1>
    <template v-if="userData && userData.activities && userData.activities.length">
      <div v-for="(activity, index) in userData.activities" :key="index" class="scheduleContainer mt-6 rounded-md">
        <router-link :to="{ name: 'RosterView', params: { userId: userData.id, rosterId: activity.id } }">
        <h3 class="font-semibold text-xl">{{ activity.name }}</h3>
        <p class="font-medium text-base ml-1">{{ activity.weekday }} {{ activity.time }}</p>
        </router-link>
      </div>
    </template>
    <template v-else>
      <p class="font-medium font-semibold text-white text-l pt-4">Du er ikke tilmeldt nogle aktiviteter endnu.</p>
    </template>
  </main>
</template>


<style>

.scheduleContainer {
  height: 6.5rem;
  border: 1px solid #D4D4D4;
  padding: 1em;
  background: #FCFBFB 0% 0% no-repeat padding-box;
}
</style>
