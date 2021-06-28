import React, { useEffect, useState } from 'react';

const DropMenu = ({ children, active, btnClass }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (active) setOpen(true);

    window.addEventListener('click', dropMenuHandler);

    return () => window.removeEventListener('click', dropMenuHandler);
  }, [active]);

  const dropMenuHandler = (e) => {
    const btnClicked = e.target.className.includes(btnClass);
    const dropClicked = e.target.className.includes('dropdown-menu');
    setOpen(!dropClicked && !btnClicked ? false : open);
  };

  return (
    <div className={open ? 'dropdown-menu active' : 'dropdown-menu'}>
      {children}
    </div>
  );
};

DropMenu.defaultProps = {
  children: <div>Empty Menu</div>,
  active: false,
  btnClass: 'dropdownTrigger',
};

export default DropMenu;
