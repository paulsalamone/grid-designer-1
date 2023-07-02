import { defineStore } from 'pinia'

export const useGridStore = defineStore('grid', {
    state: () => ({
        maxRows: 40,
        maxColumns: 40,
        maxCellBorderWidth: 10,
        defaultGrid: {
            "type": "grid",
            "meta": {
                "name": "default",
                "columns": 4,
                "rows": 4,
                "gap": 5,
                "backgroundColor": 200,
            }
        },
        workingGrid: {
            meta: null,
            cells: [],
        },
        gridLoaded: false,

    }),
    getters: {
        visibleCellAmount: (state) => {
            return state.workingGrid.meta.rows * state.workingGrid.meta.columns
        },
        maxCellAmount: (state) => {
            return state.maxRows * state.maxColumns;
        },

    },
    actions: {
        //  STORAGE
        setInitialStorage() {
            // set LS to default grid
            const jsonObject = this.defaultGrid

            localStorage.setItem("defaultGrid", JSON.stringify(jsonObject));
        },
        getDefaultGrid() {

            const grid = JSON.parse(localStorage.getItem("defaultGrid"));


            this.workingGrid.meta = grid.meta;
            // this.workingGrid.cells = grid.cells;
            console.log("this.workingGrid.meta", this.workingGrid.meta)
            for (let i = 0; i < this.maxCellAmount; i++) {

                this.workingGrid.cells.push(
                    { id: i, backgroundColor: "hsl(100,100%,100%)", borderWidth: "1", borderColor: "hsl(100,100%,50%)" }
                )

            }

            console.log("default grid loaded:", this.workingGrid.cells)







            if (this.workingGrid.meta !== null) {
                this.gridLoaded = true;
            }
        },
        getGridList() {
            const keys = Object.keys(localStorage);


            const filteredKeys = keys.filter(key => {

                const value = localStorage.getItem(key);

                if (value.includes("meta")) {
                    return key;
                }

            });


            return filteredKeys;
        },
        saveGrid(name) {
            // REFACTOR????:
            const jsonObject = this.workingGrid;

            localStorage.setItem(name, JSON.stringify(jsonObject));
        },
        loadGrid(name) {
            // REFACTOR!!!!
            this.workingGrid = null;

            this.workingGrid = JSON.parse(localStorage.getItem(name));

            if (this.workingGrid) {
                this.gridLoaded = true;
            }
        },
        // META

        handleMeta(att, val) {
            this.workingGrid.meta[att] = val;

        },
        // cells

        randomHSL() {
            const H = Math.floor(Math.random() * 360)
            const S = Math.floor(Math.random() * 100)
            const L = Math.floor(Math.random() * 100)

            return `hsl(${H}, ${S}%, ${L}%)`;

        },
        randomizeCells(att) {
            if (att === "backgroundColor");

            for (let i = 0; i < this.maxCellAmount; i++) {
                const color = this.randomHSL();
                this.workingGrid.cells[i][att] = color;
                console.log("this.workingGrid.cells[i][att]", this.workingGrid.cells[i][att])
            }




        },
        setCellDesign(att, val) {
            console.log("setCellDesign", att, val)

            for (let i = 0; i < this.maxCellAmount; i++) {
                this.workingGrid.cells[i][att] = val
            }


        },


    }
})
