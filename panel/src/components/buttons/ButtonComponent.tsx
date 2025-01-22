import React from "react";
import styles from "./ButtonComponent.module.css";

interface ButtonComponentProps {
  children: React.ReactNode;
  width: number;
  height: number;
  outerColor?: string;
  innerColor?: string;
  lineColor?: string;
  onClick?: () => void;
  submitType?: boolean;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  width,
  height,
  outerColor = "#000",
  innerColor = "#000",
  lineColor = "#000",
  onClick,
  submitType = false,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const viewBox = `0 0 ${width} ${height}`;

  return (
    <div className={styles.buttonWrapper} style={{ width, height }}>
      {submitType && (
        <button
          type="submit"
          style={{ display: "none" }}
          aria-hidden="true"
          tabIndex={-1}
        />
      )}
      <div
        className={styles.buttonOuter}
        style={{
          width,
          height,
          backgroundColor: outerColor,
          border: `3px solid ${lineColor}`,
        }}
        onClick={handleClick}
      >
        <div
          className={styles.buttonInner}
          style={{
            width: width - 16,
            height: height - 16,
            backgroundColor: innerColor,
            border: `3px solid ${lineColor}`,
          }}
        >
          {children}
        </div>
        <svg
          className={styles.lines}
          viewBox={viewBox}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <line
            x1={0}
            y1={0}
            x2={8}
            y2={8}
            style={{ stroke: lineColor }}
            className={styles.line}
          />
          <line
            x1={width}
            y1={0}
            x2={width - 8}
            y2={8}
            style={{ stroke: lineColor }}
            className={styles.line}
          />
          <line
            x1={0}
            y1={height}
            x2={8}
            y2={height - 8}
            style={{ stroke: lineColor }}
            className={styles.line}
          />
          <line
            x1={width}
            y1={height}
            x2={width - 8}
            y2={height - 8}
            style={{ stroke: lineColor }}
            className={styles.line}
          />
        </svg>
      </div>
    </div>
  );
};

export default ButtonComponent;
