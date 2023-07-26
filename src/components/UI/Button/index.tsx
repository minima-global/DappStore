import * as React from 'react';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'contrast-2';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({ loading = false, disabled = false, variant = 'primary', onClick = undefined, children }) => {
  let base = 'relative w-full px-4 py-3.5 rounded font-bold disabled:opacity-40 disabled:cursor-not-allowed';

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
