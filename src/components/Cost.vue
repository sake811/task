<script setup lang="ts">
import { ref, watchEffect, computed, defineEmits } from "vue";
import { useFilters } from "../store/filters";
import RangeSlider from "vue-simple-range-slider";
import "vue-simple-range-slider/css";
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
import { useRoute, useRouter } from "vue-router";
const filters = useFilters();
const emit = defineEmits()
const route = useRoute()
const router = useRouter()
const leftRange = ref(150);
const rightRange = ref(180);

watchEffect(() => {
  if (leftRange.value >= rightRange.value) {
    let tmp = rightRange.value;
    rightRange.value = leftRange.value;
    leftRange.value = tmp;
  }
});

const getPriceVal = computed({
  get() {
    // console.log(filters.getPrice);
    return filters.getPrice;
  },

  set(val) {
    filters.setPrice(val);
  },
});

const getMaxPrice = computed({
  get() {
    return filters.getPrice[1];
  },

  set(val) {
    filters.setMaxPrice(val)
  },
})
const getMinPrice = computed({
  get() {
    return filters.getPrice[0];
  },

  set(val) {
    filters.setMinPrice(val)
  },
})

watchEffect(() => {
  emit('price', filters.getPrice)
})

</script>

<template>
  <div class="index-cost">
    <div class="cost">
      <div style="border-right: 1px solid #d2d2d2">
        <p style="padding: 11px 12px">₽</p>
      </div>
      <div
        style="
          display: flex;
          padding: 10px 12px;
          justify-content: space-around;
          width: 100%;
        "
      >
        <p>от</p>
        <input type="text" v-model="getMinPrice" class="rangeInput" />
        <div style="width: 1px; height: 20px; background: #d9d9d9"></div>
        <p>до</p>
        <input type="text" v-model="getMaxPrice" class="rangeInput" />
      </div>
    </div>
    <RangeSlider
      style="width: 215px !important"
      v-model="getPriceVal"
      :exponential="false"
      :min="getPriceVal[0]"
      :max="getPriceVal[1]"
    />
  </div>
</template>

<style lang="scss">
.simple-range-slider {
  // position: relative;
  position: relative;
  left: 57px;
  bottom: 1px;
  padding: 0px !important;
  &-bg-bar {
    margin: 0px !important;
    height: 1px !important;
  }
  &-bar {
    background: #3da14b !important;
  }
  &-anchor {
    box-shadow: none !important;
    background: #3da14b !important;
  }
  &-popover, &-popover-arrow {
    display: none !important;
  }
  // & {}
}

.rangeInput {
  width: 86px;
  outline: none;
  border: none;
  font-family: "Gotham Pro";
}

.cost {
  width: 296px;
  height: 40px;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  display: flex;
  position: relative;
}
</style>
