
import { PaymentReceived } from '../../generated/templates/PaymentSplitterTemplate/PaymentSplitter'
import { Donation, Payee} from "../../generated/schema";
import { PayeeAdded } from '../../generated/templates/PaymentSplitterTemplate/PaymentSplitter';
import { log } from '@graphprotocol/graph-ts';

export function handlePaymentReceived (event: PaymentReceived): void {
    log.info("Creating Donation",[])
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
export function handlePayeeAdded(event: PayeeAdded): void{
    log.info("Creating payee",[])
    let address = event.params.account
    let paymentSplitter = event.params.paymentSplitter
    let shares = event.params.shares

    let id = address.toHexString()
    let entity = new Payee(id)
    entity.address = address
    entity.paymentSplitter = paymentSplitter.toHexString()
    entity.save()
}