import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/update-access-token-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helpers'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const collectionAccount = await MongoHelper.getCollection('accounts')
    const insertionResult = await collectionAccount.insertOne(accountData)
    const insertedAccount = insertionResult.ops[0]
    return MongoHelper.map(insertedAccount)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const collectionAccount = await MongoHelper.getCollection('accounts')
    const account = await collectionAccount.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const collectionAccount = await MongoHelper.getCollection('accounts')
    await collectionAccount.updateOne({
      _id: id
    }, {
      $set: {
        accessToken: token
      }
    })
  }
}
