
import { PaymentSplitterCreated } from '../../generated/Givematic/Givematic'
import { PaymentSplitter} from "../../generated/schema";
import { PaymentSplitterTemplate } from '../../generated/templates'

export function handlePaymentSplitterCreated (event: PaymentSplitterCreated): void {
    let address = event.params.newContract
    let name = event.params.name
    let category = event.params.category
    let shares = event.params.shares
    let tokenAddress = event.params.tokenAddress
    
    let id = address.toHexString()
    let entity = new PaymentSplitter(id)
    entity.address = address
    entity.name = name
    entity.category = category
    entity.shares = shares
    entity.tokenAddress = tokenAddress

    PaymentSplitterTemplate.create(address)

    entity.save()
}