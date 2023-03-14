<script setup lang="ts">
import { ref, watchEffect,  defineEmits, onBeforeUnmount } from "vue";
import {useFilters} from "../store/filters"
const filters = useFilters()
const emit = defineEmits()
const flag = ref(false);
const flagMultiple = ref(false);
const focusout = ref()

const closeFunc = (event: any) => {
  event.stopPropagation();
  filters.setSelectRooms([])
  filters.closeMultiSelect()
  filters.setMultiSelectState(false);
};



const selectItemFunc = (item: any) => {
  filters.setSelectedRooms(item)
};


const closeHandler = (event:any) => {
      if(event.target !== focusout.value && !focusout.value.contains(event.target)) {
        if(filters.getMultiSelect === true) filters.setMultiSelectState(false)
      }
}

window.addEventListener('click', (event) => closeHandler(event))

watchEffect(() => {
  if(filters.getSelectRooms.length >= 0) {
  emit('rooms', filters.getSelectRooms)

  }
})

</script>

<template>
  <div class="multiple focusoutFlag" ref="focusout">
    <div class="multiple__input" @click="filters.setMultiSelectState(!filters.getMultiSelect)">
      <p>
        {{
          filters.getSelectRooms.length > 0
            ? `${filters.getSelectRooms.join(",")} комн`
            : "Комнатность"
        }}
      </p>
      <img
        class="close"
        src="../assets/Icon_close_grey.svg"
        :style="filters.getSelectRooms.length > 0 ? 'display: block' : 'display: none'"
        @click="($event) => closeFunc($event)"
      />
      <img
        class="arrow"
        src="../assets/Icon_arrow_down.svg"
        :style="filters.getMultiSelect ? 'transform: rotate(180deg)' : ''"
      />
    </div>
    <div class="multiple__list focusoutFlag" v-if="filters.getMultiSelect">
      <ul class="multiple__items">
        <li
          class="multiple__item"
          v-for="item in filters.getRooms"
          :key="item.value"
          @click="selectItemFunc(item)"
        >
          <input
            type="checkbox"
            id="multiCheckbox"
            class="multiCheckbox"
            v-model="item.flag"
          @click="selectItemFunc(item)"
          />
          <label class="checkbox" for="multiCheckbox"> </label>
          {{ item.value }}
        </li>
      </ul>
    </div>
    
  </div>
</template>

<style scoped lang="scss">
.multiCheckbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.multiCheckbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}
.multiCheckbox + label::before {
  content: "";
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid #adb5bd;
  border-radius: 0.25em;
  margin-right: 0.5em;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.multiCheckbox:checked + label::before {
  border-color: #3da14b;
  background-color: #3da14b;
  background-image: url("../assets/Icon_check_mark.svg");
}

.multiple {
  position: relative;
}
.multiple__list {
  position: absolute;
  top: 45px;
}
.multiple__input {
  background: #ffffff;
  border: 1px solid #d2d2d2;
  border-radius: 8px;
  padding: 9px 12px;
  width: 296px;
  height: 40px;
  cursor: pointer;
  position: relative;
}
.multiple__item {
  padding: 8px 20px 12px;
}
.multiple__item:hover {
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

.multiple__list {
  width: 296px;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(40, 40, 40, 0.18);
  border-radius: 8px;
}
.multiple__items > li {
  margin-bottom: 14px;
  line-height: 22.8px;
}
.multiple__items > li {
  margin-bottom: 0px;
  line-height: 22.8px;
}
</style>
