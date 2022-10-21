"use strict";

class Grid {
	#size;
	#gridContainerElement;

	constructor(size = 16) {
		this.#size = size;
		this.#gridContainerElement = document.querySelector("div.grid-wrapper");
		this.#createGrid();
		this.#updateGridSize();
		this.#populateGrid();
	}

	get cellWidth() {
		const parentElementHeight =
			document.querySelector("div.grid-wrapper").offsetHeight;
		return Math.floor(parentElementHeight / this.#size);
	}

	get gridWidth() {
		return this.#size * this.cellWidth;
	}

	changeSize(newSize) {
		this.#size = newSize;
		this.#clearGrid();
		this.#updateGridSize();
		this.#populateGrid();
	}

	#populateGrid() {
		const width = `${this.cellWidth}px`;
		for (let i = 0; i < this.#size ** 2; i++) {
			const cell = document.createElement("div");
			cell.className = "cell";
			cell.style.width = width;
			cell.style.height = width;
			this.#gridContainerElement.appendChild(cell);
		}
	}

	#clearGrid() {
		this.#gridContainerElement.remove();
		this.#createGrid();
	}

	#createGrid() {
		this.#gridContainerElement = document.createElement("section");
		this.#gridContainerElement.className = "grid";
		this.#gridContainerElement.addEventListener("mouseover", (event) => {
			const cell = event.target;
			if (cell != this.#gridContainerElement) {
				cell.style.backgroundColor = "black";
			}
		});
		document
			.querySelector("div.grid-wrapper")
			.appendChild(this.#gridContainerElement);
	}

	#updateGridSize() {
		this.#gridContainerElement.style.width = `${this.gridWidth}px`;
		this.#gridContainerElement.style.height = `${this.gridWidth}px`;
	}
}

const grid = new Grid();

// const rootElement = document.querySelector(":root");
// const rootComputedStyle = getComputedStyle(rootElement);
// console.log(
// 	`--base-cell-size = ${rootComputedStyle.getPropertyValue(
// 		"--base-cell-size"
// 	)}, --number-of-cells = ${rootComputedStyle.getPropertyValue(
// 		"--number-of-cells"
// 	)}, --real-cell-size = ${rootComputedStyle.getPropertyValue(
// 		"--real-cell-size"
// 	)}`
// );
// rootElement.style.setProperty("--base-cell-size", 3);

// const dialogElement = document.querySelector("dialog.set-size");
// const changeSizeButton = document.querySelector("button.change-size");
// changeSizeButton.addEventListener("click", openDialog);

// const confirmSizeButton = document.querySelector("button.confirm-size");
// confirmSizeButton.addEventListener("click", confirmSize);

// function openDialog(event) {
// 	dialogElement.showModal();
// }

// function confirmSize(event) {
// 	const input = document.querySelector("input.size-input");
// 	const inputValue = Number(input.value);
// 	if (Number.isSafeInteger(inputValue)) {
// 		grid.changeSize(inputValue);
// 		dialogElement.close();
// 	}
// }
