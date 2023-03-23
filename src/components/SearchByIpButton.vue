<script lang="ts">
  import axios from 'axios';

  export default {
    methods: {
      async searchByIp() {
        try {
          this.$emit('loading', true);
          this.$emit('clear');

          const response = await axios.get('https://ipapi.co/json/');
          const data = response.data;

          this.$emit('updateState', data.region);
          this.$emit('updateCity', data.city);
          this.$emit('updateZip', data.postal);
          this.$emit('update-country', data.country);
          this.$emit('update-ip', data.ip);
          this.$emit('update-isp', data.org);
          this.$emit('update-user-agent', window.navigator.userAgent);
        } catch (error) {
          this.$emit('error', 'Something went wrong...');
        } finally {
          this.$emit('loading', false);
        }
      },
    },
  };
</script>

<template>
  <button
    title="search by IP address"
    type="button"
    class="py-2 px-4 rounded-md bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 transition text-white"
    @click="searchByIp"
  >
    search by IP
  </button>
</template>
