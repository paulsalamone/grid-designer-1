<template>

<div class="grid-editor">

    <MetaDesigner class="meta" />

    <Display class="display" />

    <CellDesigner class="controls"/>

</div>
</template>

<style lang="scss" scoped>


.grid-editor {
    display: grid;
    grid-template-areas:
        "meta display controls";
    grid-template-columns: 200px 1fr 200px;  
    grid-gap: 1rem;
    * {
    // border: 1px dotted grey;
    height: 500px;
}
}

.meta {
    grid-area: meta;
    padding: .5rem;
}
.display {
    grid-area: display;
    padding: .5rem;

}
.controls {
    grid-area: controls;
    padding: .5rem;

}

</style>