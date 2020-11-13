/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export class UnsuccessResponseData {
  private _status: number
  private _keywords: { [key: string]: string }

  constructor(status: number, keywords: { [key: string]: string }) {
    this._status = status
    this._keywords = keywords
  }

  get status(): number {
    return this._status
  }

  get keywords(): { [key: string]: string } {
    return this._keywords
  }

  private get _isUnsuccessResponseDataType(): boolean {
    return true
  }

  get isSessionExpired(): boolean {
    return this._status === 401
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static isUnsuccessResponseData(o: any): boolean {
    let result = false
    result = typeof o === 'object'
    result = Boolean((o as UnsuccessResponseData)._isUnsuccessResponseDataType)

    return result
  }
}
