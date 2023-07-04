import { defineStore } from 'pinia'

export const useGridStore = defineStore('grid', {
    state: () => ({
        maxRows: 40,
        maxColumns: 40,
        maxCellBorderWidth: 20,
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
                    { id: i, 
                        background: {
                            hue: 200,
                            saturation: 80,
                            lightness: 80
                        },
                        border: {
                            hue: 200,
                            saturation: 100,
                            lightness: 50,
                            width: 1,
                            style: "solid",
                            radius: 10
                        },
                      transform: {
                        scale: 1,
                        translateX: 0,
                        translateY: 0,
                        rotation: 0
                      } ,
                      x: "x",
                      y: "y",
                      blur: "blur",
                      color: "color"
                    }
                )

            }

            // assign compound variables:
            for (let i = 0; i < this.maxCellAmount; i++) {

                const cell = this.workingGrid.cells[i]
                
                cell["backgroundColor"] = `hsl(${cell.background.hue},${cell.background.saturation}%,${cell.background.lightness}%)`;

                cell["borderColor"] = `hsl(${cell.border.hue},${cell.border.saturation}%,${cell.border.lightness}%)`

                // @TODO: transform and box shadow
                // cell["transform"] = ``
                // console.log(cell)

            }

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


        // cells



        setParameter(destination, section, attribute, value) {

            console.log("setParameter", destination, section, attribute, value)

            if (destination === "cells") {
                this.setCells(section, attribute, value)
            }

            if (destination === "meta") {
                this.setMeta(attribute, value)
            }
        },
        setMeta(att, val) {
            console.log("setMeta", att, val)
            this.workingGrid.meta[att] = val;

        },
        setCells(section, att, val) {
            console.log("setCells: ", section, att, val)

            for (let i = 0; i < this.maxCellAmount; i++) {

                // console.log("ppp this.workingGrid.cells[i][section][att]", this.workingGrid.cells[i][section])
                this.workingGrid.cells[i][section][att] = val


            }
        },

        setHSL(attribute, value) {
            console.log("setHSL", attribute, value)
            if (attribute === 'backgroundColor') {
                this.setCellDesign("backgroundColor", value)
            }
            if (attribute === 'borderColor') {
                this.setCellDesign("borderColor", value)
            }

            // if (destination === "meta" && attribute === 'backgroundColor') {
            //     this.setMeta("backgroundColor", value)
            // }


        },

        // RANDOMIZERS:

        setIndividualCells(index, att, factor) {

            const currentCell = this.workingGrid.cells[index].backgroundColor;
            const currentHue = currentCell.split(",")[0].split("(")[1];
            const currentSaturation = currentCell.split(",")[1].split("%")[0];
            const currentLightness = currentCell.split(",")[2].split("%")[0];

            if (att === "")
                this.workingGrid.cells[index][att] = val

        },
        handleRandomizer(selected, linked) {
            const destination = selected[0]
            const section = selected[1]
            const attribute = selected[2]

            const max = {
                background: {
                    hue: 360,
                    saturation: 100,
                    lightness: 100,
                },
                border: {
                    hue: 360,
                    saturation: 100,
                    lightness: 100,
                    width: 20,
                    radius: 20,
                }
            }

            const styles = [
                "dotted",
                "dashed",
                "solid",
                "double",
                "groove",
                "ridge",
                "inset",
                "outset",
                "none"
            ]
  

        for (let i = 0; i < this.maxCellAmount; i++) {
            const rand = Math.floor(Math.random() * max[section][attribute])

            if(attribute === "style"){
// handle style

const randStyle = styles[Math.floor(Math.random() * styles.length)]

this.workingGrid.cells[i][section][attribute] = randStyle


            } else {
                this.workingGrid.cells[i][section][attribute] = rand;

            }

       
        }

        },

        randomHSL(factor = "hue") {
            const H = Math.floor(Math.random() * 360)
            const S = Math.floor(Math.random() * 100)
            const L = Math.floor(Math.random() * 100)

            if (factor === "hue") return `hsl(${H}, 100%, 50%)`;
            if (factor === "saturation") return `hsl(100, ${S}%, 50%)`;
            if (factor === "lightness") return `hsl(100, 100%, ${L}%)`;

        },
        randomizeCells(att) {




        },
    }
})
