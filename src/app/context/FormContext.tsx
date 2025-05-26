"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface FormData {
  customerProject: string;
  description: string;
  file?: File;
}

interface FormContextProps {
  data: FormData;
  updateField: (field: keyof FormData, value: string | File) => void;
  resetForm: () => void;
}

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FormData>({
    customerProject: "",
    description: "",
    file: undefined,
  });

  const updateField = (field: keyof FormData, value: string | File) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setData({
      customerProject: "",
      description: "",
      file: undefined,
    });
  };

  return (
    <FormContext.Provider value={{ data, updateField, resetForm }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
