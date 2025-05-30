"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface FormData {
  customerId: string;
  description: string;
  file?: File;
  estimationId: string;
}

interface FormContextProps {
  data: FormData;
  updateField: (field: keyof FormData, value: string | File) => void;
  resetForm: () => void;
}

const LOCAL_STORAGE_KEY = "formData";

const FormContext = createContext<FormContextProps | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<FormData>({
    customerId: "",
    description: "",
    file: undefined,
    estimationId: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setData((prev) => ({
          ...prev,
          ...parsed,
          file: undefined,
        }));
      }
    }
  }, []);

  useEffect(() => {
    const { file, ...persistable } = data;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(persistable));
  }, [data]);

  const updateField = (field: keyof FormData, value: string | File) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    const reset = {
      customerId: "",
      description: "",
      file: undefined,
      estimationId: "",
    };
    setData(reset);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
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
