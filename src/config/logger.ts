import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

export const logger = pino(
  isDev
    ? { transport: { target: 'pino-pretty' }, level: 'debug' }
    : { level: 'info' }
);

//winston logfile
