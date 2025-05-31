import React from "react";
import classNames from "classnames";

export function Card({ className = "", children }) {
  return (
    <div
      className={classNames(
        "bg-white border border-slate-200 rounded-lg shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={classNames("px-6 py-4 border-b border-slate-200", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={classNames("text-lg font-medium text-slate-800", className)}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <div className={classNames("p-6", className)}>
      {children}
    </div>
  );
}
