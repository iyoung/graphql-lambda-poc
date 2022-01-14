import { handler } from './main';

console.log = jest.fn();

it('says hello with the sequence id', async () => {
  await handler();
  expect(console.log).toHaveBeenCalledWith(`hello world`);
});
