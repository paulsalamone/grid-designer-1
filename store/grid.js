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
        },
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
        getGridList() {
            const keys = Object.keys(localStorage);

            // Filter the keys based on the content type
            const filteredKeys = keys.filter(key => {
                // Retrieve the value associated with each key
                const value = localStorage.getItem(key);
                // console.log("key", key);

                if (value.includes("meta")) {
                    return key;
                }

                // return value.includes("meta");
                // Check if the value matches the desired content type
                // return typeof value === contentType;
            });

            // Retrieve the values associated with the filtered keys
            // const filteredValues = filteredKeys.map(key => localStorage.getItem(key));

            // Return the filtered values
            return filteredKeys;
        },
        saveGrid(name) {
            // CHANGE THIS TO WORKING GRID:
            const jsonObject = this.workingGrid;

            localStorage.setItem(name, JSON.stringify(jsonObject));
        },
        loadGrid(name) {
            this.workingGrid = null;
            console.log("loadGrid name ", name)

            this.workingGrid = JSON.parse(localStorage.getItem(name));

            console.log("this.workingGrid", this.workingGrid)

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
