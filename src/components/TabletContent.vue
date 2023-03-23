<script lang="ts">
  export default {
    props: {
      visibleCategories: [] as any[],
    },
  }
</script>

<template>
  <table v-if="visibleCategories.length" class="max-w-md w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th class="px-6 py-3 text-left">Category</th>
        <th class="px-6 py-3 text-left">Value</th>
      </tr>
    </thead>
    
    <tbody>
      <tr v-for="category in visibleCategories" :key="category" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {{ category.name }}
        </th>
        <td class="px-6 py-4">
          {{ category.value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
