import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  elevation = "medium",
  ...props 
}, ref) => {
  const elevations = {
    soft: "shadow-soft",
    medium: "shadow-medium",
    strong: "shadow-strong"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl bg-white p-6 transition-all duration-200 hover:shadow-strong",
        elevations[elevation],
        className
      )}
      {...props}
    />
  );
});

Card.displayName = "Card";

export default Card;