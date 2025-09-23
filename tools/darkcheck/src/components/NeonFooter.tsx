
const NeonFooter = () => (
  <footer className="w-full py-4 flex flex-col items-center text-xs text-muted-foreground mt-12 opacity-80">
    <p>
      Powered by <a href="https://dentisystems.com" target="_blank" rel="noopener noreferrer" className="neon-text font-bold hover:underline">DentiSystems</a> &copy; {new Date().getFullYear()} &mdash; 
      <a href="mailto:contact@denti.systems" className="underline ml-1">Contact</a>
    </p>
  </footer>
);

export default NeonFooter;

    