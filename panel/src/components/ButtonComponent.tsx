import React from 'react';
import styles from './ButtonComponent.module.css';

interface ButtonComponentProps {
  children: React.ReactNode;
  width: number;
  height: number;
  outerColor?: string;
  innerColor?: string;
  lineColor?: string;
  onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  children,
  width,
  height,
  outerColor = '#ccc',
  innerColor = '#f4a261',
  lineColor = '#000',
  onClick,  
}) => {

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };


  return (
    <div className={styles.buttonWrapper} style={{ width, height }} onClick={handleClick}>
      <div
        className={styles.buttonOuter}
        style={{
          width,
          height,
          backgroundColor: outerColor,
          border: `2px solid ${lineColor}`,
        }}
      >
        <div
          className={styles.buttonInner}
          style={{
            width: width * 0.75,
            height: height * 0.75,
            backgroundColor: innerColor,
            border: `2px solid ${lineColor}`,
          }}
        >
          {children}
        </div>
        <svg
          className={styles.lines}
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%' }}
        >
          <line x1="0" y1="0" x2="100" y2="100" style={{ stroke: lineColor }} className={styles.line} />
          <line x1="100" y1="0" x2="0" y2="100" style={{ stroke: lineColor }} className={styles.line} />
          <line x1="0" y1="100" x2="100" y2="0" style={{ stroke: lineColor }} className={styles.line} />
          <line x1="100" y1="100" x2="0" y2="0" style={{ stroke: lineColor }} className={styles.line} />
        </svg>
      </div>
    </div>
  );
};

export default ButtonComponent;
