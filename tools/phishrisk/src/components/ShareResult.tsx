import { Twitter } from 'lucide-react';
import { toast } from 'sonner';

type RiskResult = {
  scanId: string;
  score: number;
  type: "email" | "domain";
  value: string;
};

interface ShareResultProps {
  result: RiskResult;
}

const ShareResult = ({ result }: ShareResultProps) => {
  const shareableLink = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(shareableLink);
    toast.success('Shareable link copied to clipboard!');
  };

  const getRiskLabel = (score: number) => {
    if (score > 80) return "High";
    if (score > 60) return "Elevated";
    if (score > 40) return "Average";
    return "Low";
  };

  const tweetText = `My ${result.type} has a PhishRisk score of ${result.score} (${getRiskLabel(result.score)} risk). Check yours for free! 👇`;
  const twitterHandle = "@denti_systems";
  const tweetUrl = "phishrisk.denti.systems";
  const fullTweet = `${tweetText}\n\n👉 ${tweetUrl} ${twitterHandle}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullTweet)}`;

  return (
    <div className="w-full max-w-xl mx-auto p-6 rounded-xl bg-[#182024]/60 border border-[#293748]">
      <h4 className="font-medium text-center text-neon mb-4">Share Your Result</h4>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={copyLink}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg uppercase tracking-wider shadow-lg transition-colors duration-200 text-sm flex items-center justify-center"
        >
          Copy Shareable Link
        </button>
        <a
          href={twitterShareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#1DA1F2] hover:bg-[#1a91da] text-white font-bold py-3 px-4 rounded-lg uppercase tracking-wider shadow-lg transition-colors duration-200 text-sm flex items-center justify-center gap-2"
        >
          <Twitter className="h-4 w-4" />
          Share on X
        </a>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">
        Made by DentiSystems • phishrisk.denti.systems
      </p>
    </div>
  );
};

export default ShareResult;
