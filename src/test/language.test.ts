import { describe, expect, it } from "vitest";
import { defaultLanguage, translate } from "@/lib/language";
describe("Business language", () => {
  it("starts in Spanish", () => { expect(defaultLanguage).toBe("ES"); });
  it("selects English instantly", () => { expect(translate("EN", "Registrar mi Negocio", "Register my Business")).toBe("Register my Business"); });
});