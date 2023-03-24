<script lang="ts">
  export default {
    props: ['errorMessages', 'isLoading']
  }
</script>

<template>
  <Transition name="fade">
    <ul v-if="errorMessages.length > 0 && !isLoading" class="mb-6 flex flex-col gap-4">
      <li
        v-for="error in errorMessages"
        :key="error"
        class="text-red-500 px-4 py-1 bg-red-100 rounded-md"
      >
        {{ error }}
      </li>
    </ul>
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
