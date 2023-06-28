<template>
<div class="display">
<!-- grid -->
<div class="display-grid"></div>
<!-- utils -->
<div class="display-utils">x  x x x x x</div>

</div>
</template>

<script setup>
// lets get our pinia store

</script>

<style scoped lang="scss">
.display {
    display: grid;
    // flex-direction: column;
    grid-template-rows: 1fr 60px;
    justify-content: center;
    border: 15px solid #ccc;
//  height: 500px;
//         width: 500px;
    &-grid {
        // flex: 1;
        border: 1px solid black;
        height: 500px;
        width: 500px;
    }

    &-utils {
        // display: flex;
        // justify-content: space-between;
        // align-items: center;
        border: 1px solid black;
        background-color: #bbb;
        // padding: 0.5rem;
    }
}
</style>
