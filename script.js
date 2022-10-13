const GRID_SIZE = 16;
const GRID_WIDTH = Math.floor(0.8 * window.visualViewport.height);

const gridBox = document.querySelector("section.grid");
gridBox.style.width = `${GRID_WIDTH}px`;
gridBox.style.height = `${GRID_WIDTH}px`;

const cells = populateGridBox(gridBox, GRID_SIZE, GRID_WIDTH);

function populateGridBox(gridElement, size, gridWidth) {
	const cells = [];

	for (let y = 0; y < size; y++) {
		cells[y] = [];
		for (let x = 0; x < size; x++) {
			const cell = document.createElement("div");
			const cellSize = Math.floor(gridWidth / size);
			cell.className = "cell";
			cell.style.width = `${cellSize}px`;
			cell.style.height = `${cellSize}px`;
			cells[y][x] = cell;
			gridElement.appendChild(cell);
		}
	}
}
