import { Mth } from './mth';

describe('Mth', () => {
  it('coordsOnCircle', () => {
    expect(Mth.coordsOnCircle(10).length).toEqual(10, 'should generate nr of coords');
  });
});
