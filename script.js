"use strict";

class Grid {
	#size;
	#cells;
	#gridContainerElement;

	constructor(size = 16) {
		this.#size = size;
		this.#cells = [];
		this.#gridContainerElement = document.querySelector("section.grid");
		this.#updateGridSize();
		this.#populateGrid();
		this.#gridContainerElement.addEventListener("mouseover", (event) => {
			const cell = event.target;
			if (cell != this.#gridContainerElement) {
				cell.style.backgroundColor = "black";
			}
		});
	}

	get cellWidth() {
		return Math.floor((0.8 * window.visualViewport.height) / this.#size);
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
		for (let i = 0; i < this.#size ** 2; i++) {
			const cell = document.createElement("div");
			cell.className = "cell";
			cell.style.width = `${this.cellWidth}px`;
			cell.style.height = `${this.cellWidth}px`;
			this.#cells[i] = cell;
			this.#gridContainerElement.appendChild(cell);
		}
	}

	#clearGrid() {
		for (let cell of this.#cells) {
			cell.remove();
		}
		this.#cells = [];
	}

	#updateGridSize() {
		this.#gridContainerElement.style.width = `${this.gridWidth}px`;
		this.#gridContainerElement.style.height = `${this.gridWidth}px`;
	}
}

const grid = new Grid();

const dialogElement = document.querySelector("dialog.set-size");
const changeSizeButton = document.querySelector("button.change-size");
changeSizeButton.addEventListener("click", openDialog);

const confirmSizeButton = document.querySelector("button.confirm-size");
confirmSizeButton.addEventListener("click", confirmSize);

function openDialog(event) {
	dialogElement.showModal();
}

function confirmSize(event) {
	const input = document.querySelector("input.size-input");
	const inputValue = Number(input.value);
	if (Number.isSafeInteger(inputValue)) {
		grid.changeSize(inputValue);
		dialogElement.close();
	}
}
