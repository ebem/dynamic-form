import {Component, OnInit} from '@angular/core';
import {DyInputComponent, DySelectComponent} from '../../shared';
import {HttpService} from '../../core/services/http.service';
import {forkJoin} from 'rxjs';
import {ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {ElementType, FieldResponse, FormField, FormResponse} from '../../core/interfaces';
import {JsonPipe, NgFor, NgIf} from '@angular/common';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [DyInputComponent, DySelectComponent, ReactiveFormsModule, NgFor, NgIf, JsonPipe],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  formFields: FormField[] = [];
  readonly ElementType = ElementType;
  userForm = new FormGroup({});
  submittedForm: { [key: string]: string } | null = null;

  constructor(private httpService: HttpService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    const $formReq = this.httpService.getForm();
    const $fieldReq = this.httpService.getFields();

    forkJoin([$formReq, $fieldReq]).subscribe(([formValues, fieldValues]) => {
      this.formFields = formValues.map((formValue: FormResponse) => {
        const fieldValue: FieldResponse | undefined = fieldValues.find((field: FieldResponse) => field.label.toLowerCase() === formValue.key);
        return {
          ...formValue,
          ...fieldValue,
          elementType: fieldValue?.fieldType?.toLowerCase()?.includes('input') ? ElementType.INPUT :
            (fieldValue?.fieldType?.toLowerCase()?.includes('select') ? ElementType.SELECT : null)
        } as FormField
      });

      this.formFields.forEach(field => {
        this.userForm.addControl(field.key, this.fb.control(null))
      })
     })
  }

  public onSubmit() {
    const form = this.userForm.value;

    this.httpService.postForm(form).subscribe()
    this.submittedForm = {
      ...form
    }
  }
}
