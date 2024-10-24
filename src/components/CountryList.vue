<script setup lang="ts">
import { defineProps } from 'vue';
import { Country } from '../Models/country.model';
import CountryItem from './CountryItem.vue';


interface Props{
    countries : Country[]
}

defineProps<Props>();

</script>


<template>
    <div class="grid grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-4 gap-3">
        <div v-for="country in countries" 
            class="border broder-gray-300 rounded p-3">
            <CountryItem :country />
        </div>
    </div>
</template>