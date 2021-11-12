import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  connection: null as MongoClient,

  async connect (url: string) {
    this.connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async close () {
    await this.connection.close()
  },

  getCollection (name: string): Collection {
    return this.connection.db().collection(name)
  }
}
