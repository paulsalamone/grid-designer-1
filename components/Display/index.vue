<template>
<div class="display">
<client-only>

<div class="display-grid"
:style="{
    gridTemplateColumns:  `repeat(${store.workingGrid.meta.columns}, 1fr)`,
    gridTemplateRows: `repeat(${store.workingGrid.meta.rows}, 1fr)`,
    gap: `${store.workingGrid.meta.gap}px`,
    backgroundColor: store.workingGrid.meta.backgroundColor,
}"
> 
<div v-if="store.gridLoaded" class="cell" v-for="index in store.visibleCellAmount" :key="index"
:style="{
    backgroundColor: store.workingGrid.cells[index].backgroundColor,
    borderColor: store.workingGrid.cells[index].borderColor,
    borderWidth: `${parseInt(store.workingGrid.cells[index].borderWidth)}px`,

}"

>
<!-- {{store.workingGrid.cells[index].backgroundColor}} -->

</div>
</div>
<!-- UTILS -->
<div class="display-utils">
<button type="" @click.prevent="handleSave">Save to LS</button>

<h3>{{gridsList}}</h3>
<select v-model="gridSelection">

  <option v-for="(grid, index) in gridsList" :key="index" :value="grid">{{ grid }}</option>

</select>
<button type="" @click.prevent="handleLoadGrid">load</button>


</div>


</client-only>
</div>
</template>

<script setup>
import { useGridStore } from '../../store/grid.js'
const store = useGridStore()

const updated = ref(true);

watch(() => store.workingGrid, (val) => {
    if (val) {
        updated.value = true;
    }
})
onBeforeMount(() => {
// this just loads the default grid onto LS
store.setInitialStorage()
});

const gridsList = ref(null)

onMounted(() => {
  store.getDefaultGrid();
    gridsList.value = store.getGridList()
  ;
})

const handleSave = () => {
    store.saveGrid(`grid-${Math.floor(Math.random() * 1000000)}`);
        gridsList.value = store.getGridList()

}

const gridSelection = ref('defaultGrid')

const handleLoadGrid = () => {
    console.log('load grid: ', gridSelection.value);
    store.loadGrid(gridSelection.value)
}


// const onMounted = () => {
//     console.log('mounted');
// }


</script>

<style scoped lang="scss">
.display {
    display: grid;
    grid-template-rows: 1fr 60px;
    justify-content: center;
    border: 15px solid #ccc;
    overflow: hidden;
    &-grid {
        display: grid;
        border: 1px solid black;
        height: 500px;
        width: 500px;
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
