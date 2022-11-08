"use strict";

class Grid {
	#gridSize;
	#gridContainerElement;
	#selectedColor;
	#pencilSize;
	#cells;
	#tool;
	#pencilMode;
	#callback;
	#gridLinesVisible;

	constructor(gridSize = 16) {
		this.#gridSize = gridSize;
		this.#gridContainerElement = document.querySelector("div.grid-wrapper");
		this.#selectedColor = "black";
		this.#pencilSize = 1;
		this.#tool = "pencil";
		this.#pencilMode = "continuous";
		this.#gridLinesVisible = true;
		this.#callback = this.#eventHandler.bind(this);
		this.#cells = [];
		this.#createGrid();
		this.#updateGridSize();
		this.#populateGrid();
	}

	get cellWidth() {
		const parentElementHeight =
			document.querySelector("div.grid-wrapper").offsetHeight;
		return Math.floor(parentElementHeight / this.#gridSize);
	}

	get gridWidth() {
		return this.#gridSize * this.cellWidth;
	}

	changeSize(newSize) {
		this.#gridSize = newSize;
		this.#removeGrid();
		this.#updateGridSize();
		this.#populateGrid();
	}

	clearGrid() {
		this.#removeGrid();
		this.#updateGridSize();
		this.#populateGrid();
		this.changePencilMode(this.#pencilMode);
	}

	changePencilColor(newColor) {
		this.#selectedColor = newColor;
	}

	changePencilSize(newPencilSize) {
		this.#pencilSize = newPencilSize;
	}

	changeTool(newTool) {
		this.#tool = newTool;
	}

	changePencilMode(mode) {
		this.#pencilMode = mode;

		if (mode == "on-click") {
			this.#gridContainerElement.removeEventListener(
				"mousemove",
				this.#callback
			);

			this.#gridContainerElement.addEventListener(
				"mousedown",
				this.#callback
			);

			this.#gridContainerElement.addEventListener("mousedown", () => {
				this.#gridContainerElement.addEventListener(
					"mousemove",
					this.#callback
				);
			});

			this.#gridContainerElement.addEventListener("mouseup", () => {
				this.#gridContainerElement.removeEventListener(
					"mousemove",
					this.#callback
				);
			});
		}

		if (mode == "continuous") {
			this.#gridContainerElement.removeEventListener(
				"mousedown",
				this.#callback
			);
			this.#gridContainerElement.removeEventListener(
				"mouseup",
				this.#callback
			);

			this.#gridContainerElement.addEventListener(
				"mousemove",
				this.#callback
			);
		}
	}

	switchGridLines(newState) {
		this.#gridLinesVisible = newState;
		for (let i = 0; i < this.#gridSize; i++) {
			for (let j = 0; j < this.#gridSize; j++) {
				this.#cells[i][j].classList.toggle("grid-lines-shown");
			}
		}
	}

	#populateGrid() {
		const width = `${this.cellWidth}px`;
		for (let i = 0; i < this.#gridSize; i++) {
			this.#cells[i] = [];
			for (let j = 0; j < this.#gridSize; j++) {
				const cell = document.createElement("div");
				if (this.#gridLinesVisible) {
					cell.className = "cell grid-lines-shown";
				} else {
					cell.className = "cell";
				}

				cell.style.width = width;
				cell.style.height = width;
				cell.draggable = false;
				cell.dataset.column = j;
				cell.dataset.row = i;
				this.#cells[i][j] = cell;
				this.#gridContainerElement.appendChild(cell);
			}
		}
	}

	#removeGrid() {
		this.#gridContainerElement.remove();
		this.#createGrid();
	}

	#eventHandler(event) {
		const cell = event.target;
		let color = this.#selectedColor;
		if (this.#tool == "eraser") {
			color = "white";
		}

		if (cell != this.#gridContainerElement) {
			cell.style.backgroundColor = `var(--cell-${color})`;
			if (this.#pencilSize > 1) {
				const currentCellRow = Number(cell.dataset.row);
				const currentCellColumn = Number(cell.dataset.column);

				// left cell [0][-1]
				if (currentCellColumn > 0) {
					this.#cells[currentCellRow][
						currentCellColumn - 1
					].style.backgroundColor = `var(--cell-${color})`;
				}

				// top cell [-1][0]
				if (currentCellRow > 0) {
					this.#cells[currentCellRow - 1][
						currentCellColumn
					].style.backgroundColor = `var(--cell-${color})`;
				}

				// right cell [0][+1]
				if (currentCellColumn < this.#gridSize - 1) {
					this.#cells[currentCellRow][
						currentCellColumn + 1
					].style.backgroundColor = `var(--cell-${color})`;
				}

				// bottom cell [+1][0]
				if (currentCellRow < this.#gridSize - 1) {
					this.#cells[currentCellRow + 1][
						currentCellColumn
					].style.backgroundColor = `var(--cell-${color})`;
				}

				if (this.#pencilSize == 3) {
					// left [0][-2]
					if (currentCellColumn > 1) {
						this.#cells[currentCellRow][
							currentCellColumn - 2
						].style.backgroundColor = `var(--cell-${color})`;
					}

					// left-top [-1][-1]
					if (currentCellColumn > 0 && currentCellRow > 0) {
						this.#cells[currentCellRow - 1][
							currentCellColumn - 1
						].style.backgroundColor = `var(--cell-${color})`;
					}

					// top [-2][0]
					if (currentCellRow > 1) {
						this.#cells[currentCellRow - 2][
							currentCellColumn
						].style.backgroundColor = `var(--cell-${color})`;
					}

					// right-top [-1][+1]
					if (
						currentCellColumn < this.#gridSize - 1 &&
						currentCellRow > 0
					) {
						this.#cells[currentCellRow - 1][
							currentCellColumn + 1
						].style.backgroundColor = `var(--cell-${color})`;
					}

					// right [0][+2]
					if (currentCellColumn < this.#gridSize - 2) {
						this.#cells[currentCellRow][
							currentCellColumn + 2
						].style.backgroundColor = `var(--cell-${color})`;
					}

					// right-bot [+1][+1]
					if (
						currentCellColumn < this.#gridSize - 1 &&
						currentCellRow < this.#gridSize - 1
					) {
						this.#cells[currentCellRow + 1][
							currentCellColumn + 1
						].style.backgroundColor = `var(--cell-${color})`;
					}

					// bot [+2][0]
					if (currentCellRow < this.#gridSize - 2) {
						this.#cells[currentCellRow + 2][
							currentCellColumn
						].style.backgroundColor = `var(--cell-${color})`;
					}

					// left-bot [+1][-1]
					if (
						currentCellRow < this.#gridSize - 1 &&
						currentCellColumn > 0
					) {
						this.#cells[currentCellRow + 1][
							currentCellColumn - 1
						].style.backgroundColor = `var(--cell-${color})`;
					}
				}
			}
		}
	}
	#createGrid() {
		this.#gridContainerElement = document.createElement("section");
		this.#gridContainerElement.className = "grid";
		this.#gridContainerElement.addEventListener(
			"mousemove",
			this.#callback
		);
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

