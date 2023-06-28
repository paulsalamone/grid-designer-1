import { defineStore } from 'pinia'

export const useGridStore = defineStore('grid', {
    state: () => ({
        gridLoaded: false,
        defaultGrid: [{
            "meta": {
                "name": "default",
                "columns": "2",
                "rows": "2",
                "gap": "5px",
                "backgroundColor": "red"
            },
            "cells": [
                { id: 0, bg: "tan" },
                { id: 1, bg: "yellow" },
                { id: 2, bg: "orange" },
                { id: 3, bg: "lime" },
            ]
        }
        ],
        sampleGrid: [{
            "meta": {
                "name": "sample",
                "columns": "1fr 1fr 1fr",
                "rows": "1fr 1fr",
                "gap": "10px",
                "backgroundColor": "green"
            },
            "cells": [
                { id: 0, bg: '#FF0000' },
                { id: 1, bg: '#00FF00' },
                { id: 2, bg: '#0000FF' },
                { id: 3, bg: '#FFFF00' },
                { id: 4, bg: '#00FFFF' },
                { id: 5, bg: '#FF00FF' }
            ]
        }
        ],
        workingGrid: null
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
        workingCells: (state) => {
            return parseInt(state.workingGrid[0].meta.rows) * parseInt(state.workingGrid[0].meta.columns)
        }
    },
    actions: {
        increment() {
            this.count++
        },
        setInitialStorage() {
            // set LS to default grid
            const jsonObject = this.defaultGrid

            localStorage.setItem("defaultGrid", JSON.stringify(jsonObject));
        },
        getDefaultGrid() {
            this.workingGrid = JSON.parse(localStorage.getItem("defaultGrid"));
            if (this.workingGrid !== null) {
                this.gridLoaded = true;
            }
        },
        saveGrid(name) {
            // CHANGE THIS TO WORKING GRID:
            const jsonObject = this.sampleGrid;

            localStorage.setItem(name, JSON.stringify(jsonObject));
        },
        loadGrid(name) {
            this.workingGrid = null;
            console.log('loadGrid :', name)
            this.workingGrid = JSON.parse(localStorage.getItem(name));
            if (this.workingGrid) {
                this.gridLoaded = true;
            }
        },
        // META
        setCells() {
            this.workingGrid[0].cells = []


            for (let i = 0; i < this.workingCells; i++) {
                this.workingGrid[0].cells.push({ id: i, bg: 'white' })
            }
        },
        handleMeta(att, val) {
            console.log("att, val", att, val)

            // if rows or columns, update cells
            this.workingGrid[0].meta[att] = val;


            if (att === 'rows' || att === 'columns') {


                this.setCells()
            }

        }
        // CELLS
    }
})
