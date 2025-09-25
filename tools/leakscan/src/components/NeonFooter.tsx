
const NeonFooter = () => (
  <footer className="w-full py-4 flex flex-col items-center text-xs text-muted-foreground mt-12 opacity-80">
    <div className="neon-glow mb-2" />
    <p>
      Powered by <span className="neon-text font-bold">DentiSystems</span> &copy; {new Date().getFullYear()} &mdash; 
      <a href="mailto:contact@denti.systems" className="underline ml-1">Contact</a>
    </p>
    <p className="mt-1">No data stored. No accounts. 100% privacy.</p>
  </footer>
);

export default NeonFooter;

