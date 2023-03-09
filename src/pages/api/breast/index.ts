import '@/lib/database';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as tf from '@tensorflow/tfjs-node';
import { ApiError } from 'next/dist/server/api-utils';

const modelPromise = tf.node.loadSavedModel(
  `src/ia-assets/breast_cancer/model`,
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (!req.body.data) throw new ApiError(500, `missing body`);
    const data = JSON.parse(req.body.data);
    const model = await modelPromise;
    const output = model.predict(tf.tensor(data));
    console.log(output.toString());
    const result = output.toString().slice(14, 23); // bancal, trouver la reel solution
    res.status(200).send({ result });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: (e as Error).message });
  }
}
