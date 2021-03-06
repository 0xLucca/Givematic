// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class ERC20PaymentReleased extends ethereum.Event {
  get params(): ERC20PaymentReleased__Params {
    return new ERC20PaymentReleased__Params(this);
  }
}

export class ERC20PaymentReleased__Params {
  _event: ERC20PaymentReleased;

  constructor(event: ERC20PaymentReleased) {
    this._event = event;
  }

  get token(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class PayeeAdded extends ethereum.Event {
  get params(): PayeeAdded__Params {
    return new PayeeAdded__Params(this);
  }
}

export class PayeeAdded__Params {
  _event: PayeeAdded;

  constructor(event: PayeeAdded) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get paymentSplitter(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get shares(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class PaymentReceived extends ethereum.Event {
  get params(): PaymentReceived__Params {
    return new PaymentReceived__Params(this);
  }
}

export class PaymentReceived__Params {
  _event: PaymentReceived;

  constructor(event: PaymentReceived) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get paymentSplitter(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get token(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class PaymentSplitter extends ethereum.SmartContract {
  static bind(address: Address): PaymentSplitter {
    return new PaymentSplitter("PaymentSplitter", address);
  }

  category(): string {
    let result = super.call("category", "category():(string)", []);

    return result[0].toString();
  }

  try_category(): ethereum.CallResult<string> {
    let result = super.tryCall("category", "category():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  getShares(account: Address): BigInt {
    let result = super.call("getShares", "getShares(address):(uint256)", [
      ethereum.Value.fromAddress(account)
    ]);

    return result[0].toBigInt();
  }

  try_getShares(account: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getShares", "getShares(address):(uint256)", [
      ethereum.Value.fromAddress(account)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTotalReleased(): BigInt {
    let result = super.call(
      "getTotalReleased",
      "getTotalReleased():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_getTotalReleased(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTotalReleased",
      "getTotalReleased():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getTotalShares(): BigInt {
    let result = super.call("getTotalShares", "getTotalShares():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getTotalShares(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "getTotalShares",
      "getTotalShares():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  payee(index: BigInt): Address {
    let result = super.call("payee", "payee(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(index)
    ]);

    return result[0].toAddress();
  }

  try_payee(index: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("payee", "payee(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(index)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  payees(param0: BigInt): Address {
    let result = super.call("payees", "payees(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toAddress();
  }

  try_payees(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("payees", "payees(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  shares(param0: Address): BigInt {
    let result = super.call("shares", "shares(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);

    return result[0].toBigInt();
  }

  try_shares(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("shares", "shares(address):(uint256)", [
      ethereum.Value.fromAddress(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenAddress(): Address {
    let result = super.call("tokenAddress", "tokenAddress():(address)", []);

    return result[0].toAddress();
  }

  try_tokenAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall("tokenAddress", "tokenAddress():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  totalReleased(): BigInt {
    let result = super.call("totalReleased", "totalReleased():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalReleased(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "totalReleased",
      "totalReleased():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  totalShares(): BigInt {
    let result = super.call("totalShares", "totalShares():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalShares(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalShares", "totalShares():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _name(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _category(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _payees(): Array<Address> {
    return this._call.inputValues[2].value.toAddressArray();
  }

  get shares_(): Array<BigInt> {
    return this._call.inputValues[3].value.toBigIntArray();
  }

  get tokenAddress_(): Address {
    return this._call.inputValues[4].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddPayeeCall extends ethereum.Call {
  get inputs(): AddPayeeCall__Inputs {
    return new AddPayeeCall__Inputs(this);
  }

  get outputs(): AddPayeeCall__Outputs {
    return new AddPayeeCall__Outputs(this);
  }
}

export class AddPayeeCall__Inputs {
  _call: AddPayeeCall;

  constructor(call: AddPayeeCall) {
    this._call = call;
  }

  get account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get shares_(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class AddPayeeCall__Outputs {
  _call: AddPayeeCall;

  constructor(call: AddPayeeCall) {
    this._call = call;
  }
}

export class DonateCall extends ethereum.Call {
  get inputs(): DonateCall__Inputs {
    return new DonateCall__Inputs(this);
  }

  get outputs(): DonateCall__Outputs {
    return new DonateCall__Outputs(this);
  }
}

export class DonateCall__Inputs {
  _call: DonateCall;

  constructor(call: DonateCall) {
    this._call = call;
  }

  get amount(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class DonateCall__Outputs {
  _call: DonateCall;

  constructor(call: DonateCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
