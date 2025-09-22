
import { Shield } from 'lucide-react';

const GlobalHeader = () => {
    const logoUrl = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirwhyibjl-3Guf8S6G442OtQmAdOzHrTcxPAuK6QxCGcAJ2I88K7Ee9DN-k_SONDddf2FeB4SwHO8l29PZ9HvHHlxJxiPDnfgrY1DBS60HsVaYv0uOAi08fm6KyrwhM7HPQhbQhL5ufVU_efX268tXM4rR8Vwok_UqbSar_b-B4btAigP5BFaU12PCjUE/s320/DENTI.SYSTEMS%20PNJ.png";

    return (
        <header className="w-full bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <a href="https://dentisystems.com" className="flex items-center gap-2 group">
                         <img src={logoUrl} alt="DentiSystems Logo" className="h-6 w-6" />
                        <span className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">
                            DentiSystems
                        </span>
                    </a>
                    <div className="flex items-center gap-4">
                         <a href="https://dentisystems.com/tools" className="text-sm text-gray-300 hover:text-green-400 transition-colors">
                            Tools
                        </a>
                        <a href="https://dentisystems.com/auth" className="bg-green-600 text-black font-semibold px-4 py-2 rounded-lg text-sm hover:bg-green-500 transition-colors">
                            Account
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default GlobalHeader;
