
import GlobalHeader from "@/components/GlobalHeader";
import NeonFooter from "@/components/NeonFooter";
import ResultCard from "@/components/ResultCard";
import Recommendations from "@/components/Recommendations";
import { useParams, useLocation, Link } from "react-router-dom";
import { useMemo } from "react";
import ShareResult from "@/components/ShareResult";

// Demo/mock scan result generator
function mockRiskResult(
  scanId: string,
  type: "email" | "domain",
  value: string
) {
  // Demo: Randomize, slightly deterministic for value
  let hash = value.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  let breaches = (scanId.charCodeAt(0) + scanId.charCodeAt(1)) % 3;
  let dkim = hash % 2 === 0;
  let dmarc = hash % 3 !== 0;
  let spf = hash % 5 !== 0;
  let scamdb = hash % 7 === 0;
  let mxOk = type === "domain" ? hash % 4 !== 0 : true;
  let score = 100
    - (breaches * 28)
    - (dkim ? 0 : 14)
    - (dmarc ? 0 : 12)
    - (spf ? 0 : 10)
    - (scamdb ? 24 : 0)
    - (mxOk ? 0 : 16);
  if (score < 3) score = 3;

  // Risk Factors
  let riskFactors: string[] = [];
  if (breaches) riskFactors.push("Listed in breach dumps");
  if (!dkim) riskFactors.push("Missing/damaged DKIM signature");
  if (!dmarc) riskFactors.push("DMARC record not found");
  if (!spf) riskFactors.push("SPF record missing");
  if (scamdb) riskFactors.push("Listed on scam domain DB");
  if (!mxOk && type === "domain") riskFactors.push("MX records indicate misconfiguration");

  if (riskFactors.length === 0) riskFactors = ["No major risk factors detected"];

  return {scanId,score,type,value,breaches,dkim,dmarc,spf,scamdb,mxOk,riskFactors};
}

const Result = () => {
  const { id } = useParams();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const type = (urlParams.get("type") || "email") as "email" | "domain";
  const value = urlParams.get("value") || "";

  // In real app, fetch(`/api/scan/${id}`)... 
  const result = useMemo(() => mockRiskResult(id ?? "", type, value), [id, type, value]);

  return (
    <div className="min-h-screen bg-cyber-bg text-white flex flex-col">
      <GlobalHeader />
      <main className="flex-grow flex flex-col items-center pb-8 animate-fade-in">
        <ResultCard result={result} />
        <Recommendations score={result.score}/>
        <ShareResult result={result} />
        <div className="mt-8 text-center">
          <Link to="/" className="underline neon-text hover:opacity-80">Scan another email or domain ⭢</Link>
        </div>
      </main>
      <NeonFooter />
    </div>
  );
};

export default Result;
