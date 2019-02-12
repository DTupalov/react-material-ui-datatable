export const cache = new Map();

const hasCachedResult = (args, fn, cache) =>
  args.every((arg, index) => {
    const hasCachedValue = cache.has(arg);
    if (hasCachedValue) {
      cache = cache.get(arg);
    }

    return hasCachedValue;
  });

const getCachedResult = (args, fn, cache) =>
  args.reduce((nextCachedValue, arg) => nextCachedValue.get(arg), cache);

const setCachedResult = (args, fn, cache) => {
  const fnResult = fn.apply(null, args);

  args.reduce((cachedValue, arg, index, args) => {
    if (cachedValue.has(arg)) return cachedValue.get(arg);

    let nextCachedValue;
    const isLastArg = index === args.length - 1;

    if (isLastArg) {
      nextCachedValue = fnResult;
    } else {
      nextCachedValue = new Map();
    }

    cachedValue.set(arg, nextCachedValue);

    return nextCachedValue;
  }, cache);

  return fnResult;
};

const fillArgsByFnLength = (args, fnLength) =>
  new Array(fnLength).fill(undefined).map((v, i) => args[i]);

const cachedResult = (args, fn, cache) =>
  hasCachedResult(args, fn, cache)
    ? getCachedResult(args, fn, cache)
    : setCachedResult(args, fn, cache);

export default fn => {
  const cachedFn = cache.get(fn) || (cache.set(fn, new Map()) && cache.get(fn));

  return (...args) => {
    const filledArgs = fillArgsByFnLength(args, fn.length);
    const result = cachedResult(filledArgs, fn, cachedFn);
    return result;
  };
};
