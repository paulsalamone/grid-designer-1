<template>
<div>
<h4>Cell Designer
</h4>
<!-- BACKGROUND COLOR -->
<h5>Background:</h5>
<o-slider paramType="HSL" destination="cellBackgrounds"/>
<button @click.prevent="store.randomizeCells('backgroundColor')" >Randomize Colors</button>
<!-- BORDER -->

<o-slider paramType="HSL" destination="cellBorders"/>

<o-slider name="borderWidth" min="0" :max="store.maxCellBorderWidth" step="1"/>


<p>{{borderWidth}}</p>
<p>maxCellBorderWidth: {{maxCellBorderWidth}}</p>
<br/><br/>
<label for="borderWidth">Border Color: {{borderColor}}</label><br/>
<input name="borderColor" type="range" min="1" max="360" v-model="borderColor" @change="store.setCellDesign('borderColor', borderColor)"/>
<br/><br/>
<br/><br/>

</div>
</template>

<script setup>
import { useGridStore } from '../../store/grid.js'
const store = useGridStore()

const borderWidth = ref(1)
const borderColor = ref(1)

</script>