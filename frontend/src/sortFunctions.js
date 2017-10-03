const OPTIONS = new Map([['voteScore', 'Rating'], ['timestamp', 'Date']]);

export const sortBy = option => OPTIONS.get(option);

export const sortDefault = () => 'voteScore';

export const getOptions = () => Array.from(OPTIONS);

export const compareFunction = sortBy => (a, b) => b[sortBy] - a[sortBy];
