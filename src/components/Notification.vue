<script>
export default {
  props: {
    message: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>

<template>
    <transition name="fade">
      <div v-if="show" class="w-screen h-screen opacity-90 bg-gray-600 z-50">
      <div v-if="show" class="fixed top-40 right-16 z-50 w-64 bg-white border border-gray-300 rounded-md py-3 px-4 shadow-md z-50">
        <p class="text-black font-bold">{{ message }}</p>
      </div>
    </div>
    </transition>
  </template>
