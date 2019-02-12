import memoizeByArgs from '../src/memoizeByArgs';

describe('memoizeByArgs', () => {
  let fn;
  let memoizedFn;

  beforeEach(() => {
    fn = jest.fn((a, b, c) => a + b + c);
    memoizedFn = memoizeByArgs(fn);
  });

  it('should return cached result', () => {
    memoizedFn(1);
    memoizedFn(1, 2);
    memoizedFn(1, 2, 3);

    memoizedFn(1);
    memoizedFn(1, 2);
    memoizedFn(1, 2, 3);

    expect(fn.mock.calls.length).toBe(3);
  });
});
