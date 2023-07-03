<template>
<div>

<div>
<o-slider name="rows" min="1" :max="store.maxRows" destination="meta"/>

<o-slider name="columns" min="1" :max="store.maxColumns" destination="meta"/>

<o-slider name="gap" min="0" max="10" destination="meta"/>
</div>

<!-- BG COLOR -->
<o-slider name="backgroundColor" paramType="HSL" destination="meta"/>

<o-randomizer></o-randomizer>



</div>
</template>

<script setup>

import { useGridStore } from '../../store/grid.js'
const store = useGridStore()

const rows = ref(null)
const columns = ref(null)
const gap = ref(null)
const backgroundColor = ref(null)

onMounted(() => {
    store.getDefaultGrid();
    rows.value = store.workingGrid.meta.rows
    columns.value = store.workingGrid.meta.columns
    gap.value = store.workingGrid.meta.gap
    backgroundColor.value = store.workingGrid.meta.backgroundColor
})


</script>