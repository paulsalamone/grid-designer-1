<template>
<div class="meta-designer">

<div>
<o-slider destination="meta" attribute="rows" name="rows" min="1" :max="store.maxRows" />

<o-slider destination="meta" attribute="columns" name="columns" min="1" :max="store.maxColumns" />

<o-slider destination="meta" attribute="gap" name="gap" min="0" max="20" />
</div>

<!-- BG COLOR -->
<o-slider  paramType="HSL" destination="meta" name="backgroundColor" />




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