<template>
<div>

<div v-if="paramType === 'HSL'">
<p>{{destination}}:</p>
<label for="hue">Hue: {{hsl.hue}}</label><br/>
<input name="hue" type="range" min="0" max="360" step="1" v-model="hsl.hue" @change="store.setCellDesign('backgroundColor', hslString)">
<br/><br/>
<label for="saturation">Saturation: {{hsl.saturation}}</label><br/>
<input name="saturation" type="range" min="0" max="100" step="1" v-model="hsl.saturation" @change="store.setCellDesign('backgroundColor', hslString)">
<br/><br/>
<label for="lightness">Lightness: {{hsl.lightness}}</label><br/>
<input name="lightness" type="range" min="0" max="100" step="1" v-model="hsl.lightness" @change="store.setCellDesign('backgroundColor', hslString)">
<br/><br/>
<p>{{hsl}}</p>
</div>

<div v-else>
<label :for="name">{{name}}: {{sliderValue}}</label><br/>
<input :name="name" type="range" :min="min" :max="max" :step="step" v-model="sliderValue" @change="store.setCellDesign(name, sliderValue)"/>
<br/><br/>
</div>

</div>
</template>

<script setup>
import { useGridStore } from '../../store/grid.js'
const store = useGridStore()

const sliderValue = ref(null)

const hsl = ref({
    hue: "0",
    saturation: "50",
    lightness: "50"
})

const hslString = computed(() => {
    const str =  `hsl(${hsl.value.hue}, ${hsl.value.saturation}%, ${hsl.value.lightness}%)`
    console.log("typoeof str", typeof str)
    return str
})
// const hueValue = ref(null)
// const saturationValue = ref(null)
// const lightnessValue = ref(null)
const props = defineProps({
    paramType: {
        type: String,
        required: false
    },
    destination: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    min : {
        type: Number,
        required: true
    },
    max: {
type: Number,
required: true
    },
    step: {
        type: Number,
        required: true
    },
    
})
</script>