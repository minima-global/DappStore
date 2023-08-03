import * as React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'contrast-2';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  sizing?: 'small' | 'base';
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({ loading = false, sizing = 'base', disabled = false, variant = 'primary', onClick = undefined, children }) => {
  let base = 'relative w-full rounded font-bold disabled:opacity-40 disabled:cursor-not-allowed';

  if (sizing === 'small') {
    base += ' px-1.5 py-2.5';
  } else {
    base += ' px-4 py-3.5';
  }

  if (variant === 'primary') {
    base += ' text-black bg-white';
  } else if (variant === 'secondary') {
    base += ' text-white core-black-contrast-3';
  } else if (variant === 'contrast-2') {
    base += ' text-white core-black-contrast-2';
  }

  if (loading) {
    base += ' opacity-60 cursor-not-allowed';
  }

  return (
    <button disabled={disabled} className={base} onClick={onClick}>
      {!loading && <>{children}</>}
      {loading && <div className="text-white spinner spinner--small" />}
    </button>
  );
};

export default Button;
