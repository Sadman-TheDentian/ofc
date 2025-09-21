import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";

/**
 * RiskResult type (kept the same)
 */
type RiskResult = {
  scanId: string;
  score: number;
  type: "email" | "domain";
  value: string;
  breaches: number;
  dkim: boolean;
  dmarc: boolean;
  spf: boolean;
  scamdb: boolean;
  mxOk: boolean;
  riskFactors: string[];
};

/**
 * Helper - Get the plain risk label
 */
const getRiskLabel = (score: number) => {
  if (score > 80) return "High Risk";
  if (score > 60) return "Elevated";
  if (score > 40) return "Average";
  return "Low";
};

/**
 * Helper - Get variant color
 */
const getRiskColor = (score: number) => {
  if (score > 80) return "bg-red-600";
  if (score > 60) return "bg-orange-500";
  if (score > 40) return "bg-yellow-400";
  return "bg-green-500";
};

const ResultCard = ({ result }: { result: RiskResult }) => {
  // Major result info
  const riskLabel = getRiskLabel(result.score);
  const riskColor = getRiskColor(result.score);

  // Tagline text by level
  const resultTagline = useMemo(() => {
    if (result.score > 80) return "Immediate action required";
    if (result.score > 60) return "Consider reviewing your security";
    if (result.score > 40) return "Room for improvement";
    return "Looking good!";
  }, [result.score]);

  return (
    <div className="w-full max-w-xl mx-auto mt-12 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center bg-[#19202b]/95 border border-[#233040]">
      <div className="flex flex-col items-center w-full">
        <span className="block text-xs font-mono text-muted-foreground mb-2 opacity-80 tracking-wide uppercase">
          {result.type === "email" ? "Email Address" : "Domain"}
        </span>
        <span className="text-lg font-bold text-white mb-3 text-center select-all break-all">
          {result.value}
        </span>

        {/* Score & label */}
        <div className="flex items-center gap-4 w-full justify-center my-1">
          <span className={`text-6xl font-extrabold tracking-widest ${riskColor} bg-clip-text text-transparent`}>
            {result.score}
          </span>
          <div className="flex flex-col">
            <span className={`text-lg font-bold ${riskColor.replace('bg-', 'text-')}`}>
              {riskLabel}
            </span>
            <span className="text-xs text-muted-foreground">{resultTagline}</span>
            <Progress value={result.score} max={100} className={`mt-2 h-2 ${riskColor} bg-opacity-60 w-36 rounded-full`} />
          </div>
        </div>
      </div>
      {/* Factor breakdown */}
      <div className="w-full mt-6 flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1 bg-[#182024]/60 p-4 rounded-lg border border-[#293748]">
            <span className="text-sm font-bold text-gray-300 block mb-1">Risks & Factors</span>
            <ul className="list-disc ml-5 text-sm whitespace-pre-line space-y-1">
              {result.riskFactors.map((f, i) => (<li key={i}>{f}</li>))}
            </ul>
          </div>
          <div className="flex-1 flex flex-col justify-between bg-[#182024]/60 p-4 rounded-lg border border-[#293748]">
            <span className="text-sm font-bold text-gray-300 mb-1">Technical Breakdown</span>
            <ul className="text-sm font-mono space-y-1">
              <li>Breach DB hits: <b>{result.breaches}</b></li>
              <li>SPF: <b>{result.spf ? "Configured" : "Missing"}</b></li>
              <li>DKIM: <b>{result.dkim ? "Configured" : "Missing"}</b></li>
              <li>DMARC: <b>{result.dmarc ? "Configured" : "Missing"}</b></li>
              <li>ScamDB: <b>{result.scamdb ? "Listed" : "Not Listed"}</b></li>
              <li>MX Config: <b>{result.mxOk ? "OK" : "Misconfigured"}</b></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
