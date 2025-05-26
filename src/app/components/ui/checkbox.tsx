import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <label className="inline-flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          ref={ref}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          {...props}
        />
        {label && <span className="text-sm text-gray-700">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
