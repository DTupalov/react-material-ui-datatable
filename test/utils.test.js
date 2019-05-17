import { search } from '../src/utils';

const dataStub = [{ a: 1 }, { a: 3 }, { a: 2 }, { a: 5 }, { a: 6 }, { a: 4 }];

describe('utils', () => {
  it('should omit unattainable path', () => {
    const expectedData = [{ a: 1 }];
    expect(
      search('1', [
        { name: 'a', searchable: true },
        { name: 'b', searchable: true },
      ])(dataStub)
    ).toEqual(expectedData);
  });
});
