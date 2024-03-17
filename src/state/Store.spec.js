import { Store } from './Store';

describe('TEST', () => {
  test('test', () => {
    const store = new Store(() => {}, {});
    expect(store).toBeDefined();
  });
});
