export interface Panel {
	id: number,
	serial: string;
	images: {
		colored: string;
		xray: string;
	};
	preloaded: number;
	flashed_data?: any[];
}
