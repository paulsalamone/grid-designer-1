<template>
<div>

<div v-if="paramType === 'HSL'" class="slider"> 
<!-- <p>{{destination}}:</p> -->
<label for="hue">Hue: {{hsl.hue}}</label><br/>
<input name="hue" type="range" min="0" max="360" step="1" v-model="hsl.hue" @change="store.setParameter(destination, section, 'hue', hsl.hue)">
<br/><br/>
<label for="saturation">Saturation: {{hsl.saturation}}</label><br/>
<input name="saturation" type="range" min="0" max="100" step="1" v-model="hsl.saturation" @change="store.setParameter(destination, section, 'saturation', hsl.saturation)">
<br/><br/>
<label for="lightness">Lightness: {{hsl.lightness}}</label><br/>
<input name="lightness" type="range" min="0" max="100" step="1" v-model="hsl.lightness" @change="store.setParameter(destination, section, 'lightness', hsl.lightness)">
<br/><br/>
<!-- <p>{{hsl}}</p> -->
</div>

<div v-else class="slider">
<label :for="name">{{name}}: {{sliderValue}}</label><br/>
<input :name="name" type="range" :min="min" :max="max" :step="step" v-model="sliderValue" @change="store.setParameter(destination, section, attribute, sliderValue)"/>
<!-- <br/><br/> -->
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
    return str
})

const props = defineProps({
    paramType: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: false
    },
    section: {
        type: String,
        required: true
    },
    attribute: {
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

<style scoped lang="scss">
label {
        text-transform: capitalize;

   }

</style>