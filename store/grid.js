import { defineStore } from "pinia";

export const useGridStore = defineStore("grid", {
  state: () => ({
    maxRows: 60,
    maxColumns: 60,
    maxCellBorderWidth: 20,
    maxRandom: {
      background: {
        hue: 360,
        saturation: 100,
        lightness: 50,
      },
      border: {
        hue: 360,
        saturation: 100,
        lightness: 100,
        width: 20,
        radius: 20,
      },
      transform: {
        scale: 2,
        translateX: 150,
        translateY: 150,
        rotate: 90,
      },
      boxShadow: {
        x: 10,
        y: 10,
        blur: 10,
        color: "#00ff44",
      },
    },
    defaultGrid: {
      type: "grid",
      meta: {
        name: "default",
        columns: 4,
        rows: 4,
        gap: 5,
        backgroundColor: 200,
      },
    },
    workingGrid: {
      meta: null,
      cells: [],
    },
    gridLoaded: false,
    randomizerStrength: 2,
  }),
  getters: {
    visibleCellAmount: (state) => {
      return state.workingGrid.meta.rows * state.workingGrid.meta.columns;
    },
    maxCellAmount: (state) => {
      return state.maxRows * state.maxColumns;
    },
  },
  actions: {
    //  STORAGE
    setInitialStorage() {
      // set LS to default grid
      const jsonObject = this.defaultGrid;

      localStorage.setItem("defaultGrid", JSON.stringify(jsonObject));
    },
    getDefaultGrid() {
      const grid = JSON.parse(localStorage.getItem("defaultGrid"));

      this.workingGrid.meta = grid.meta;
      // this.workingGrid.cells = grid.cells;
      console.log("this.workingGrid.meta", this.workingGrid.meta);
      for (let i = 0; i < this.maxCellAmount; i++) {
        this.workingGrid.cells.push({
          id: i,
          background: {
            hue: 200,
            saturation: 80,
            lightness: 80,
          },
          border: {
            hue: 200,
            saturation: 100,
            lightness: 50,
            width: 1,
            style: "solid",
            radius: 0,
          },
          transform: {
            scale: "1",
            translateX: "0",
            translateY: "0",
            rotate: "0",
          },
          boxShadow: {
            x: "0",
            y: "0",
            blur: "0",
            color: "#000000",
          },
        });
      }

      // assign compound variables:
      for (let i = 0; i < this.maxCellAmount; i++) {
        const cell = this.workingGrid.cells[i];

        cell[
          "backgroundColor"
        ] = `hsl(${cell.background.hue},${cell.background.saturation}%,${cell.background.lightness}%)`;

        cell[
          "borderColor"
        ] = `hsl(${cell.border.hue},${cell.border.saturation}%,${cell.border.lightness}%)`;

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

      const filteredKeys = keys.filter((key) => {
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
      console.log("setParameter", destination, section, attribute, value);

      if (destination === "cells") {
        this.setCells(section, attribute, value);
      }

      if (destination === "meta") {
        this.setMeta(attribute, value);
      }
    },
    setMeta(att, val) {
      console.log("setMeta", att, val);
      this.workingGrid.meta[att] = val;
    },
    setCells(section, att, val) {
      console.log("setCells: ", section, att, val);

      for (let i = 0; i < this.maxCellAmount; i++) {
        // console.log("ppp this.workingGrid.cells[i][section][att]", this.workingGrid.cells[i][section])
        this.workingGrid.cells[i][section][att] = val;
      }
    },

    setHSL(attribute, value) {
      console.log("setHSL", attribute, value);
      if (attribute === "backgroundColor") {
        this.setCellDesign("backgroundColor", value);
      }
      if (attribute === "borderColor") {
        this.setCellDesign("borderColor", value);
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

      if (att === "") this.workingGrid.cells[index][att] = val;
    },
    getRandomHexColor() {
      // Generate three random values for red, green, and blue channels
      const red = Math.floor(Math.random() * 256);
      const green = Math.floor(Math.random() * 256);
      const blue = Math.floor(Math.random() * 256);

      // Convert the decimal values to hexadecimal strings
      const redHex = red.toString(16).padStart(2, "0");
      const greenHex = green.toString(16).padStart(2, "0");
      const blueHex = blue.toString(16).padStart(2, "0");

      // Combine the hexadecimal values and return the color code
      let colorCode;
      colorCode = "#" + redHex + greenHex + blueHex;
      console.log("colorCode", colorCode);
      return colorCode;
    },

    randomizeTemplate(section) {
      console.log("randomizeTemplate for: ", section);

      //
    },
    handleRandomizer(selected, linked) {
      console.log("handleRandomizer", selected);

      
      const destination = selected[0];
      const section = selected[1];
      const attribute = selected[2];

      if (destination === "meta" && section === "template") {
        this.randomizeTemplate(section);
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
        "none",
      ];

      for (let i = 0; i < this.maxCellAmount; i++) {
        const rand1 = Math.floor(
          Math.random() * this.maxRandom[section][attribute] 
        );

        // all this does is cut down the final number
        const rand = rand1 / this.randomizerStrength
        // console.log("attenuated", attenuated)
console.log("rand:", rand)
        if (section === "boxShadow" && attribute === "color") {
          console.log("box col");
          // const colour = this.getRandomHexColor()
          this.workingGrid.cells[i][section][attribute] =
            this.getRandomHexColor();
          console.log("section, attribute", section, attribute);
          console.log(
            "this.workingGrid.cells[i][section][attribute]",
            this.workingGrid.cells[i][section][attribute]
          );

          continue;
        }

        if (attribute === "style") {
          const randStyle = styles[Math.floor(Math.random() * styles.length)];
          this.workingGrid.cells[i][section][attribute] = randStyle;
          continue;
        } 
        
        if (attribute === "scale") {
          const scaler = Math.floor(Math.random() * 10);
          this.workingGrid.cells[i][section][attribute] = `0.${scaler}`;
          console.log("scale::", this.workingGrid.cells[i][section][attribute]);
          continue;

        } 

        // STANDARD PARAM
          
          this.workingGrid.cells[i][section][attribute] = rand;
        
      }
    },

    randomHSL(factor = "hue") {
      const H = Math.floor(Math.random() * 360);
      const S = Math.floor(Math.random() * 100);
      const L = Math.floor(Math.random() * 100);

      if (factor === "hue") return `hsl(${H}, 100%, 50%)`;
      if (factor === "saturation") return `hsl(100, ${S}%, 50%)`;
      if (factor === "lightness") return `hsl(100, 100%, ${L}%)`;
    },
    randomizeCells(att) {},
  },
});