const gridSizeMenu = document.querySelector(".grid-size menu");
gridSizeMenu.addEventListener("change", function changeSize(e) {
	const selectedGridSizeValue = Number(e.target.value);
	grid.changeSize(selectedGridSizeValue);
});

const colorPicker = document.querySelector(".color-picker");
colorPicker.addEventListener("change", function changeColor(e) {
	const selectedColor = e.target.value;
	grid.changePencilColor(selectedColor);
});

const clearGridButton = document.querySelector("button.clear-grid");
clearGridButton.addEventListener("click", function clearGrid() {
	grid.clearGrid();
});

const pencilSizeSlider = document.querySelector(`input[name="pencil-size"]`);
pencilSizeSlider.addEventListener("change", function changePencilSize(e) {
	grid.changePencilSize(Number(e.target.value));
});

const toolPicker = document.querySelector("section.toolbar");
toolPicker.addEventListener("change", function changeTool(e) {
	grid.changeTool(e.target.value);
});

const gridLinesCheckbox = document.querySelector("input.toggle-checkbox");
gridLinesCheckbox.addEventListener("change", function switchGridLines(e) {
	grid.switchGridLines(e.target.checked);
});

const pencilModeMenu = document.querySelector(".mode-settings menu");
pencilModeMenu.addEventListener("change", function changePencilMode(e) {
	grid.changePencilMode(e.target.value);
});

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
