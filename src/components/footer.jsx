import { FaGithub } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-[#222] text-white py-6 px-4 text-center">
            <p className="text-sm mb-2">
                Created by <strong>Vincenzo Antonino Lisitano</strong> © 2025
            </p>
            <div className="flex items-center justify-center gap-2">
                <FaGithub className="text-xl" />
                <a
                    href="https://github.com/vincilisi"
                    className="text-mcdYellow hover:text-mcdRed transition"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
            </div>
        </footer>
    );
}

export default Footer;
