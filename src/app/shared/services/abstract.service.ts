import {ErrorWarning} from '../models/error-warning.model';
import {Observable, Subject} from 'rxjs';

export abstract class AbstractService {

  constructor() {
  }

  parserErrorResponse(error: any): Observable<ErrorWarning> {
    const errorWarningSubject = new Subject<ErrorWarning>();
    // TODO: remove console log
    console.log('error', error);
    const errorModel = {
      title: '',
      message: '',
      action: '',
    } as ErrorWarning;
    if (error.error.message) {
      errorModel.title = error.error.error;
      errorModel.message = error.message;
      errorModel.action = 'ok';
    } else {
      errorModel.title = 'Ops, ocorreu um erro';
      errorModel.message = 'Não foi possível carregar algumas informações. Por favor, tente novamente.';
      errorModel.action = 'tentar novamente';
    }
    errorWarningSubject.error(errorModel);
    return errorWarningSubject;
  }
}
