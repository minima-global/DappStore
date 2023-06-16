import * as React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'contrast-2';
  onClick?: () => void;
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({ variant = 'primary', onClick = undefined, children }) => {
  let base = 'w-full px-4 py-3.5 rounded font-bold disabled:opacity-40 disabled:cursor-not-allowed';

  if (variant === 'primary') {
    base += ' text-black bg-white';
  } else if (variant === 'secondary') {
    base += ' text-white core-black-contrast-3';
  } else if (variant === 'contrast-2') {
    base += ' text-white core-black-contrast-2';
  }

  return (
    <button className={base} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
