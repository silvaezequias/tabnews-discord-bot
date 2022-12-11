import cuid from 'cuid';

export interface ErrorTypes {
  log?: boolean;
  message?: string;
  context?: object;
  key?: string;
  stack?: string;
  type?: string;
  errorId?: string;
  action?: string;
  requestId?: string;
  statusCode?: number;
  errorLocationCode?: number;
  databaseErrorCode?: number;
}

export class BaseError extends Error {
  log?: boolean;
  message: string;
  context?: object;
  key?: string;
  stack: string;
  type?: string;
  errorId?: string;
  action?: string;
  requestId?: string;
  statusCode?: number;
  errorLocationCode?: number;
  databaseErrorCode?: number;

  constructor({
    log,
    message,
    stack,
    action,
    statusCode,
    errorId,
    requestId,
    context,
    errorLocationCode,
    key,
    type,
    databaseErrorCode
  }: ErrorTypes) {
    super();
    this.name = this.constructor.name;
    this.message = message;
    this.action = action;
    this.statusCode = statusCode || 500;
    this.errorId = errorId || cuid();
    this.requestId = requestId;
    this.context = context;
    this.stack = stack;
    this.errorLocationCode = errorLocationCode;
    this.key = key;
    this.type = type;
    this.databaseErrorCode = databaseErrorCode;
    this.log = log;
  }
}

export class InternalServerError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    errorId,
    statusCode,
    stack,
    errorLocationCode,
    log
  }: ErrorTypes) {
    super({
      message: message || 'Um erro interno não esperado aconteceu.',
      action:
        action ||
        'Informe aos moderadores o valor encontrado no campo `ErrorId`.',
      statusCode: statusCode || 500,
      requestId: requestId,
      errorId: errorId,
      stack: stack,
      errorLocationCode: errorLocationCode,
      log: log
    });
  }
}

export class NotFoundError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    errorId,
    stack,
    errorLocationCode,
    key,
    log
  }: ErrorTypes) {
    super({
      message: message || 'Não foi possível encontrar este recurso no sistema.',
      action:
        action ||
        'Verifique se o caminho (PATH) e o método (GET, POST, PUT, DELETE) estão corretos.',
      statusCode: 404,
      requestId: requestId,
      errorId: errorId,
      stack: stack,
      errorLocationCode: errorLocationCode,
      key: key,
      log: log
    });
  }
}

export class ServiceError extends BaseError {
  constructor({
    message,
    action,
    stack,
    context,
    statusCode,
    errorLocationCode,
    databaseErrorCode,
    log
  }: ErrorTypes) {
    super({
      message: message || 'Serviço indisponível no momento.',
      action: action || 'Verifique se o serviço está disponível.',
      stack: stack,
      statusCode: statusCode || 503,
      context: context,
      errorLocationCode: errorLocationCode,
      databaseErrorCode: databaseErrorCode,
      log: log
    });
  }
}

export class ValidationError extends BaseError {
  constructor({
    message,
    action,
    stack,
    statusCode,
    context,
    errorLocationCode,
    key,
    type,
    log
  }: ErrorTypes) {
    super({
      message: message || 'Um erro de validação ocorreu.',
      action: action || 'Ajuste os dados enviados e tente novamente.',
      statusCode: statusCode || 400,
      stack: stack,
      context: context,
      errorLocationCode: errorLocationCode,
      key: key,
      type: type,
      log: log
    });
  }
}

export class UnauthorizedError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    stack,
    errorLocationCode,
    log
  }: ErrorTypes) {
    super({
      message: message || 'Usuário não autenticado.',
      action:
        action ||
        'Verifique se você está autenticado com uma sessão ativa e tente novamente.',
      requestId: requestId,
      statusCode: 401,
      stack: stack,
      errorLocationCode: errorLocationCode,
      log: log
    });
  }
}

export class ForbiddenError extends BaseError {
  constructor({
    message,
    action,
    requestId,
    stack,
    errorLocationCode,
    log
  }: ErrorTypes) {
    super({
      message: message || 'Você não possui permissão para executar esta ação.',
      action:
        action || 'Verifique se você possui permissão para executar esta ação.',
      requestId: requestId,
      statusCode: 403,
      stack: stack,
      errorLocationCode: errorLocationCode,
      log: log
    });
  }
}

export class TooManyRequestsError extends BaseError {
  constructor({
    message,
    action,
    context,
    stack,
    errorLocationCode,
    log
  }: ErrorTypes) {
    super({
      message: message || 'Você realizou muitas requisições recentemente.',
      action:
        action ||
        'Tente novamente mais tarde ou contate o suporte caso acredite que isso seja um erro.',
      statusCode: 429,
      context: context,
      stack: stack,
      errorLocationCode: errorLocationCode,
      log: log
    });
  }
}

export class UnprocessableEntityError extends BaseError {
  constructor({ message, action, stack, errorLocationCode, log }: ErrorTypes) {
    super({
      message: message || 'Não foi possível realizar esta operação.',
      action:
        action ||
        'Os dados enviados estão corretos, porém não foi possível realizar esta operação.',
      statusCode: 422,
      stack: stack,
      errorLocationCode: errorLocationCode,
      log: log
    });
  }
}
