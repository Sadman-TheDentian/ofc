const Recommendations = ({score}:{score:number}) => {
  const highRisk = [
    "Change your password and enable 2FA immediately.",
    "Remove public profiles where possible.",
    "Review and update DNS security settings.",
    "Contact your IT/security team.",
    "Consider domain monitoring services for threats.",
  ];
  const medium = [
    "Update DNS records to use SPF, DKIM, DMARC.",
    "Verify your domain is not in scam DBs.",
    "Monitor for breaches using public tools.",
    "Discuss with IT or a security partner.",
  ];
  const low = [
    "Great! Keep monitoring email and DNS security.",
    "Educate employees about phishing/social engineering.",
    "Routinely check for new breaches.",
  ];

  let recs = low;
  if (score > 80) recs = highRisk;
  else if (score > 60) recs = medium.concat(low);
  else if (score > 40) recs = medium;

  return (
    <div className="w-full max-w-xl mx-auto mt-10 p-7 rounded-xl bg-card/90 neon-border border-2 shadow-lg mb-12">
      <h2 className="neon-text font-bold mb-2 text-lg">Recommendations</h2>
      <ul className="list-disc ml-7 space-y-2">
        {recs.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  )
}
export default Recommendations;
