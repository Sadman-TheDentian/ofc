
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  description: string;
  items?: Array<{ name?: string; url?: string; description?: string; text?: string }>;
  badges?: Array<{ text: string; variant: string }>;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  description,
  items = [],
  badges = [],
  className = ""
}) => {
  return (
    <Card className={`bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="text-3xl font-bold text-white mb-2">{value}</div>
        <p className="text-gray-400 text-sm">{description}</p>
        
        {items.length > 0 && (
          <div className="mt-3 space-y-1">
            {items.slice(0, 3).map((item, index) => (
              <div key={index} className="text-xs">
                {item.url ? (
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 flex items-center"
                  >
                    {item.name} <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                ) : (
                  <div className="text-gray-500 bg-gray-800 px-2 py-1 rounded">
                    {item.text || item.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {badges.length > 0 && (
          <div className="mt-3 space-y-1">
            {badges.map((badge, index) => (
              <Badge key={index} className={badge.variant}>
                {badge.text}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
