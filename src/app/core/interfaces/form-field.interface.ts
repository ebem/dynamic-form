import {FormResponse} from './form-response.interface';
import {FieldResponse} from './field-response.interface';

export interface FormField extends FormResponse, FieldResponse{
  elementType: ElementType
}

export enum ElementType {
  INPUT = 'INPUT',
  SELECT = 'SELECT',
}
