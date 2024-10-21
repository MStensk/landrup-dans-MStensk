<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

  interface ClassItem {
    id: number;
    pictureId: number;
    name: string;
    minAge : string;
    maxAge : string;
    asset: {
      url: string;
    };
  }

  const router = useRouter();

  const classes = ref<ClassItem[]>([]);
  const searchTerm = ref<string>('');

  onMounted(async () => {
    try {
      const classResponse = await axios.get('http://localhost:4000/api/v1/activities');
      classes.value = classResponse.data;
    } catch (error) {
      console.error('Error fetching data', error);
    }
  });

  const navigateToDetailView = (id: number) => {
    router.push(`/activities/${id}`);
  };

  const filteredClasses = computed(() => {
    return classes.value.filter((classItem) => classItem.name?.toLowerCase().includes(searchTerm.value.toLowerCase()));
  });
</script>

<template>
  <div class="p-4">
    <h1 class="text-white text-3xl pb-2">Søg</h1>
    <input type="text" class="search rounded-md p-3 w-full mb-20 opacity-30 relative text-white" v-model="searchTerm" placeholder=""><MagnifyingGlassIcon class="w-6 h-6 absolute top-[4.5rem] right-6 text-white" /></input>
    <div v-if="searchTerm.trim() !== ''">
      <div v-if="filteredClasses.length > 0">
        <div class="container">
          <div class ="classContainer">
            <div class="classes" v-for="classItem in filteredClasses" :key="classItem.id" @click="navigateToDetailView(classItem.id)">
                <p class="z-10 text-base h-20 break-all truncate pl-6 pt-4 rounded-tr-3xl text-left font-semibold bg-opacity-75">{{ classItem.name }} <br> {{ classItem.minAge }}-{{ classItem.maxAge }} år</p>
                <img class="h-[21.5rem] w-[22rem] object-cover" :src= "(classItem.asset.url)"/>
            </div>
          </div>
        </div>
      </div>
      </div>
  </div>
</template>

<style>
.search {
 background-color: #C4C4C4;
}

</style>
