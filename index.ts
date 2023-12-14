export function separate(text: string, regexp: RegExp): (string | RegExpExecArray)[] {
  const slice = text.split(regexp);
  const reg = getAllRegexp(text, regexp);
  const texts = takeOnlyText(slice, reg);

  return texts.reduce((prev: (string | RegExpExecArray)[], curr, idx) => {
    if (idx < reg.length) return [...prev, curr, reg[idx]];
    else return [...prev, curr] 
  }, []);
}

export function getAllRegexp(text: string, regexp: RegExp): RegExpExecArray[] { 
  if (!regexp.global) throw new Error(`Regexp-misc getAllRegexp: regexp ${regexp} must be global`);
  const result: RegExpExecArray[] = [];

  let m: RegExpExecArray | null = null;
  do {
    m = regexp.exec(text);
    if (!!m) result.push(m);
  } while(m);

  return result;
}

function takeOnlyText(split: string[], array: RegExpExecArray[]): string[] {
  const result: string[] = [];
  let s = 0;
  for (let i = 0; (i + s) < split.length; i++) {
    result.push(split[i + s]);
    if (!!array[i]) s += array[i].length - 1;
  }

  return result;
}

export function match<T>(text: string, array: [RegExp, (found: RegExpExecArray) => T][]): T | null {
  for (const [regexp, func] of array) {
    const m: RegExpExecArray | null = regexp.exec(text);
    if (!!m) return func(m);
  }
  return null;
}
