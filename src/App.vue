<script lang="ts">
  import AppFooter from './components/AppFooter.vue';

  export default {
    components: {
    AppFooter,
}
  }
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <header class="md:mt-6 mt-6 mb-10">
      <nav>
        <ul class="flex border-b">
          <li class="-mb-px mr-1">
            <router-link active-class="text-blue-700 border-l border-t border-r rounded-t" class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" to="/">Home</router-link>
          </li>
          <li class="-mb-px mr-1">
            <router-link active-class="text-blue-700 border-l border-t border-r rounded-t border-b-0" class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" to="/search">SearchPage</router-link>
          </li>
        </ul>
      </nav>
    </header>
     <main class="mb-auto mb-8 text-center flex flex-col items-center font-sans">
        <router-view />
     </main>
     <AppFooter />
  </div>
</template>
