"use client";

import React, { createContext, useContext, useState } from "react";

type FormType = "general" | "hire-only" | "hire-manage";

interface FormContextType {
  formType: FormType;
  setFormType: (type: FormType) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [formType, setFormType] = useState<FormType>("general");

  return (
    <FormContext.Provider value={{ formType, setFormType }}>
      {children}
    </FormContext.Provider>
  );
}

export function useFormContext() {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}