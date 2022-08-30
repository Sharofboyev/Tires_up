import Joi from "joi";

type Result<T> = { ok: true; value: T } | { ok: false; message: string };

interface MarkedRow {
  pvi: number;
  marked: boolean;
}

interface FilterBy {
  limit?: number;
  pvi?: number;
}

interface Row {
  pvi: number;
}

export interface View {
  name: string;
  query: string;
}

const validationError: <T>(message: string) => Result<T> = (message) => ({
  ok: false,
  message: message,
});

export function validateMarkedRow(query: any): Result<MarkedRow> {
  const { error, value } = Joi.object({
    pvi: Joi.number().required(),
    marked: Joi.boolean().required(),
  }).validate(query);
  if (error) {
    return validationError(error.details[0].message);
  } else return { ok: true, value };
}

export function validateFilter(query: any): Result<FilterBy> {
  const { error, value } = Joi.object({
    pvi: Joi.number().positive(),
    limit: Joi.number().positive(),
  }).validate(query);
  if (error) return validationError(error.details[0].message);
  return { ok: true, value };
}

export function validateRow(body: any): Result<Row> {
  const { error, value } = Joi.object({
    pvi: Joi.number().positive(),
  }).validate(body);
  if (error) return validationError(error.details[0].message);
  return { ok: true, value };
}

export function validateView(query: any): Result<View> {
  const { error, value } = Joi.object({
    name: Joi.string().required(),
    query: Joi.string().required(),
  }).validate(query);
  if (error) {
    return validationError(error.details[0].message);
  }

  let regExp = new RegExp(/update|delete|insert|drop|alter|add/gim);
  if (regExp.test(value.name)) {
    return validationError("Query has restricted words");
  }

  return { ok: true, value };
}

export function validateViewDeleting(query: any): Result<{ name: string }> {
  const { error, value } = Joi.object({
    name: Joi.string().required(),
  }).validate(query);
  if (error) {
    return validationError(error.details[0].message);
  }

  let regExp = new RegExp(/update|delete|insert|drop|alter|add/gim);
  if (regExp.test(value.name)) {
    return validationError("Query has restricted words");
  }

  return { ok: true, value };
}
