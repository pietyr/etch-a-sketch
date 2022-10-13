let gridSize = 16;
let cellWidth = Math.floor((0.8 * window.visualViewport.height) / gridSize);
let gridWidth = gridSize * (cellWidth + 2);

const gridBox = document.querySelector("section.grid");
gridBox.style.width = `${gridWidth}px`;
gridBox.style.height = `${gridWidth}px`;
gridBox.addEventListener("mouseover", changeColor);

const dialogElement = document.querySelector("dialog.set-size");
const changeSizeButton = document.querySelector("button.change-size");
changeSizeButton.addEventListener("click", openDialog);

const confirmSizeButton = document.querySelector("button.confirm-size");
confirmSizeButton.addEventListener("click", confirmSize);

populateGridBox(gridBox, gridSize, cellWidth);

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

function openDialog(event) {
	dialogElement.showModal();
}

function confirmSize(event) {
	// const input = document.querySelector("")
	gridSize = 16;
	cellWidth = Math.floor((0.8 * window.visualViewport.height) / gridSize);
	gridWidth = gridSize * (cellWidth + 2);
}
