
const NeonFooter = () => (
  <footer className="w-full py-4 flex flex-col items-center text-xs text-gray-400 mt-12 opacity-80">
    <p>
      Powered by <a href="https://dentisystems.com" target="_blank" rel="noopener noreferrer" className="font-bold text-green-400 hover:underline">DentiSystems</a> &copy; {new Date().getFullYear()}
    </p>
  </footer>
);

export default NeonFooter;
