<template>
<div>
<h4>Meta Designer
</h4>

<!-- ROWS -->

<div>
<label for="rows">Rows: {{rows}}</label><br/>

<input name="rows" type="range" min="1" :max="store.maxRows" v-model="rows"
@change="store.setMeta('rows', rows)"
/>
<br/><br/>

<!-- COLS -->

<label for="columns">Columns: {{columns}}</label><br/>

<input name="columns" type="range" min="1" :max="store.maxColumns" v-model="columns" @change="store.setMeta('columns', columns)"/>
</div>
<br/><br/>
<!-- GAP -->
<label for="gap">Gap: {{gap}}</label><br/>

<!-- <input name="gap" type="range" min="1" max="10" v-model="gap" @change="store.setMeta('gap', gap)"/> -->
<o-slider name="gap" min="1" max="10" destination="meta"/>

<br/><br/>

<!-- BG COLOR -->
<o-slider name="backgroundColor" paramType="HSL" destination="meta"/>


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