import { validate as validateClass } from 'class-validator';
import { plainToClass } from 'class-transformer';
import utils from '../../../utils/utils';

export const createAction = (type: string, payload = {}) => ({
  type,
  payload
});

export const Types = {
  resetAll: 'app.reset-all'
};

const resetAll = () => ({
  type: Types.resetAll
});

export async function validate(
  data: any,
  className?: any,
  fieldPrefix?: ''
): Promise<{ errors: any; data: any }> {
  const errors: any = {};
  const dataClass = plainToClass(className, data, {
    excludeExtraneousValues: true
  });
  const validatedErrors = await validateClass(dataClass);
  if (validatedErrors.length > 0) {
    validatedErrors.forEach((item) => {
      let message: string | undefined;
      for (const key in item.constraints) {
        if (item.constraints[key]) {
          message = utils.toUpperCaseFirstLetter(item.constraints[key]);
        }
      }
      if (fieldPrefix) {
        errors[`${fieldPrefix}.${item.property}Error`] = message;
      } else {
        errors[`${item.property}Error`] = message;
      }
    });
  }
  // console.log('err', { errors, data: dataClass });
  // return { errors, data: dataClass };
  return { errors, data: dataClass };
}

export const commonAction = {
  validate,
  createAction,
  resetAll
};

export default commonAction;
