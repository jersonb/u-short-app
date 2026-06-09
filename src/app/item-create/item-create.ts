import { Component, inject, signal } from '@angular/core';
import { ItemCreateRequest } from '../models/requests/item-create-request';
import {
  form,
  FormField,
  maxLength,
  minLength,
  pattern,
  required,
  validate,
} from '@angular/forms/signals';
import { ShortService } from '../short.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-create',
  imports: [FormField],
  templateUrl: './item-create.html',
  styleUrl: './item-create.css',
})
export class ItemCreate {
  private readonly shortService = inject(ShortService);
  private readonly router = inject(Router);

  itemModel = signal<ItemCreateRequest>({
    code: '',
    url: '',
    description: '',
  });

  itemCreeateForm = form(this.itemModel, (schema) => {
    
    required(schema.code, {
      message: 'O código é obrigatório',
    });
   
    minLength(schema.code, 3, {
      message: 'Preencha o código com no mínimo 3 caracteres',
    });
   
    maxLength(schema.code, 10, {
      message: 'Preencha o código com no máximo 10 caracteres',
    });

    pattern(schema.code, /^[A-Za-z0-9]+$/, {
      message: 'Código inválido, use apenas letras e números',
    });

   
   
    minLength(schema.description, 10, {
      message: 'Preencha a descrição, diga onde esse link vai levar',
    });

    maxLength(schema.description, 200, {
      message:
        'Não é uma redação, você pode escrever menos que 200 caracteres.',
    });

    required(schema.description, {
      message: 'A descrição é obrigatória',
    });



    required(schema.url, {
      message: 'A URL é obrigatória',
    });

    validate(schema.url, ({ value }) => {
      const url = value();

      if (!url) return null;

      try {
        const parsedUrl = new URL(url);
        if (
          !['http:', 'https:'].includes(parsedUrl.protocol) ||
          !parsedUrl.host
        ) {
          return { kind: 'url', message: 'http ou https' };
        }
        return null;
      } catch {
        return { kind: 'url', message: 'Url Inválida' };
      }
    });


  });

  onSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.itemCreeateForm().invalid()) {
      throw new Error(
        'Problema ao enviar o formulário, verifique os campos e tente novamente',
      );
    }
    this.shortService.createShortItem(this.itemModel()).subscribe({
      next: (response) => {
        console.log('Item criado com sucesso:', response);
        this.router.navigate(['/l']);
      },
    });
  }
}
