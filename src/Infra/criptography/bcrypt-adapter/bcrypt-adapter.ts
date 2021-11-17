import { Hasher } from '../../../data/protocols/criptography/hasher'
import bcrypt from 'bcrypt'
import { HashCompare } from '../../../data/protocols/criptography/hash-comparer'
export class BcryptAdapter implements Hasher, HashCompare {
  private readonly saltBcryptParam: number

  constructor (salt: number) {
    this.saltBcryptParam = salt
  }

  async hash (value: string): Promise<string> {
    const returnedHash = await bcrypt.hash(value, this.saltBcryptParam)
    return returnedHash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isEqual = await bcrypt.compare(value, hash)
    return new Promise(resolve => resolve(isEqual))
  }
}
