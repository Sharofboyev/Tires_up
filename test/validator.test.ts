import { validateMarkedRow, validateView } from "../utils/validator";

import { describe, expect, test } from "@jest/globals";

test("Markup validator", () => {
  expect(validateMarkedRow({ pvi: 123, marked: true })).toEqual({
    ok: true,
    value: {
      pvi: 123,
      marked: true,
    },
  });

  expect(validateMarkedRow({ pvi: "123", marked: true }).ok).toBeTruthy();
});

test("View validator", () => {
  expect(validateView({ name: "" }).ok).toBeFalsy();
  expect(validateView({})).toEqual({ ok: true, value: {} });
});
