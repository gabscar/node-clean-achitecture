import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hashedValue'))
  }
}))

describe('Bycript adapter', () => {
  test('Call bcrypt correct value', async () => {
    const saltBcryptParam = 12
    const sut = new BcryptAdapter(saltBcryptParam)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toBeCalledWith('any_value', saltBcryptParam)
  })
  test('Hash on sucess', async () => {
    const saltBcryptParam = 12
    const sut = new BcryptAdapter(saltBcryptParam)
    const returnedHash = await sut.encrypt('any_value')
    expect(returnedHash).toBe('hashedValue')
  })

  test('bcrypt throws', async () => {
    const saltBcryptParam = 12
    const sut = new BcryptAdapter(saltBcryptParam)
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const returnedHash = sut.encrypt('any_value')
    await expect(returnedHash).rejects.toThrow()
  })
})
