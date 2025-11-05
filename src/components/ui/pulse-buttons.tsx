import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const BeamButtonPrimary = ({
  label = "Launch AI Tool",
  icon: Icon = Sparkles,
  className,
  onClick,
}: {
  label?: string;
  icon?: React.ElementType;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-[#18CCFC] via-[#6344F5] to-[#AE48FF] shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(99,102,241,0.7)]",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5" />
        <span>{label}</span>
      </div>
    </motion.button>
  );
};

export const BeamButtonOutline = ({
  label = "Connect",
  className,
  onClick,
}: {
  label?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 20px rgba(56,189,248,0.5)",
      }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "relative group px-8 py-3 rounded-full font-semibold text-slate-100 border border-slate-700 bg-slate-900/50 hover:bg-slate-800/80 transition-all duration-300",
        className
      )}
    >
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#18CCFC] to-[#AE48FF] opacity-0 group-hover:opacity-20 transition-all duration-300"></span>
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
};
