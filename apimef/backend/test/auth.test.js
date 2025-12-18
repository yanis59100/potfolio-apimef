const bcrypt = require('bcryptjs');

describe('Password hashing', () => {
  test('should hash password', async () => {
    const password = 'test123';
    const hash = await bcrypt.hash(password, 10);
    expect(hash).toBeDefined();
    expect(await bcrypt.compare(password, hash)).toBe(true);
  });
});