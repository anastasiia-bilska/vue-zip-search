<script lang="ts">
  export default {
    props: ['errorMessage', 'isLoading']
  }
</script>

<template>
  <Transition name="fade">
      <p v-if="errorMessage && !isLoading" class="mb-6 text-red-500 px-4 py-1 bg-red-100 rounded-md">
        {{ errorMessage }}
      </p>
  </Transition>
</template>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
