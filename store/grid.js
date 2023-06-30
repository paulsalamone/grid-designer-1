import { defineStore } from 'pinia'

export const useGridStore = defineStore('grid', {
    state: () => ({
        gridLoaded: false,
        defaultGrid: {
            "type": "grid",
            "name": "default",
            "columns": "3",
            "rows": "3",
            "gap": "5",
            "backgroundColor": "10",
            "cells": [
                { id: 0, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 1, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 2, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 3, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 4, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 5, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 6, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 7, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
                { id: 8, backgroundColor: "white", borderWidth: "1", borderColor: "black" },
            ]
        },
        workingGrid: null,
        referenceCells: null,
        maxRows: 20,
        maxColumns: 20,
    }),
    getters: {
        workingCellAmount: (state) => {
            return parseInt(state.workingGrid.rows) * parseInt(state.workingGrid.columns)
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
            this.workingGrid = JSON.parse(localStorage.getItem("defaultGrid"));

            this.referenceCells = this.workingGrid.cells;


            if (this.workingGrid !== null) {
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
            this.workingGrid = null;

            this.workingGrid = JSON.parse(localStorage.getItem(name));



            if (this.workingGrid) {
                this.gridLoaded = true;
            }
        },
        // META
        setCellAmount() {
            this.workingGrid.cells = []
            for (let i = 0; i < this.workingCellAmount; i++) {
                this.workingGrid.cells.push({ id: i, backgroundColor: 'white' })
            }
        },
        handleMeta(att, val) {
            this.workingGrid[att] = val;

            if (att === 'rows' || att === 'columns') {
                this.setCellAmount()
            }


        },
        // CELLS
        setCellDesign(att, val) {
            console.log("setCellDesign", att, val)
            for (let i = 0; i < this.maxCellAmount; i++) {

                this.workingGrid.cells[i][att] = val;

            }


        },
        handleCells(att, val) {
            this.workingGrid[att] = val;
        },
        randomizeCells(type) {

        }

    }
})
