import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helpers'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const collectionAccount = await MongoHelper.getCollection('accounts')
    const insertionResult = await collectionAccount.insertOne(accountData)
    const insertedAccount = insertionResult.ops[0]
    return MongoHelper.map(insertedAccount)
  }
}
