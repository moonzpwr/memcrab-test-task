export const getPercentile = (values: number[], p: number): number => {
	if (values.length === 0) {
		return 0;
	}

	if (values.length === 1) {
		return values[0];
	}

	const sorted = [...values].sort((a, b) => a - b);

	const index = (sorted.length - 1) * (p / 100);

	const lower = Math.floor(index);
	const upper = Math.ceil(index);

	if (lower === upper) {
		return sorted[lower];
	}

	const weight = index - lower;

	const result = sorted[lower] + (sorted[upper] - sorted[lower]) * weight;

	return Number(result.toFixed(1));
};
