import { Gem, GemColor, GemQuality } from './gem';

describe('Gem', () => {
  it('should create an instance', () => {
    expect(new Gem(1, 'any', GemColor.blue, GemQuality.common, {})).toBeTruthy();
  });
});
