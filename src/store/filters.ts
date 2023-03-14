import { defineStore } from "pinia";
import { getFiltersValue } from "../api/methods";
export const useFilters = defineStore("filters", {
  state: () => ({
    selectRealEstateTypes: "",
    realEstateTypes: [],
    selectRooms: [],
    rooms: [],
    selectPrice: "",
    price: [],
    select: false,
    multiSelect: false,
    minPrice: "",
    maxPrice: "",
  }),

  getters: {
    getSelectRealEstateTypes: (state) => state.selectRealEstateTypes,
    getRealEstateTypes: (state) => state.realEstateTypes,
    getSelectRooms: (state) => state.selectRooms,
    getRooms: (state) => state.rooms,
    getSelectPrice: (state) => state.selectPrice,
    getPrice: (state) => state.price,
    getSelectState: (state) => state.select,
    getMultiSelect: (state) => state.multiSelect,
    getMaxPrice: (state) => state.maxPrice,
    getMinPrice: (state) => state.minPrice,
  },

  actions: {
    async updateData() {
      await getFiltersValue.getVal().then((r) => {
        this.setRealEstateTypes(r.data[0].realEstateTypes);
        this.setRooms(r.data[0].rooms);
        this.setPrice(r.data[0].price);
      });
    },
    setRealEstateTypes(data: any) {
      this.realEstateTypes = data.split(",");
    },
    setRooms(data: any) {
      // console.log(data);
      this.rooms = data.split(",").map((item: string) => {
        return { value: item, flag: false };
      });
    },

    setMinPrice(data:any) {
      this.price[0] = data
    },

    setMaxPrice(data:any) {
      this.price[1] = data
    },

    setPrice(data: any) {
      this.price = typeof data === "string" ? data.split(",").map((item) => Number(item)) : data;
      
    },

    setSelectRealestateTypes(data: any) {
      this.selectRealEstateTypes = data;
    },

    setSelectRooms(data: any) {
      this.selectRooms = data;
    },
    setSelectPrice(data: any) {
      this.selectPrice = data;
    },
    setSelectState(val: boolean) {
      this.select = val;
    },
    setMultiSelectState(val: boolean) {
      this.multiSelect = val;
    },

    closeMultiSelect() {
      this.rooms = this.rooms.map((item: {}) => {
        return { ...item, flag: false };
      });
    },

    setNewPrice({ minRange = null, maxRange = null }) {},

    setSelectedRooms(item: {}) {
      this.rooms.map((room: { value: string; flag: boolean }) => {
        if (room.value === item.value) {
          room.flag = !room.flag;
          if (!this.selectRooms.includes(room.value)) {
            this.selectRooms.push(room.value);
          } else {
            this.selectRooms = this.selectRooms.filter((delRoom) => {
              return delRoom !== room.value;
            });
          }
        }
      });
    },
  },
});
