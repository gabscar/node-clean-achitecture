import { ValidatorComposite } from '../../../presentation/helpers/validators/validators-composit'
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/required-field-validation'
import { Validator } from '../../../presentation/helpers/validators/validator'
import { EmailValidatorAdapter } from '../../../utils/email-validator-adapter'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'

export const makeLoginValidation = (): ValidatorComposite => {
  const validations: Validator[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidatorComposite(validations)
}
