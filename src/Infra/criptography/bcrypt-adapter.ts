import { Hasher } from '../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'
export class BcryptAdapter implements Hasher {
  private readonly saltBcryptParam: number

  constructor (salt) {
    this.saltBcryptParam = salt
  }

  async hash (value: string): Promise<string> {
    const returnedHash = await bcrypt.hash(value, this.saltBcryptParam)
    return returnedHash
  }
}
