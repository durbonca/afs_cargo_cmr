const format = (value) => {
  if (!value) return '';
  if (value.length < 2) return value;
  let cont = 0;
  let format;
  const valueFormat = String(value).replace('.', '').replace('-', '');
  format = `-${valueFormat.substring(valueFormat.length - 1)}`;
  for (let i = valueFormat.length - 2; i >= 0; i -= 1) {
    format = valueFormat.substring(i, i + 1) + format;
    cont += 1;
    if (cont === 3 && i !== 0) {
      format = `.${format}`;
      cont = 0;
    }
  }
  return format;
};

const unFormat = (value) => {
  if (!value) return '';
  return String(value).replace(/\./g, '').replace('-', '');
};

const newCharIsValid = (value) => {
  return value.length <= 9 && /^$|[0-9-kK\d\-\s]+$/.test(String(value).slice(-1));
};

const dv = (T) => {
  let M = 0;
  let S = 1;
  for (; T; T = Math.floor(T / 10)) {
    S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  }
  return S ? String(S - 1) : 'k';
};

const checkFormat = (value) => {
  if (!value) return false;
  if (+value.substring(0, value.length - 1) < 1) {
    return false;
  }
  if (typeof value !== String) value = format(value);
  if (value.length < 7 || !/^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$/.test(value)) return false;

  value = String(value).replace(/[.]|[-]/g, '');
  const producedDV = dv(value.substr(0, value.length - 1));
  const requestDV = value.substr(-1).toLowerCase();
  return requestDV === producedDV;
};

export default { format, unFormat, newCharIsValid, checkFormat };
