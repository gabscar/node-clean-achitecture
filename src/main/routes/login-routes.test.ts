import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helpers'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
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
  describe('POST/ signup', () => {
    test('Should return an account on signup success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Gabriel',
          email: 'gabriel@mail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })
  describe('POST/ Login', () => {
    test('Should return an account on login success', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Gabriel',
        email: 'gabriel@mail.com',
        password: password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'gabriel@mail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on login ', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'gabriel@mail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
