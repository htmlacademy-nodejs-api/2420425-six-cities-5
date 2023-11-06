import { Request } from 'express';
import { RequestParams } from './request.params.type.js';
import { RequestBody } from './request-body.type.js';

export type TypedRequst<T> = Request<RequestParams, RequestBody, T>;
