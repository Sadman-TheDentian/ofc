
import { Twitter } from 'lucide-react';
import { toast } from 'sonner';

interface ShareResultProps {
  email: string;
}

const ShareResult = ({ email }: ShareResultProps) => {
  const encodedEmail = btoa(email);
  const shareableLink = `https://darkcheck.denti.systems/result?q=${encodedEmail}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast.success('Shareable link copied to clipboard!');
  };

  const tweetText = `🔐 My email was found in multiple data breaches. Check yours now — it's 100% free! 👇`;
  const twitterHandle = "@denti_systems";
  const tweetUrl = "darkcheck.denti.systems";
  const fullTweet = `${tweetText}\n\n👉 ${tweetUrl} ${twitterHandle}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullTweet)}`;

  return (
    <div className="mt-6 p-4 bg-background/50 rounded-lg cyber-border">
      <h4 className="font-medium text-center text-primary mb-4">Share Your Result</h4>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={copyLink}
          className="flex-1 cyber-button py-3 px-4 text-sm font-semibold flex items-center justify-center"
        >
          Copy Shareable Link
        </button>
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 cyber-button py-3 px-4 text-sm font-semibold flex items-center justify-center gap-2"
        >
          <Twitter className="h-4 w-4" />
          Share on X
        </a>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">
        Made by DentiSystems • www.denti.systems
      </p>
    </div>
  );
};

export default ShareResult;
