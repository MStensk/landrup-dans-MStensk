<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  const router = useRouter()
  const activities = ref<any>()
  
  onMounted(async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/activities');
      activities.value = response.data;
    } catch (error) {
      console.error('Error fetching classes', error);
    }
  })

  const navigateToDetailView = ( id : number) => {
  router.push(`/activities/${id}`);
}

</script>


<template>
    <div>
      <h1 class="text-4xl text-white pl-8 pt-6">Aktiviteter</h1>
      <div class="container p-6">
      <div class="classContainer mb-20">
        <div class="classes" @click="navigateToDetailView(activityItem?.id)"
         v-for="activityItem in activities" :key="activityItem.id">
         <p class="z-10 text-base text-black w-fit max-w-20 h-20 break-all truncate pl-6 pt-4 rounded-tr-3xl text-left font-medium bg-opacity-75">{{ activityItem.name }} <br> {{ activityItem.minAge }}-{{ activityItem.maxAge }} år </p>
          <img class="h-[21.5rem] w-[22rem] object-cover" :src= "(activityItem.asset.url)"/>
      </div>
    </div>
    </div>
    </div>
  </template>
<style>

.classContainer {
  height: auto;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 2em;
  justify-items: center;

}

.container {
  height: max-content;
  overflow-y: scroll;
}

.classes {
  display: grid;
  width: 20.5rem;
  height: 21.5rem;
  line-height: 50px;
  text-align: center;
  background: white;
  overflow: hidden;
  overflow-y: hidden;
  border: 1px transparent;
  border-top-left-radius: 15%;
  border-top-right-radius: 15%;
  border-bottom-left-radius: 15%;
}

.classes p {
  grid-area: 1/1/2/1;
  z-index: 4;
  align-self: flex-end;
  min-width: 20.5rem;
  background: rgba(225, 161, 233, 0.8);
}
.classes img {
  grid-area: 1/2/2/1;
  border: 1px transparent;
}

</style>