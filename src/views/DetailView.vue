<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import  Notification  from '@/components/Notification.vue'

interface ClassDetailViewProps {
  id: string;
}

const authStore = useAuthStore();
const props = defineProps<ClassDetailViewProps>();
const showNotification = ref(false);
const notificationMessage = ref('');
const classItem = ref<any>();
const isSignedUp = ref(false);

onMounted(async () => {
  if (props.id) {
    const response = await axios.get(`http://localhost:4000/api/v1/activities/${props.id}`)
    classItem.value = response.data
    console.log(response.data)
  }
})
const isAuthenticated = computed(() => authStore.isAuthenticated);

const HandleLogin = async () => {
     !authStore.isAuthenticated
        router.push('/login');

}

const showNotificationMessage = (message : string) => {
    notificationMessage.value = message
    showNotification.value = true;
    setTimeout(()=>{
        showNotification.value = false
    },3000)
}

const signupForActivity = async (activityId: number) => {
    try {
        await authStore.signupForActivity(activityId);
        showNotificationMessage('Du har nu tilmeldt dig denne aktivitet.');
        isSignedUp.value = true

    } catch (error) {
        console.error('Fejl ved signup', error);
        showNotificationMessage('Der skete en fejl, da vi skulle tilmelde dig.');
    }
}

const removeUserFromActivity = async (activityId: number) => {
    try {
        await authStore.removeUserFromActivity(activityId);
        showNotificationMessage('Du er nu fjernet fra denne aktivitet.');
        isSignedUp.value = false;

    } catch (error) {
        console.error('Fejl ved fjernelse', error);
        showNotificationMessage('Der skete en fejl, da vi skulle fjerne dig.');
    }
}

const handleButtonClick = async (activityId: number) => {
  if (isSignedUp.value === false) {
    await signupForActivity(activityId);
  } else {
    await removeUserFromActivity(activityId);
  }
}
</script>


<template>
  <div> 
<div v-if="classItem" :key="classItem.id" class="detailClassContainer relative">
  <div class="absolute top-4 left-4 z-10">
  </div>
  <Notification :message="notificationMessage" :show="showNotification" @close="showNotification = true "/>
  <button class="gridContainer z-10 rounded-3xl p-3  mt-6 rounded-md border-1 bg-[#5E2E53] text-white w-64 h-[3.4rem] font-medium place-self-end m-6" @click="handleButtonClick(classItem.id)">{{ isSignedUp ? 'Afmeld' : 'Tilmeld' }}</button>
  <button v-if="!isAuthenticated" class="gridContainer z-10 rounded-3xl p-3  mt-6 rounded-md border-1 bg-[#5E2E53] text-white w-64 h-[3.4rem] font-medium place-self-end m-6" @click="HandleLogin()">Log ind</button>
  <img class="gridContainer max-h-96 h-96 w-screen object-cover" :src="classItem?.asset.url"/>
</div>
<div class="p-4">
<div class="pt-4">
  <h3 class="font-regular text-xl pb-0 text-white">{{ classItem?.name }}</h3>
  <p class="text-white pb-4">{{ classItem?.minAge }}-{{ classItem?.maxAge }} År</p>
  <p class="text-white">{{ classItem?.description }}</p>
</div>
</div>
</div>
</template>

<style>

.detailClassContainer {
    display: grid;

}
.gridContainer {
    grid-area: 1/2/2/1;
}
.rating-form {
  width: 311px;
  height: 240px;
  margin: 0 auto;
  position: absolute;
  top: 14em;
  left: 3.4em;
  background-color: white;
  z-index: 100;
  padding: 2em;
}

</style>