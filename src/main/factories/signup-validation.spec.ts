import { makeSignUpValidation } from './signup-validation'
import { ValidatorComposite } from '../../presentation/helpers/validators/validators-composit'
import { RequiredFieldValidation } from '../../presentation/helpers/validators/required-field-validation'
import { Validator } from '../../presentation/helpers/validators/validator'

jest.mock('../../presentation/helpers/validators/validators-composit')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validatations', () => {
    makeSignUpValidation()
    const validatations: Validator[] = []
    for (const field of ['name', 'email']) {
      validatations.push((new RequiredFieldValidation(field)))
    }
    expect(ValidatorComposite).toHaveBeenCalledWith(validatations)
  })
})
