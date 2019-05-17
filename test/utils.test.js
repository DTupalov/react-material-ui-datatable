import { search } from '../src/utils';

const dataStub = [{ a: 1 }, { a: 3 }, { a: 2 }, { a: 5 }, { a: 6 }, { a: 4 }];

describe('utils', () => {
  it.only('should omit unattainable path if exists search value', () => {
    const expectedData = [{ a: 1 }];
    expect(
      search('1', [
        { name: 'a', searchable: true },
        { name: 'b', searchable: true },
      ])(dataStub)
    ).toEqual(expectedData);
  });
  it.only('should display all data if exists unattainable path and not exists search value', () => {
    const expectedData = dataStub;
    expect(
      search('', [
        { name: 'a', searchable: true },
        { name: 'b', searchable: true },
      ])(dataStub)
    ).toEqual(expectedData);
  });
});
