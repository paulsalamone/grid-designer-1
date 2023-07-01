<template>
<div>
<h4>Meta Designer
</h4>

<!-- ROWS -->

<div>
<label for="rows">Rows: {{rows}}</label><br/>

<input name="rows" type="range" min="1" :max="store.maxRows" v-model="rows"
@change="store.handleMeta('rows', rows)"
/>
<br/><br/>

<!-- COLS -->

<label for="columns">Columns: {{columns}}</label><br/>

<input name="columns" type="range" min="1" :max="store.maxColumns" v-model="columns" @change="store.handleMeta('columns', columns)"/>
</div>
<br/><br/>
<!-- GAP -->
<label for="gap">Gap: {{gap}}</label><br/>

<input name="gap" type="range" min="1" max="40" v-model="gap" @change="store.handleMeta('gap', gap)"/>
<br/><br/>

<!-- BG COLOR -->
<label for="backgroundColor">BG Color: {{backgroundColor}}</label><br/>

<input name="backgroundColor" type="range" min="1" max="360" v-model="backgroundColor" @change="store.handleMeta('backgroundColor', backgroundColor)"/>

<div v-if="store.gridLoaded">
<br /><br />

<p>READOUT:</p>
<p>maxCellAmount: {{store.maxCellAmount}}</p>
<p>visibleCellAmount: {{store.visibleCellAmount}}</p>
</div>
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