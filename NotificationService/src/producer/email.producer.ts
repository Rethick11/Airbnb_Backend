
import {email_queue} from '../queue/email.queue'

import {EmailDTO} from '../DTO/email.dto'

export const MAIL_PAYLOAD =  'mail-payload'

export const addMailToQueue = (payload : EmailDTO) => {
    email_queue.add(MAIL_PAYLOAD , payload)
    console.log("email added to the queue" + JSON.stringify(payload))
}