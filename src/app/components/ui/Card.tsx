import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  checked?: boolean;
  onCheckChange?: (checked: boolean) => void;
  selectable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  checked,
  onCheckChange,
  selectable = false,
  className,
  ...props
}) => {
  const handleClick = () => {
    if (selectable && onCheckChange) {
      onCheckChange(!checked);
    }
  };

  return (
    <div
      onClick={handleClick}
      role={selectable ? "checkbox" : undefined}
      aria-checked={selectable ? checked : undefined}
      tabIndex={selectable ? 0 : undefined}
      onKeyDown={(e) => {
        if (selectable && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          onCheckChange?.(!checked);
        }
      }}
      className={cn(
        "rounded-3xl border p-6 space-y-4 cursor-pointer select-none shadow-lg transition-transform transform bg-gradient-to-tr",
        selectable && checked
          ? "from-pink-300 via-purple-300 to-indigo-400 border-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.6)]"
          : "from-pink-100 via-purple-100 to-indigo-200 border-gray-300 hover:scale-[1.03] hover:shadow-xl",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold text-[#353535] tracking-wide">
          {title}
        </h3>
        {selectable && (
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onCheckChange?.(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="w-6 h-6 cursor-pointer rounded-lg border-2 border-indigo-500 focus:ring-indigo-400 transition duration-200 ease-in-out"
          />
        )}
      </div>
      {description && (
        <p className="text-base text-gray-700 leading-relaxed">{description}</p>
      )}
    </div>
  );
};
