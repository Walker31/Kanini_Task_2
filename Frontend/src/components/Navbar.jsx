import Button from "@mui/material/Button";
import Logo from '/favicon.png';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    return (
        <nav className="bg-[#121212] flex items-center justify-between px-6 py-3 overflow-y-auto">
            <div className="flex items-center space-x-2">
                <img src={Logo} alt="Kanini" width={40} height={40} />
            </div>
            <div className="flex space-x-4">
                <Button variant="text" className="!text-gray-100" onClick={() => navigate('/')}>Contact</Button>
                <Button variant="text" className="!text-gray-100" onClick={() => navigate('/notes')}>Notes</Button>
            </div>
        </nav>
    );
};

export default Navbar;
