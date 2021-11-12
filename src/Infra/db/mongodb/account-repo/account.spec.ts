import { MongoHelper } from '../helpers/mongo-helpers'
import { AccountMongoRepository } from './account'
describe('Account MongoDB repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.close()
  })
  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  test('should retorn account on sucess', async () => {
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
})
