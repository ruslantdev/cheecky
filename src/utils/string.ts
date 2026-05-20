export const ucFirst = (str?: string, allLower?: boolean) => {
  if (str === undefined) {
    return '';
  }

  if (str) {
    let data = str;

    if (allLower) {
      data = data.toLowerCase();
    }

    return data[0] ? data[0].toUpperCase() + data.slice(1) : data;
  }

  return str;
};

export const ucFirsts = (str?: string) => {
  if (str === undefined) {
    return '';
  }

  if (str) {
    const parts = str.split(' ');

    if (parts.length) {
      return parts.reduce((all, part) => {
        return `${all}${all ? ' ' : ''}${ucFirst(part)}`;
      }, '');
    }
  }

  return str;
};

export const gmtFromString = (str?: string | null) => {
  if (str === undefined || str === null) {
    return '';
  }

  const match = str.match(/GMT[-+]\d+:\d+/);

  return match ? match[0] : str;
};

export const multilineToString = (value?: string | null) => {
  if (!value) {
    return '';
  }

  return value
    .trim()
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
    .join('\n');
};
