<template>
<div>
<h4>Cell Designer
</h4>
<!-- BACKGROUND COLOR -->
<h5>Background:</h5>

<o-slider name="backgroundColor" paramType="HSL" destination="cells"/>

<!-- <button @click.prevent="store.randomizeCells('backgroundColor')" >Randomize Colors</button> -->
<!-- BORDER -->
<h5>Border:</h5>

<o-slider paramType="HSL" destination="cells" name="borderColor" />


<o-slider name="borderWidth" min="0" :max="store.maxCellBorderWidth" step="1" destination="cells"/>





</div>
</template>

<script setup>
import { useGridStore } from '../../store/grid.js'
const store = useGridStore()

const borderWidth = ref(1)
const borderColor = ref(1)

</script>