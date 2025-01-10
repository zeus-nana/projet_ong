import Queue from 'bull'
import appConfig from './src/config'

const redisConfig = {
    redis: {
        host: appConfig.redis.host,
        port: appConfig.redis.port,
    },
}

export const fileProcessingQueue = new Queue('fileProcessing', redisConfig)

export const defaultJobOptions: Queue.JobOptions = {
    attempts: 3,
    backoff: {
        type: 'exponential',
        delay: 1000,
    },
}
