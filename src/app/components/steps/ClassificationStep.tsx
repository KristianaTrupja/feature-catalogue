"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useFormContext } from "../../context/FormContext";

interface ClassificationStepProps {
  setStepValid: (valid: boolean) => void;
}

interface CustomerProjectOption {
  label: string;
  value: string;
}

export default function ClassificationStep({ setStepValid }: ClassificationStepProps) {
  const { data, updateField } = useFormContext();
  const [options, setOptions] = useState<CustomerProjectOption[]>([
    { label: "Loading...", value: "" },
  ]);

  useEffect(() => {
    // Use environment variable for API base URL
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
console.log("Base URL:", baseUrl);
console.log("Env var at top level:", process.env.NEXT_PUBLIC_API_BASE_URL);
    const fetchCustomerProjects = async () => {
      try {
        const res = await fetch(`${baseUrl}/Customer/GetAllCustomers`);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const result: { id: number; name: string }[] = await res.json();
        const formatted = result.map(item => ({
          label: item.name,
          value: item.id.toString(),
        }));
        setOptions([{ label: "Select a project", value: "" }, ...formatted]);
      } catch (err) {
        console.error("Failed to load projects", err);
        setOptions([{ label: "Failed to load", value: "" }]);
      }
    };

    fetchCustomerProjects();
  }, []);

  useEffect(() => {
    setStepValid(!!data.customerProject.trim());
  }, [data.customerProject, setStepValid]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    updateField("customerProject", selectedValue);
    setStepValid(!!selectedValue.trim());
  };

  return (
    <div
      className="h-full bg-cover bg-bottom bg-no-repeat bg-gray-200"
      style={{ backgroundImage: "url('/images/first-step-background-image.png')" }}
    >
      <div className="flex items-center justify-center h-full w-full px-4 py-10 lg:px-20">
        <div className="w-full max-w-3xl">
          <div className="relative bg-white rounded-3xl p-6 lg:p-7 2xl:p-12 space-y-6 shadow-xl border-4 border-gray-200">
            <h2 className="text-4xl 2xl:text-5xl font-bold">
              Classification in existing data records
            </h2>

            <p className="text-xl text-gray-600">
              Select the customer and the project for which you would like to receive an estimate.
              If it is a new request for which there is no customer, select “None” in the dropdown.
            </p>

            <div className="space-y-2 w-full lg:w-2/3">
              <label
                htmlFor="customerProject"
                className="block text-lg font-medium text-gray-700"
              >
                Customer project
              </label>

              <div className="relative">
                <select
                  id="customerProject"
                  name="customerProject"
                  value={data.customerProject}
                  onChange={handleSelectChange}
                  className="appearance-none text-lg w-full border-2 px-3 pr-12 py-4 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {options.map(({ label, value }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
