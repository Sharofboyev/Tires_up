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

export function validateMarkedRow(body: any): Result<MarkedRow> {
  const { error, value } = Joi.object({
    pvi: Joi.number().required(),
    marked: Joi.boolean().required(),
  }).validate(body);
  if (error) {
    return validationError(error.details[0].message);
  } else return { ok: true, value };
}

export function validateFilter(query: unknown): Result<FilterBy> {
  const { error, value } = Joi.object({
    pvi: Joi.number().positive(),
    limit: Joi.number().positive(),
  }).validate(query);
  if (error) return validationError(error.details[0].message);
  return { ok: true, value };
}

export function validateRow(body: unknown): Result<Row> {
  const { error, value } = Joi.object({
    pvi: Joi.number().positive(),
  }).validate(body);
  if (error) return validationError(error.details[0].message);
  return { ok: true, value };
}

export function validateView(body: unknown): Result<View> {
  const { error, value } = Joi.object({
    name: Joi.string().required(),
    query: Joi.string().required(),
  })
    .required()
    .validate(body);
  if (error) {
    return validationError(error.details[0].message);
  }

  let regExp = new RegExp(/update|delete|insert|drop|alter|add|\//gim);
  if (regExp.test(value.query)) {
    return validationError("Query has restricted key words");
  }

  return { ok: true, value };
}

export function validateRemovedView(query: unknown): Result<{ name: string }> {
  const { error, value } = Joi.object({
    name: Joi.string().required(),
  }).validate(query);
  if (error) {
    return validationError(error.details[0].message);
  }

  return { ok: true, value };
}

export function validateViewQuery(query: unknown): Result<{ name?: string }> {
  const { error, value } = Joi.object({
    name: Joi.string().optional(),
  }).validate(query);
  if (error) {
    return validationError(error.details[0].message);
  }
  return { ok: true, value };
}
