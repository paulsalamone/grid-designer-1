<template>
<div class="randomizer">
<h3>Randomizer</h3>
<i>Select attribute:</i>
<select v-model="selectedAttribute">
<optgroup label="layout">
    <option v-for="(attribute, index) in attributes.meta.template" :key="index" :value="['meta','template', attribute]">{{attribute}}</option>
</optgroup>
<optgroup label="Cell Backgrounds">
<option v-for="(attribute, index) in attributes.cell.background" :key="index" :value="['cell', 'background', attribute]">{{attribute}}</option>
</optgroup>
<optgroup label="Cell Borders">
<option v-for="(attribute, index) in attributes.cell.border" :key="index" :value="['cell', 'border', attribute]">{{attribute}}</option>
</optgroup>
<optgroup label="Cell Transform">
<option v-for="(attribute, index) in attributes.cell.transform" :key="index" :value="['cell', 'transform', attribute]">{{attribute}}</option>
</optgroup>
<optgroup label="Cell Shadow">
<option v-for="(attribute, index) in attributes.cell.boxShadow" :key="index" :value="['cell', 'boxShadow', attribute]">{{attribute}}</option>
</optgroup>
</select>
<!-- <label for="linked">Linked</label> -->
<!-- <input id="linked" type="checkbox" v-model="linked"/>
<p>Selected: {{selectedAttribute}}</p> -->

<label for="strength">Strength: {{ store.randomizerStrength }} </label>
<input type="range" min="1" max="10" name="strength" v-model="store.randomizerStrength">
<button type="" @click.prevent="store.handleRandomizer(selectedAttribute, linked)">Randomize! </button>
</div>
</template>


<script setup>
import { useGridStore } from '../../store/grid.js'
const store = useGridStore()

const selectedAttribute = ref(["cell", "background", "hue"])

// const strength = ref(10)
// const linkedCategory = (computed)  => {
//     // if (selectedAttribute === ""
// }


const linked = ref(true)

const attributes = ref({
    meta: {
        template: {
        rows: "rows",
        columns: "columns",
        }

    },
    cell: {
        background: [
            "hue",  
            "saturation",
            "lightness"
        ],
        border: [
            "hue",
            "saturation",
            "lightness",
            "width",
            "style",
            "radius"
        ],
        transform: [
            "scale",
            "translateX",
            "translateY",
            "rotate"
        ],
        boxShadow: [
            "x",
            "y",
            "blur",
            "color"
            ]
        

    }
})



</script>

<style lang="scss">
    .randomizer {
        border: 2px solid black;
        padding: .5rem;
        // margin: .5rem;
    }
</style>