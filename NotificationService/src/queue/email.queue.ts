import { Queue } from "bullmq";

import { connectionObj } from "../config/redis.config";


export const EMAIL_QUEUE = "email-queue";

export const email_queue = new Queue(EMAIL_QUEUE, { connection : connectionObj });
