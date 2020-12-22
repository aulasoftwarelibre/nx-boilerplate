import { Username } from './username';

describe('Username', () => {
  it('should be a lowercase string without spaces', () => {
    expect(Username.fromString('username').value).toBe('username');
  });
  it('should not have spaces', () => {
    expect(() => {
      Username.fromString('user name');
    }).toThrow();
  });

  it('should not be empty', () => {
    expect(() => {
      Username.fromString('');
    }).toThrow();
  });
});
