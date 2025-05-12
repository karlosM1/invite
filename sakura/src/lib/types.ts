import type React from "react";
export interface DateInvitationData {
  accepted: boolean;
  date?: Date;
  dateType: string;
  dateTypeSpecifics: string;
  foodPreference: string;
  afterDateActivity: string;
  suggestions: string;
}

export interface DateTypeOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  specifics: {
    title: string;
    options: Array<{
      value: string;
      label: string;
    }>;
  };
}
