import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="w-full flex items-center py-5 fixed top-0 z-20 bg-quaternary">
            <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
                <NavLink to="/" className="flex items-center gap-2">
                    <p className="text-white text-[18px] font-bold cursor-pointer flex">
                        Amechi Aduba
                    </p>
                </NavLink>

                <nav className="flex gap-7">
                    <a 
                        href="#about"
                        className={`text-[18px] font-medium text-customtext hover:text-white transition-colors`}
                    >
                        About
                    </a>
                    <a 
                        href="#projects"
                        className={`text-[18px] font-medium text-customtext hover:text-white transition-colors`}
                    >
                        Projects
                    </a>
                    <a 
                        href="#contact"
                        className={`text-[18px] font-medium text-customtext hover:text-white transition-colors`}
                    >
                        Contact
                    </a>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;
