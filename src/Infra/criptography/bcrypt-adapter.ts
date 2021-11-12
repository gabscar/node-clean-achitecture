import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'
export class BcryptAdapter implements Encrypter {
  private readonly saltBcryptParam: number

  constructor (salt) {
    this.saltBcryptParam = salt
  }

  async encrypt (value: string): Promise<string> {
    const returnedHash = await bcrypt.hash(value, this.saltBcryptParam)
    return returnedHash
  }
}
