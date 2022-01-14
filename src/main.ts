const sleep = (ms: number): Promise<number> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const handler = async (): Promise<{ message: string }> => {
  console.log(`hello world`);

  await sleep(500);

  return {
    message: 'hello world',
  };
};

export { handler };
