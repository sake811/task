<script setup lang="ts">
import { computed, onMounted, ref, watchEffect } from "vue";
import Select from "./components/Select.vue";
import MultiSelect from "./components/MultiSelect.vue";
import Cost from "./components/Cost.vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import { getFiltersValue } from "./api/methods";
import { useFilters } from "./store/filters";

const filters = useFilters();
const route = useRoute();
const router = useRouter();
const realEstateTypes = ref();
const rooms = ref();
const price = ref();

onMounted(() => {
    filters.updateData();
 
  
});

watchEffect(() => {
  let path = route.query.rooms
  if(path) {
    console.log('HAVE ROOMS')
  }
})


const setPrice = (val) => {
  router.push({ query: { ...route.query, price: val.join(",") } });
};
const setRooms = (val) => {
  router.push({ query: { ...route.query, rooms: val ? val.join(",") : 0 } });
};
const setTypes = (val) => {
  router.push({
    query: { ...route.query, realEstateTypes: val ? val.trim() : 0 },
  });
};
</script>

<template>
  <div class="wrapper">
    <Select :data="realEstateTypes" @types="(val) => setTypes(val)" />
    <MultiSelect @rooms="(val) => setRooms(val)" :data="rooms" />
    <Cost @price="(val) => setPrice(val)" :data="price" />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 1280px;
  margin: 20px auto;
  display: flex;
  justify-content: center;
  gap: 14px;
}
</style>
