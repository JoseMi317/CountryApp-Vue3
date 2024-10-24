<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import PageHeader from './components/PageHeader.vue';
  import CountryList from './components/CountryList.vue';
  import axiosClient from './utils/axios';
  import { Country } from './Models/country.model';

  const countries = ref<Country[]>([]);
  const search = ref("");
  const FilterCountry = ref<Country[]>([]);
  const page = ref(1);
  const itemPage = ref(12);
  const CountriesForPage = ref<Country[]>([]);
  const totalItem = ref(0);

  const getCountries = async () => {
    try {
      const {data} = await axiosClient.get("/all");
      countries.value = data;
      totalItem.value = countries.value.length
      
    } catch (error) {
      console.log(error); 
    }

  };

  const FilterCountries = () => {
    FilterCountry.value = countries.value.filter((countries)=>
    countries.name.common.toLowerCase().includes(search.value.toLocaleLowerCase()));
  };

  const slideCountries = (currentCountries: Country[]) =>{
    const start = (page.value -1 ) * itemPage.value;
    const end = page.value * itemPage.value;
    CountriesForPage.value = currentCountries.slice(start,end);
  };

  const NextPage = (newPage: number) =>{
    page.value = newPage;
  }

  onMounted(() =>{
    getCountries();
  })
  watch([countries, page, FilterCountry], () => {
    slideCountries(
      FilterCountry.value.length <= 0 
      && search.value === ""
      ? countries.value 
      :FilterCountry.value
    );

  })
</script>

<template>

  <PageHeader/>
    <div class="container max-w-screen-lg mx-auto px-6">
      <div class="mb-8"> 
      <input type="text" 
        class="border border-green-30 rounded-md w-full p-2 px-4" 
        placeholder="Search Country"
        v-model="search"
        @input="FilterCountries">
    </div>

    <div class="mb-8 flex justify-center space-x-6"> 
      <button
      :disabled="page <= 1"
      :class="{ 'opacity-50': page <= 1 }"
      @click="NextPage(page -1)" 
      class="border border-gray-200 rounded px-2 py-0.5 hover:bg-gray-200">
        Previus
      </button>

      <button 
      :disabled="page >= totalItem / itemPage"
      :class="{ 'opacity-50': page >= totalItem / itemPage }"
      @click="NextPage(page +1)" 
      class="border border-gray-200 rounded px-2 py-0.5 hover:bg-gray-200">
        Next
      </button>
    </div>
    <CountryList 
      :countries="CountriesForPage"/>

  </div>

</template>

