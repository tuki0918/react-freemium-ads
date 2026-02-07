import type * as React from "react";

export type SampleProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  description?: string;
};

export function Sample({
  title = "Sample Component",
  description = "Use this component as a starting point for your package.",
  className = "",
  children,
  style,
  ...divProps
}: SampleProps) {
  return (
    <div
      {...divProps}
      className={["sample-component", className].filter(Boolean).join(" ")}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        backgroundColor: "#ffffff",
        color: "#111827",
        ...style,
      }}
    >
      <h2 style={{ margin: 0, fontSize: "18px", lineHeight: 1.4 }}>{title}</h2>
      {description ? (
        <p style={{ margin: "8px 0 0", color: "#4b5563", fontSize: "14px" }}>
          {description}
        </p>
      ) : null}
      {children ? <div style={{ marginTop: "12px" }}>{children}</div> : null}
    </div>
  );
}
