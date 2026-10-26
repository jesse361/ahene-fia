import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { parseContact } from "./contact.ts";
import { parseRegistration } from "./registration.ts";

const registration = {
  fullName: "Ama Mensah",
  email: "ama@example.com",
  phone: "",
  tierId: "vip",
  quantity: 2,
  studentInstitution: "",
  dietaryRequirements: "",
  accessibilityRequests: "",
  privacyAccepted: true,
  marketingConsent: false,
  idempotencyKey: "6f1d8c2e-3b7a-4d5e-9c1f-2a4b6d8e0f11",
  ahfHp: "",
};

describe("registration validation", () => {
  it("accepts a complete request and ignores any client-side price", () => {
    const result = parseRegistration({ ...registration, price: 1 });
    assert.equal(result.success, true);
    if (!result.success) return;
    assert.equal(result.data.tierId, "vip");
    assert.equal(result.data.quantity, 2);
  });

  it("requires an institution for a student pass", () => {
    const result = parseRegistration({ ...registration, tierId: "student", quantity: 1, studentInstitution: "" });
    assert.equal(result.success, false);
    if (result.success) return;
    assert.match(result.fieldErrors.studentInstitution, /institution/i);
  });

  it("rejects a quantity above the tier limit", () => {
    const result = parseRegistration({ ...registration, tierId: "student", quantity: 4, studentInstitution: "University of Ghana" });
    assert.equal(result.success, false);
  });

  it("requires the privacy acknowledgement", () => {
    const result = parseRegistration({ ...registration, privacyAccepted: false });
    assert.equal(result.success, false);
  });
});

describe("contact validation", () => {
  it("accepts a sponsorship enquiry", () => {
    const result = parseContact({
      fullName: "Kwame Boateng",
      email: "kwame@example.com",
      category: "sponsorship",
      subject: "Partnership conversation",
      message: "We would like to ask about supporting the gathering in a practical way.",
      privacyAccepted: true,
      idempotencyKey: "6f1d8c2e-3b7a-4d5e-9c1f-2a4b6d8e0f12",
      ahfHp: "",
    });
    assert.equal(result.success, true);
  });

  it("rejects a short message", () => {
    const result = parseContact({
      fullName: "Kwame Boateng",
      email: "kwame@example.com",
      category: "general",
      subject: "Hello",
      message: "Too short",
      privacyAccepted: true,
      idempotencyKey: "6f1d8c2e-3b7a-4d5e-9c1f-2a4b6d8e0f13",
      ahfHp: "",
    });
    assert.equal(result.success, false);
  });
});
