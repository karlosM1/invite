import { useState } from "react";
import InvitationStep from "./invitation-step";
import AcceptanceStep from "./acceptance-step";
import DatePickerStep from "./date-picker-step";
import DateTypeStep from "./date-type-step";
import FoodPreferenceStep from "./food-preference-step";
import AfterDateStep from "./after-date-step";
import ConfirmationStep from "./confirmation-step";
import ResponsesStep from "./response-step";
import type { DateInvitationData } from "@/lib/types";

export default function DateInvitation() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<DateInvitationData>({
    accepted: false,
    date: undefined,
    dateType: "",
    foodPreference: "",
    afterDateActivity: "",
    suggestions: "",
  });
  const [invitationId, setInvitationId] = useState<string>("");

  const updateFormData = (data: Partial<DateInvitationData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const saveResponses = () => {
    // Generate a unique ID for this invitation
    const id = Math.random().toString(36).substring(2, 10);
    setInvitationId(id);

    // Save to localStorage
    localStorage.setItem(`date-invitation-${id}`, JSON.stringify(formData));

    // Save this ID to a list of all invitation IDs
    const existingIds = JSON.parse(
      localStorage.getItem("date-invitation-ids") || "[]"
    );
    if (!existingIds.includes(id)) {
      existingIds.push(id);
      localStorage.setItem("date-invitation-ids", JSON.stringify(existingIds));
    }

    // Move to the responses step
    nextStep();
  };

  const steps = [
    <InvitationStep key="invitation" onNext={nextStep} />,
    <AcceptanceStep
      key="acceptance"
      onNext={() => {
        updateFormData({ accepted: true });
        nextStep();
      }}
    />,
    <DatePickerStep
      key="date-picker"
      onNext={(date) => {
        updateFormData({ date });
        nextStep();
      }}
    />,
    <DateTypeStep
      key="date-type"
      onNext={(dateType) => {
        updateFormData({ dateType });
        nextStep();
      }}
    />,
    <FoodPreferenceStep
      key="food-preference"
      onNext={(foodPreference) => {
        updateFormData({ foodPreference });
        nextStep();
      }}
    />,
    <AfterDateStep
      key="after-date"
      onNext={(data) => {
        updateFormData(data);
        nextStep();
      }}
    />,
    <ConfirmationStep
      key="confirmation"
      formData={formData}
      onSave={saveResponses}
    />,
    <ResponsesStep
      key="responses"
      formData={formData}
      invitationId={invitationId}
    />,
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        {steps[currentStep]}
      </div>
    </div>
  );
}
