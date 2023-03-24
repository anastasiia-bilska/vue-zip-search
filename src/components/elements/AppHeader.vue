<template>
  <header class="md:mt-6 mt-6 mb-10">
    <nav>
      <ul class="flex border-b">
        <li class="-mb-px mr-1">
          <router-link
            title="Go to Search Page"
            active-class="text-pink-700 border-l border-t border-r rounded-t hover:text-pink-700"
            class="bg-white inline-block py-2 px-4 text-indigo-500 hover:text-indigo-800 font-semibold transition" to="/">Home</router-link>
        </li>
        <li class="-mb-px mr-1">
          <router-link
            title="Go to Homepage"
            active-class="text-pink-700 border-l border-t border-r rounded-t border-b-0 hover:text-pink-700"
            class="bg-white inline-block py-2 px-4 text-indigo-500 hover:text-indigo-800 font-semibold transition" to="/search">SearchPage</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
