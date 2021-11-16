import { HttpResponse } from '../protocols/http'
import { ServerError, UnautorizedError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnautorizedError()
})
export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const sucess = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
