<template>
  <div class="display">
    <client-only>
      <div
        class="display-grid"
        :style="{
          gridTemplateColumns: `repeat(${store.workingGrid.meta.columns}, 1fr)`,
          gridTemplateRows: `repeat(${store.workingGrid.meta.rows}, 1fr)`,
          gap: `${store.workingGrid.meta.gap}px`,
          backgroundColor: `hsl(${store.workingGrid.meta.hue},
                    ${store.workingGrid.meta.saturation}%,
                    ${store.workingGrid.meta.lightness}%)`,
        }"
      >
        <div
          v-if="store.gridLoaded"
          class="cell"
          v-for="index in store.visibleCellAmount"
          :key="index"
          :style="{
            backgroundColor: `hsl(${store.workingGrid.cells[index].background.hue}, ${store.workingGrid.cells[index].background.saturation}%, ${store.workingGrid.cells[index].background.lightness}%)`,
            borderColor: `hsl(${store.workingGrid.cells[index].border.hue},
                    ${store.workingGrid.cells[index].border.saturation}%,
                    ${store.workingGrid.cells[index].border.lightness}%)`,
            borderWidth: `${
              store.workingGrid.cells[index].border.width
            }px`,
            borderRadius: `${
              store.workingGrid.cells[index].border.radius
            }px`,
            borderStyle: `${store.workingGrid.cells[index].border.style}`,
            transform: `translateX(${store.workingGrid.cells[index].transform.translateX}px) translateY(${store.workingGrid.cells[index].transform.translateY}px) rotate(${store.workingGrid.cells[index].transform.rotate}deg) scale(${store.workingGrid.cells[index].transform.scale})`,
            boxShadow: `${store.workingGrid.cells[index].boxShadow.x}px ${store.workingGrid.cells[index].boxShadow.y}px ${store.workingGrid.cells[index].boxShadow.blur}px ${store.workingGrid.cells[index].boxShadow.color}`
          }"

        >
        <!-- {{ `${store.workingGrid.cells[index].boxShadow.x}px ${store.workingGrid.cells[index].boxShadow.y}px ${store.workingGrid.cells[index].boxShadow.color}` }} -->
        <!-- {{ `translateX(${store.workingGrid.cells[index].transform.translateX}px) translateY(${store.workingGrid.cells[index].transform.translateY}px) rotate(${store.workingGrid.cells[index].transform.rotate}deg)` }} -->
        <!-- {{ store.workingGrid.cells[index].transform.scale }} -->
          <!-- {{
            `hsl(${store.workingGrid.cells[index].background.hue},
                    ${store.workingGrid.cells[index].background.saturation}%,
                    ${store.workingGrid.cells[index].background.lightness}%)`
          }} -->
        </div>
      </div>
      <!-- UTILS -->
      <!-- <h1>UTILS</h1> -->
      <div class="display-utils">
        <button type="" @click.prevent="handleSave">Save to LS</button>

        <!-- <h3>{{ gridsList }}</h3> -->
        <select v-model="gridSelection">
          <option v-for="(grid, index) in gridsList" :key="index" :value="grid">
            {{ grid }}
          </option>
        </select>
        <button type="" @click.prevent="handleLoadGrid">load</button>
      </div>
    </client-only>
  </div>
</template>

<script setup>
import { useGridStore } from "../../store/grid.js";
const store = useGridStore();

const updated = ref(true);

watch(
  () => store.workingGrid,
  (val) => {
    if (val) {
      updated.value = true;
    }
  }
);
onBeforeMount(() => {
  // this just loads the default grid onto LS
  store.setInitialStorage();
});

const gridsList = ref(null);

onMounted(() => {
  store.getDefaultGrid();
  gridsList.value = store.getGridList();
});

const handleSave = () => {
  store.saveGrid(`grid-${Math.floor(Math.random() * 1000000)}`);
  gridsList.value = store.getGridList();
};

const gridSelection = ref("defaultGrid");

const handleLoadGrid = () => {
  console.log("load grid: ", gridSelection.value);
  store.loadGrid(gridSelection.value);
};

// const onMounted = () => {
//     console.log('mounted');
// }
</script>

<style scoped lang="scss">
.display {
  display: grid;
  grid-template-rows: 1fr 60px;
  justify-content: center;
//   border: 15px solid #ccc;

  &-grid {
    display: grid;
    border: 1px solid black;
    height: 500px;
    width: 500px;
    overflow: hidden;
    margin-bottom: 1rem;
  }

  &-utils {
    border: 1px solid black;
    background-color: #bbb;
  }
}

.display > * {
  min-width: 0px;
}

.cell {
  // background-color: teal;
  // padding: 1rem;
  border: 1px solid black;
}
</style>
