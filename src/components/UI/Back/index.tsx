type BackProps = {
  textContent: string;
  onClick?: () => void;
};

export function Back({ textContent, onClick }: BackProps) {
  return (
    <div onClick={onClick} className="cursor-pointer mb-8 flex items-center">
      <svg
        className="mt-0.5 mr-4"
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.90017 13.1693L0.730957 7.00009L6.90017 0.830872L7.79631 1.72701L2.52324 7.00009L7.79631 12.2732L6.90017 13.1693Z"
          fill="#F9F9FA"
        />
      </svg>
      {textContent}
    </div>
  );
}

export default Back;
