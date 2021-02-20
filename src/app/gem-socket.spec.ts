import { GemSocket } from './gem-socket';
import { GemSocketColor } from './item/item';

describe('GemSocket', () => {
  it('should create an instance', () => {
    expect(new GemSocket(GemSocketColor.blue)).toBeTruthy();
  });
});
