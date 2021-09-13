const format = (value) => {
  const numParts = value.toString().split('.');
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return numParts.join('.');
};

const unFormat = (value) => {
  return typeof value === 'string' ? value.replace(/\./g, '').replace(/,/g, '') : value;
};

const checkNewChar = (value, allowsNegatives) => {
  if (!allowsNegatives && /[-]/.test(value)) return false;
  if (value.length !== 2 && /[-]/.test(value.slice(1))) return false;
  return /^$|[0-9\d\-\s]+$/.test(value.slice(-1));
};

export default { format, unFormat, checkNewChar };
