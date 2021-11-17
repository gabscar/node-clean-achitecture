import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helpers'
import { AccountMongoRepository } from './account'

let accountCollection: Collection

describe('Account MongoDB repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.close()
  })
  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  test('should retorn account on add sucess', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'name',
      email: 'email@mail.com',
      password: 'password'
    })
    expect(account).toBeTruthy()
    const { name, email, password, id } = account
    expect(id).toBeTruthy()
    expect(name).toBe('name')
    expect(email).toBe('email@mail.com')
    expect(password).toBe('password')
  })
  test('should retorn account on loadByEmail sucess', async () => {
    const sut = new AccountMongoRepository()
    await accountCollection.insertOne({
      name: 'name',
      email: 'email@mail.com',
      password: 'password'
    })
    const account = await sut.loadByEmail('email@mail.com')
    expect(account).toBeTruthy()
    const { name, email, password, id } = account
    expect(id).toBeTruthy()
    expect(name).toBe('name')
    expect(email).toBe('email@mail.com')
    expect(password).toBe('password')
  })
  test('should retorn null if loadByEmail fail', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.loadByEmail('email@mail.com')
    expect(account).toBeFalsy()
  })
  test('Should update the account accessToken on updateAccesToken succces', async () => {
    const sut = new AccountMongoRepository()
    const response = await accountCollection.insertOne({
      name: 'name',
      email: 'email@mail.com',
      password: 'password'
    })
    const fakeAccount = response.ops[0]
    expect(fakeAccount.accessToken).toBeFalsy()
    await sut.updateAccessToken(fakeAccount._id, 'any_token')
    const account = await accountCollection.findOne({ _id: fakeAccount._id })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })
})
