type MenuItemsProps = {
  title: string;
  onClick?: () => void;
};

const MenuItem: React.FC<MenuItemsProps> = ({ title, onClick }) => {
  return (
    <div onClick={onClick} className="relative core-black-contrast-2 py-4 px-5 rounded cursor-pointer">
      {title}
      <div className="absolute right-0 top-0 h-full px-5 flex items-center">
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.04984 5.99995L1.37504 11.6501L0.500244 10.7501L5.24984 5.99995L0.500244 1.24975L1.40024 0.349747L7.04984 5.99995Z"
            fill="#F4F4F5"
          />
        </svg>
      </div>
    </div>
  );
};

export default MenuItem;
