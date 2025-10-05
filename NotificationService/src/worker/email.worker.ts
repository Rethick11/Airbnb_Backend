import { Worker, Job } from "bullmq";
import { EMAIL_QUEUE } from "../queue/email.queue";
import { EmailDTO } from "../DTO/email.dto";
import { MAIL_PAYLOAD } from "../producer/email.producer";
import { connectionObj } from "../config/redis.config";
// import { sendEmail } from "../services/email.service";

export const workerSetup = () => {
  console.log("worker got setup");
  
  const worker = new Worker<EmailDTO>(
    EMAIL_QUEUE,
    async (job: Job<EmailDTO>) => {
      if (job.name == MAIL_PAYLOAD) {
        const data = job.data;
        console.log("Mail Processed by Worker ", job.id, data);
      }

      // try {
      //   await sendEmail(data);
      // } catch (err) {
      //   console.error("Failed to send email for job:", job.id, err);
      //   throw err; // rethrow to mark the job as failed
      // }
    },{
        connection : connectionObj
    }
  );

  worker.on("completed", (job) => {
    console.log(`✅ Successfully processed job ${job.id}`);
  });

  worker.on("error", (err) => {
    console.error("❌ Worker error:", err);
  });
};
