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
    if (error.error.message) {
      errorModel.title = error.error.error;
      errorModel.title = 'Ops, ocorreu um erro';
      errorModel.action = 'tentar novamente';

      const message = arrayErros.find(e => e.includes(error.error.message));

      errorModel.message = message ? message : this.MENSAGEM_GENERICA;
      if (message){
        const map = mapErrorResponse.get(message as TypeError);
        if (map) {
          errorModel.message = map ? map.toString() : this.MENSAGEM_GENERICA;
        }
      }
      errorModel.status = error.error.status;
    } else {
      if (error.error){
        errorModel.title = 'Ops, ocorreu um erro';
        errorModel.message = this.MENSAGEM_GENERICA;
        const message = arrayErros.find(e => e.toLowerCase().includes(error.error.toLowerCase()));
        if (message){
          const map = mapErrorResponse.get(message as TypeError);
          if (map){
            errorModel.message = map ? map.toString() : this.MENSAGEM_GENERICA;
          }
        }
      }
    }
    errorWarningSubject.error(errorModel);
    return errorWarningSubject;
  }
}
