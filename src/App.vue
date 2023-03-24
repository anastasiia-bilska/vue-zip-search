<script lang="ts">
  import AppFooter from './components/elements/AppFooter.vue';
  import AppHeader from './components/elements/AppHeader.vue';

  export default {
    components: {
    AppFooter,
    AppHeader,
}
  }
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <AppHeader />
     <main class="mb-auto mb-8 text-center flex flex-col items-center font-sans">
        <router-view />
     </main>
     <AppFooter />
  </div>
</template>
