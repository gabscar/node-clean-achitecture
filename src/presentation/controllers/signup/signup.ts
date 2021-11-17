import { HttpResponse, HttpRequest, Controller, AddAccount } from './signup-protocols'
import { badRequest, serverError, sucess } from '../../helpers/http-helper'
import { Validator } from '../../helpers/validators/validator'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validator

  constructor (addAccount: AddAccount, validation: Validator) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return sucess(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
