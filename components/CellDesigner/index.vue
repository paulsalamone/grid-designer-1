<template>
<div>
<h4>Cell Designer
</h4>
<label for="borderWidth">Border Width: {{borderWidth}}</label><br/>

<input name="borderWidth" type="range" min="1" max="40" v-model="borderWidth" @change="store.setCellDesign('borderWidth', borderWidth)"/>
<br/><br/>
<p>{{borderWidth}}</p>
<br/><br/>
<input name="borderColor" type="range" min="1" max="360" v-model="borderColor" @change="store.setCellDesign('borderColor', borderColor)"/>
<br/><br/>
<p>{{borderWidth}}</p>
<br/><br/>
<button @click.prevent="store.randomizeCells('backgroundColor')" >Randomize Colors</button>
</div>
</template>

<script setup>
import { useGridStore } from '../../store/grid.js'
const store = useGridStore()

const borderWidth = ref(1)

</script>