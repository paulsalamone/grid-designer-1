<template>
<div>
<h4>Cell Designer
</h4>
<!-- BACKGROUND COLOR -->
<h5>Background:</h5>
<cell-designer-slider paramType="HSL"/>
<button @click.prevent="store.randomizeCells('backgroundColor')" >Randomize Colors</button>
<!-- BORDER -->

<!-- <label for="borderWidth">Border Width: {{borderWidth}}</label><br/>
<input name="borderWidth" type="range" min="0" :max="store.maxCellBorderWidth" step="1" v-model="borderWidth" @change="store.setCellDesign('borderWidth', borderWidth)"/>
<br/><br/> -->

<cell-designer-slider name="borderWidth" min="0" :max="store.maxCellBorderWidth" step="1"/>


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