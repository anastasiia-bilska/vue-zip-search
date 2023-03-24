<script lang="ts">
  import axios from 'axios';
  import { debounce } from 'lodash';
  import LoaderCircle from '../elements/LoaderCircle.vue';
  import TabletContent from '../elements/TabletContent.vue';
  import ErrorMessages from '../elements/ErrorMessages.vue';

  export default {
    components: {
      LoaderCircle,
      Tablet: TabletContent,
      ErrorMessages,
    },
    data() {
      return {
        zipCodeUS: '',
        zipCodeLocal: '',
        state: '',
        city: '',
        country: '',
        isp: '',
        errorMessage: '',
        isLoading: false,
        userAgent: '',
        ip: '',
        visibleCategories: [] as any[],
        referer: '',
        utm: '',
      }
    },
    methods: {
      clear() {
        this.state = '';
        this.city = '';
        this.country = '';
        this.isp = '';
        this.errorMessage = '';
        this.userAgent = '';
        this.ip = '';
        this.visibleCategories = [];
      },
      parseURL() {
        const urlParams = new URLSearchParams(window.location.search);
        this.referer = document.referrer;
        this.utm = urlParams.toString();
      },
      mounted() {
        this.parseURL();
      },
      async search() {
        this.clear();

        if (this.zipCodeUS === '') {
          return;
        }

        const allowedSymbols = '0123456789';

        const isZipCodeValid = this.zipCodeUS.split('').every(symbol => allowedSymbols.includes(symbol));

        if (!isZipCodeValid) {
          this.errorMessage = 'ZIP-code must include only numbers';
          return;
        }

        if (this.zipCodeUS.length < 5) {
          this.errorMessage = 'ZIP-code is too short';
          return;
        }

        if (this.zipCodeUS.length > 5) {
          this.errorMessage = 'ZIP-code is too long';
          return;
        }

        try {
          this.isLoading = true;

          const response = await axios.get(`https://api.zippopotam.us/us/${this.zipCodeUS}`);
          const data = response.data;

          this.state = data.places[0].state;
          this.city = data.places[0]['place name'];

          this.visibleCategories = [
            { name: 'State', value: this.state },
            { name: 'City', value: this.city },
            { name: 'ZIP-code', value: this.zipCodeUS },
          ];
        } catch (error) {
          this.errorMessage = 'Something went wrong...';
        } finally {
          this.isLoading = false;
        }
      },
      async searchByIp() {
        try {
          this.clear();
          this.isLoading = true;

          const response = await axios.get('https://ipapi.co/json/');
          const data = response.data;

          this.country = data.country;
          this.isp = data.org;
          this.ip = data.ip;
          this.city = data.city;
          this.state = data.region;
          this.userAgent = window.navigator.userAgent;
          this.zipCodeLocal = data.postal;

          this.visibleCategories = [
            { name: 'Region', value: this.state },
            { name: 'City', value: this.city },
            { name: 'ZIP-code', value: this.zipCodeLocal },
            { name: 'Country', value: this.country },
            { name: 'IP', value: this.ip },
            { name: 'ISP', value: this.isp },
            { name: 'User Agent', value: this.userAgent },
          ];

          if (this.utm && this.referer) {
            this.visibleCategories = [
              ...this.visibleCategories,
              { name: 'UTM', value: this.utm },
              { name: 'Referer', value: this.referer },
            ]
          }
        } catch (error) {
          this.errorMessage = 'Something went wrong...';
        } finally {
          // this.zipCodeUS = '';
          this.isLoading = false;
        }
      },
    },
    watch: {
      zipCodeUS: debounce(function(this: any) {
        this.search();
      }, 500),
    },
  }
</script>

<template>
  <h1 class="mb-8 text-4xl md:text-5xl lg:text-6xl text-center font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-600 leading-normal">Search ZIP-Code</h1>

  <form
    @submit.prevent="search"
    class=""
  >
    <input
      class="rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-indigo-500 focus:border-gray-400 transition"
      :class="{
        'border border-red-300 focus:border-red-400 hover:border-red-400': errorMessage,
        'border border-gray-300 focus:border-gray-400 hover:border-gray-400': !errorMessage
      }"
      type="text"
      placeholder="Enter ZIP-code..."
      v-model.trim="zipCodeUS"
    >
  </form>

  <section>
    <h2
      v-if="zipCodeUS || visibleCategories.length || isLoading" class="mt-6 text-3xl text-center font-bold text-indigo-500"
      :class="{ 'mb-6': isLoading || visibleCategories.length }"
    >
      Search Results
    </h2>

    <LoaderCircle v-if="isLoading" />

    <div class="mb-6 relative overflow-x-auto shadow-md sm:rounded-lg">
      <Tablet :visibleCategories="visibleCategories" />
    </div>
  </section>

  <ErrorMessages :errorMessage="errorMessage" :isLoading="isLoading" />

  <div class="flex gap-4">
    <button
      class="py-2 px-4 rounded-md bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 transition text-white"
      @click="searchByIp"
    >
      Search by IP
    </button>

    <router-link
      class="py-2 px-4 rounded-md bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 transition text-white"
      to="/"
      title="Go to Homepage"
      aria-label="Go to Homepage"
    >
      🏘️
    </router-link>
  </div>
</template>
