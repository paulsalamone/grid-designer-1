<template>
<div class="display">
<client-only>

<div class="display-grid"
:style="{
    gridTemplateColumns:  `repeat(${store.workingGrid[0].meta.columns}, 1fr)`,
    gridTemplateRows: `repeat(${store.workingGrid[0].meta.rows}, 1fr)`,
    gap: `${store.workingGrid[0].meta.gap}px`,
    backgroundColor: `hsl(${store.workingGrid[0].meta.backgroundColor}, 50%, 50%)`
}"
> 
<div v-if="store.gridLoaded" class="cell" v-for="(cell, index) in store.workingGrid[0].cells" :key="index"
:style="{
    backgroundColor: cell.bg
}"

>


</div>
</div>
<!-- utils -->
<div class="display-utils">
<button type="" @click.prevent="handleSaveSample">save this as sample</button>
<button type="" @click.prevent="handleLoadSample">load Sample grid</button>

</div>

</client-only>
</div>
</template>

<script setup>
import { useGridStore } from '../../store/grid.js'
const store = useGridStore()

onBeforeMount(() => {
// this just loads the default grid onto LS
store.setInitialStorage()

}),
onMounted(() => {
  store.getDefaultGrid()
})

const handleSaveSample = () => {
    store.saveGrid("sampleGrid")
}

const handleLoadSample = () => {
    console.log('load sample grid');
    store.loadGrid("sampleGrid")
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

.cell {
    // background-color: teal;
    // padding: 1rem;
    border: 1px solid black;
}
</style>
