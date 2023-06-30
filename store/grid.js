import { defineStore } from 'pinia'

export const useGridStore = defineStore('grid', {
    state: () => ({
        gridLoaded: false,
        defaultGrid: {
            "type": "grid",
            "meta": {
                "name": "default",
                "columns": "3",
                "rows": "3",
                "gap": "5",
                "backgroundColor": "10",
            },
            "cells": [
                { id: 0, backgroundColor: "blue", borderWidth: "1", borderColor: "black" },
                { id: 1, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 2, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 3, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 4, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 5, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 6, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 7, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 8, backgroundColor: "red", borderWidth: "1", borderColor: "black" },
            ]
        },
        workingGrid: {
            meta: null,
            referenceCells: [],
            visibleCells: null,
        },
        maxRows: 20,
        maxColumns: 20,
    }),
    getters: {
        workingCellAmount: (state) => {
            return parseInt(state.workingGrid.meta.rows) * parseInt(state.workingGrid.meta.columns)
        },
        maxCellAmount: (state) => {
            return state.maxRows * state.maxColumns;
        }
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
            this.workingGrid.visibleCells = grid.cells;

            for (let i = 0; i < this.maxCellAmount; i++) {
                this.workingGrid.referenceCells.push(this.workingGrid.visibleCells[i])
            }

            if (this.workingGrid.meta !== null) {
                this.gridLoaded = true;
            }
        },
        getGridList() {
            const keys = Object.keys(localStorage);


            const filteredKeys = keys.filter(key => {

                const value = localStorage.getItem(key);

                if (value.includes("grid")) {
                    return key;
                }

            });


            return filteredKeys;
        },
        saveGrid(name) {
            // CHANGE THIS TO WORKING GRID:
            const jsonObject = this.workingGrid;

            localStorage.setItem(name, JSON.stringify(jsonObject));
        },
        loadGrid(name) {
            // this is all wrong
            this.workingGrid = null;

            this.workingGrid = JSON.parse(localStorage.getItem(name));



            if (this.workingGrid) {
                this.gridLoaded = true;
            }
        },
        // META
        setCellCollection() {
            this.workingGrid.cells = []
            for (let i = 0; i < this.workingCellAmount; i++) {
                this.workingGrid.visibleCells.push({ id: i, backgroundColor: 'white' })
            }
        },
        handleMeta(att, val) {
            this.workingGrid.meta[att] = val;

            if (att === 'rows' || att === 'columns') {
                this.setCellCollection()
            }


        },
        // CELLS
        setCellDesign(att, val) {
            console.log("setCellDesign", att, val)
            for (let i = 0; i < this.workingCellAmount; i++) {

                console.log(`set cell ${i} to ${val}`)
                this.workingGrid.visibleCells[i][att] = val;

            }


        },


    }
})
