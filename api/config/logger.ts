'use strict';

import { winston } from '@strapi/logger';

export default {
    level: 'info',
    transports: [
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.ms(),
        }),
        new winston.transports.File({ filename: 'debug.log', format: winston.format.ms() }),
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
};
