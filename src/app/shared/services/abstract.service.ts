import {ErrorWarning} from '../models/error-warning.model';
import {Observable, Subject} from 'rxjs';
import {arrayErros, mapErrorResponse, TypeError} from '../enums/error.enum';

export abstract class AbstractService {

  MENSAGEM_GENERICA = 'Não foi possível carregar algumas informações. Por favor, tente novamente.';
  constructor() {
  }

  parserErrorResponse(error: any): Observable<ErrorWarning> {
    const errorWarningSubject = new Subject<ErrorWarning>();
    // TODO: remove console log
    const errorModel = {
      title: '',
      message: '',
      action: '',
      status: 0
    } as ErrorWarning;
    errorModel.title = 'Ops, ocorreu um erro';
    errorModel.action = 'tentar novamente';
    errorModel.message = this.MENSAGEM_GENERICA;
    try {
      if (error.error.message) {
        const message = arrayErros.find(e => e.includes(error.error.message));
        if (message){
          const map = mapErrorResponse.get(message as TypeError);
          if (map) {
            errorModel.message = map;
          }
        }
        errorModel.status = error.error.status;
      } else {
        if (error.error){
          const message = arrayErros.find(e => e.includes(error.error));
          if (message){
            const map = mapErrorResponse.get(message as TypeError);
            if (map){
              errorModel.message = map;
            }
          }
        }
      }
    }catch {
      console.log('Ops, ocorreu um erro');
    }
    errorWarningSubject.error(errorModel);
    return errorWarningSubject;
  }
}
