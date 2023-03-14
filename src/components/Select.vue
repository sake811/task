<script setup lang="ts">
import { ref, watchEffect, defineEmits, computed } from "vue";
import {useFilters} from "../store/filters"
const filters = useFilters()
const emit = defineEmits()

const selectFunc = (item: string) => {
  // selectItem.value = item;
  filters.setSelectRealestateTypes(item)
  filters.setSelectState(!filters.getSelectState)
};
const closeFunc = (event:any) => {
  event.stopPropagation();
  filters.setSelectRealestateTypes(null)
  filters.setSelectState(false)
};

watchEffect(() => {
  emit('types', filters.getSelectRealEstateTypes)
})


</script>

<template>
    <div class="select">
      <div class="select__input" @click="filters.setSelectState(!filters.getSelectState)">
        <p>{{ filters.getSelectRealEstateTypes ? filters.getSelectRealEstateTypes : "Тип недвижимости" }}</p>
        <img
          class="close"
          src="../assets/Icon_close_grey.svg"
          :style="filters.getSelectRealEstateTypes ? 'display: block' : 'display: none'"
          @click="($event) => closeFunc($event)"
        />
        <img
          class="arrow"
          src="../assets/Icon_arrow_down.svg"
          :style="filters.getSelectState ? 'transform: rotate(180deg)' : ''"
        />
      </div>
      <div class="select__list" v-if="filters.getSelectState">
        <ul class="select__items">
          <li
            class="select__item"
            v-for="item in filters.getRealEstateTypes"
            :key="item"
            @click="selectFunc(item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
</template>

<style scoped lang="scss">
.select {
  position: relative;
}
.select__list {
  position: absolute;
  top: 45px;
}
.select__input {
  background: #ffffff;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  padding: 9px 12px;
  width: 296px;
  height: 40px;
  cursor: pointer;
  position: relative;
}
.select__item {
  padding: 8px 20px 12px;
}
.select__item:hover {
  background: #f5f5f5;
  cursor: pointer;
}
.arrow {
  position: absolute;
  background-repeat: no-repeat;
  width: 10px;
  height: 6px;
  top: 16px;
  right: 10px;
  transition: 0.6s;
}
.close {
  position: absolute;
  background-repeat: no-repeat;
  top: 15px;
  right: 30px;
  transition: 0.6s;
}

.select__list {
  width: 296px;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(40, 40, 40, 0.18);
  border-radius: 8px;
}
.select__items > li {
  margin-bottom: 14px;
  line-height: 22.8px;
}
.select__items > li {
  margin-bottom: 0px;
  line-height: 22.8px;
}
</style>
