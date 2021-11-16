import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validator } from '../../presentation/helpers/validators/validator'
import { ValidatorComposite } from '../../presentation/helpers/validators/validators-composit'

export const makeSignUpValidation = (): ValidatorComposite => {
  const validatations: Validator[] = []
  for (const field of ['name', 'email']) {
    validatations.push((new RequiredFieldValidation(field)))
  }
  return new ValidatorComposite(validatations)
}
