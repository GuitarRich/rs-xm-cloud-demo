import type { NextApiRequest, NextApiResponse } from 'next';

const searchRequest = async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  // Ensure response is text/html

  return res.status(200).send('Hello World Search Response');
};

export default searchRequest;
