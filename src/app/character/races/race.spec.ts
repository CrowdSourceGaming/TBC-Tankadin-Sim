import { Race, Races } from './race';

describe('Race', () => {
  it('should create an instance', () => {
    expect(new Race(Races.human)).toBeTruthy();
  });
});
