import { Link } from "react-router";

export function Nav({ menuItems, className }) {
  return (
    <nav className={`${className}`}>
      <ul className="text-light-gray text-base font-medium flex flex-col  lg:flex-row ">
        {menuItems.map((menuItem) => {
          return (
            <li
              key={menuItem.id}
              className="border-b border-stroke last:border-none p-5 sm:border-none sm-p-0"
            >
              <Link
                to="#"
                className="pb-1 lg:hover:border-b-2 lg:hover:border-accent-yellow"
              >
                {menuItem.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
