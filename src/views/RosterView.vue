<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from "@/stores/auth";
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useAuthStore();
const rosterData = computed(() => store.rosterData);
const userRole = computed(() => store.userRole);

onMounted(() => {
    const userId = Array.isArray(router.currentRoute.value.params.userId)
  ? parseInt(router.currentRoute.value.params.userId[0])
  : parseInt(router.currentRoute.value.params.userId);

    const rosterId = Array.isArray(router.currentRoute.value.params.rosterId)
  ? parseInt(router.currentRoute.value.params.rosterId[0])
  : parseInt(router.currentRoute.value.params.rosterId);
    store.getUserRoster({ userId, rosterId });
});

const isInstructor = computed(() => userRole.value === 'instructor');

</script>

<template>
    <div v-if="isInstructor">
     <div v-if="rosterData">
        <h1 class="text-white text-3xl pl-4 pb-6 pt-6">{{ rosterData[0]?.activity }}</h1>
        <ul>
        <li class="text-white pl-4 font-medium" v-for="(user, index) in rosterData" :key="index">
        {{ user.firstname }} {{ user.lastname }}
        </li>
        </ul>
        </div>
    </div>
    <div v-else class="text-white">
        <p>Denne side er ikke tilgængelig for dig.</p>
    </div>
</template>