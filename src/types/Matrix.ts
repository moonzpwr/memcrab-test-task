type CellId = number;
type CellValue = number;

export interface Cell {
	id: CellId;
	amount: CellValue;
}

export interface Row {
	id: number;
	cells: Cell[];
}

export type Matrix = Row[];
