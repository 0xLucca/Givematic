
import { PaymentReceived } from '../../generated/templates/PaymentSplitterTemplate/PaymentSplitter'
import { Donation} from "../../generated/schema";
import { PaymentSplitter } from "../../generated/schema";

export function handlePaymentReceived (event: PaymentReceived): void {
    let from = event.params.from
    let paymentSplitter = event.params.paymentSplitter
    let amount = event.params.amount
    let token = event.params.token
 
    let id = event.transaction.hash.toHex() + "-" + event.logIndex.toString()
    let entity = new Donation(id)
    entity.donator = from
    entity.paymentSplitter = paymentSplitter.toHexString()
    entity.amount = amount
    entity.token = token
    entity.save()
}