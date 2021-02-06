import { Spec } from './spec';

describe('Spec', () => {
  it('should create an instance', () => {
    expect(new Spec('1001')).toBeTruthy();
  });

  it('should initialize with a spec', () => {
    const spec = new Spec('1410000000000000000010000000000000000000001000000000000000000001');
    expect (spec.talents.divineStrength).toEqual(1);
    expect (spec.talents.divineIntellect).toEqual(4);
    expect (spec.talents.improvedBoM).toEqual(1);
    expect (spec.talents.crusaderStrike).toEqual(1);
  })

  it('should initialize without a spec', () => {
    const spec = new Spec();
    expect (spec.talents.divineStrength).toEqual(0);
    expect (spec.talents.divineIntellect).toEqual(0);
    expect (spec.talents.improvedBoM).toEqual(0);
    expect (spec.talents.crusaderStrike).toEqual(0);
  })
});
