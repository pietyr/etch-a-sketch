const GRID_SIZE = 16;
const CELL_WIDTH = Math.floor((0.8 * window.visualViewport.height) / GRID_SIZE);
const GRID_WIDTH = GRID_SIZE * (CELL_WIDTH + 2);

const gridBox = document.querySelector("section.grid");
gridBox.style.width = `${GRID_WIDTH}px`;
gridBox.style.height = `${GRID_WIDTH}px`;
gridBox.addEventListener("mouseover", changeColor, gridBox);

populateGridBox(gridBox, GRID_SIZE, CELL_WIDTH);

function populateGridBox(gridElement, size, cellSize) {
	const cells = [];

	for (let y = 0; y < size; y++) {
		cells[y] = [];
		for (let x = 0; x < size; x++) {
			const cell = document.createElement("div");
			cell.className = "cell";
			cell.style.width = `${cellSize}px`;
			cell.style.height = `${cellSize}px`;
			cells[y][x] = cell;
			gridElement.appendChild(cell);
		}
	}
	return cells;
}

function changeColor(event) {
	const cell = event.target;
	if (cell != gridBox) {
		cell.style.backgroundColor = "black";
	}
}
