
import { AlertTriangle, CheckCircle, Globe, Calendar, Users, Database } from 'lucide-react';
import type { BreachResult } from '../lib/breachCheck';

interface ResultCardProps {
  result: BreachResult;
}

const ResultCard = ({ result }: ResultCardProps) => {
  return (
    <div className="mt-8">
      {result.found ? (
        <div className="cyber-border rounded-lg p-6 border-destructive bg-destructive/10">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-destructive mb-2">
                Breach Found!
              </h3>
              <p className="text-destructive/90 mb-4">{result.message}</p>
              
              {result.riskLevel && (
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  result.riskLevel === 'critical' ? 'bg-red-900/50 text-red-200 border border-red-700' :
                  result.riskLevel === 'high' ? 'bg-orange-900/50 text-orange-200 border border-orange-700' :
                  result.riskLevel === 'medium' ? 'bg-yellow-900/50 text-yellow-200 border border-yellow-700' :
                  'bg-blue-900/50 text-blue-200 border border-blue-700'
                }`}>
                  Risk Level: {result.riskLevel.toUpperCase()}
                </div>
              )}

              {result.darkWebFindings && (
                <div className="mb-4 p-3 bg-red-900/20 border border-red-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-red-400" />
                    <span className="text-sm font-medium text-red-200">Dark Web Activity Detected</span>
                  </div>
                  <p className="text-xs text-red-300 mt-1">
                    Your credentials may be actively traded on dark web marketplaces.
                  </p>
                </div>
              )}
              
              {result.breaches && result.breaches.length > 0 && (
                <div>
                  <h4 className="font-medium mb-3 text-destructive flex items-center space-x-2">
                    <Database className="h-4 w-4" />
                    <span>Found in these breaches:</span>
                  </h4>
                  <div className="space-y-3">
                    {result.breaches.map((breach, index) => (
                      <div key={index} className="bg-destructive/5 border border-destructive/20 p-3 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-destructive">{breach.Title}</h5>
                          <span className="text-xs text-destructive/70 bg-destructive/10 px-2 py-1 rounded">
                            {breach.Domain}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-2 text-xs text-destructive/80">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Breach: {new Date(breach.BreachDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>Affected: {breach.PwnCount.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="text-xs text-destructive/70 mb-2" dangerouslySetInnerHTML={{ __html: breach.Description }} />
                        
                        <div className="flex flex-wrap gap-1">
                          {breach.DataClasses.map((dataClass, idx) => (
                            <span 
                              key={idx}
                              className="text-xs bg-destructive/10 text-destructive/80 px-2 py-1 rounded"
                            >
                              {dataClass}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 bg-destructive/5 rounded-lg">
                <h4 className="font-medium text-destructive mb-2">Recommended Actions:</h4>
                <ul className="text-sm text-destructive/90 space-y-1">
                  <li>• Change your password immediately</li>
                  <li>• Enable two-factor authentication</li>
                  <li>• Monitor your accounts for suspicious activity</li>
                  <li>• Use unique passwords for each account</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="cyber-border rounded-lg p-6 border-primary bg-primary/10">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                All Clear!
              </h3>
              <p className="text-primary/90">{result.message}</p>
              <p className="text-sm text-primary/70 mt-2">
                Your email was not found in any known data breaches.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
