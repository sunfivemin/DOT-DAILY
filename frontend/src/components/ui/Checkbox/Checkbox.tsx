"use client";

import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  variant?: "must" | "should" | "remind";
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onCheckedChange,
  variant = "must",
  className,
}) => {
  const variantStyles = {
    must: "border-priority-must data-[state=checked]:bg-priority-must",
    should: "border-priority-should data-[state=checked]:bg-priority-should",
    remind: "border-priority-remind data-[state=checked]:bg-priority-remind",
  };

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      className={clsx(
        // 고정 사이즈 설정으로 layout shift 방지
        "w-6 h-6 flex-shrink-0",
        "flex items-center justify-center",
        "border-2 rounded-full",
        "transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        "active:scale-95",
        variantStyles[variant],
        checked
          ? "border-current text-white transform-gpu"
          : "border-current text-transparent bg-white hover:bg-gray-50",
        className
      )}
      onClick={() => onCheckedChange(!checked)}
    >
      <motion.div
        initial={false}
        animate={
          checked ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
        }
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        <Check className="w-4 h-4" strokeWidth={3} />
      </motion.div>
    </button>
  );
};

export default Checkbox;
