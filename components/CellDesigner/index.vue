<template>
<div>
<h4>Cell Designer
</h4>

<h5>Background:</h5>
<o-slider name="backgroundColor" paramType="HSL" 
destination="cells" section="background"  />


<h5>Border:</h5>
<o-slider paramType="HSL" name="borderColor"  destination="cells" section="border" />

<o-slider name="borderWidth" destination="cells"  section="border" attribute="width" min="0" :max="store.maxCellBorderWidth" step="1" />

<o-slider name="borderRadius" destination="cells"  section="border" attribute="radius" min="0" :max="store.maxCellBorderWidth" step="1" />




</div>
</template>

<script setup>
import { useGridStore } from '../../store/grid.js'
const store = useGridStore()

const borderWidth = ref(1)
const borderColor = ref(1)

</script>