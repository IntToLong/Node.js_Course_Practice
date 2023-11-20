/* eslint-disable @typescript-eslint/no-unused-vars */
import constants from '../constants';
import {connect, connection} from 'mongoose';

export default function connectDB(): void {
  try {
    connect(constants.URIDB);
  } catch (err: unknown) {
    console.error((err as Error).message);
    process.exit(1);
  }
  const dbConnection = connection;
  dbConnection.once('open', (_) => {
    console.log(`Database connected: ${constants.URIDB}`);
  });

  dbConnection.on('error', (err: Error) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
