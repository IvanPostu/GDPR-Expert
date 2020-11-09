/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class UnsuccessResponseData {
  private _status: number
  private _keywords: Array<string>

  constructor(status: number, keywords: Array<string>) {
    this._status = status
    this._keywords = keywords
  }

  get status(): number {
    return this._status
  }

  get keywords(): Array<string> {
    return this._keywords
  }

  private get _isUnsuccessResponseDataType(): boolean {
    return true
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isUnsuccessResponseData(o: any): boolean {
    let result = false
    result = typeof o === 'object'
    result = Boolean((o as UnsuccessResponseData)._isUnsuccessResponseDataType)

    return result
  }
}
