import { Controller, HttpRequest, HttpResponse, Authentication, Validator } from './login-protocols'
import { badRequest, serverError, unauthorized, sucess } from '../../helpers/http-helper'

export class LoginController implements Controller {
  private readonly validation: Validator
  private readonly authentication: Authentication

  constructor (authentication: Authentication, validation: Validator) {
    this.validation = validation
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }
      return sucess({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
