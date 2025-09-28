
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Plus, Trash2, Loader2, Crown } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { generateFirewallConfig } from './actions';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';

interface Rule {
  id: number;
  action: 'Allow' | 'Deny';
  port: string;
  protocol: 'TCP' | 'UDP';
  source: string;
}

export default function CloudFirewallPage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [serverIP, setServerIP] = useState('');
  const [rules, setRules] = useState<Rule[]>([]);
  const [newRule, setNewRule] = useState({ action: 'Allow' as 'Allow' | 'Deny', port: '', protocol: 'TCP' as 'TCP' | 'UDP', source: '0.0.0.0/0' });
  const [isGenerating, setIsGenerating] = useState(false);
  
  // @ts-ignore
  const userPlan = user?.plan || 'free';
  const isPro = userPlan === 'pro';

  const addRule = () => {
    if (!newRule.port) {
      toast({ variant: 'destructive', title: 'Error', description: 'Port is required.' });
      return;
    }
    setRules([...rules, { ...newRule, id: Date.now() }]);
    setNewRule({ action: 'Allow', port: '', protocol: 'TCP', source: '0.0.0.0/0' });
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };
  
  const handleGenerate = async () => {
      if (!isPro) {
          toast({ variant: 'destructive', title: 'Upgrade Required', description: 'This is a PRO feature.' });
          return;
      }
      if (!serverIP) {
          toast({ variant: 'destructive', title: 'Error', description: 'Server IP or Domain is required.'});
          return;
      }
      if (rules.length === 0) {
          toast({ variant: 'destructive', title: 'Error', description: 'Please add at least one rule.'});
          return;
      }
      if (!user) {
         toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in.'});
          return;
      }
      
      setIsGenerating(true);
      const result = await generateFirewallConfig({ serverIP, rules }, user.uid);
      setIsGenerating(false);

      if (result.success && result.config) {
          router.push(`/tools/cloud-firewall/config?config=${encodeURIComponent(result.config)}`);
      } else {
          toast({ variant: 'destructive', title: 'Generation Failed', description: result.message || 'An unexpected error occurred.' });
      }
  }

  if (loading) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-12 md:py-20 text-center">
        <h1 className="font-headline text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-muted-foreground mb-8">You must be logged in to use this tool.</p>
        <Button asChild><Link href="/auth">Login</Link></Button>
      </div>
    );
  }
  
  return (
    <div className="container py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Cloud Firewall Lite</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Generate `ufw` (Uncomplicated Firewall) rules for your servers quickly.
        </p>
      </div>
      
      {!isPro && (
         <div className="max-w-3xl mx-auto text-center space-y-6 bg-secondary/30 p-8 rounded-xl border border-primary/50 mb-12">
            <Crown className="h-12 w-12 text-primary mx-auto" />
            <h1 className="font-headline text-2xl font-bold tracking-tighter sm:text-3xl">
                PRO Feature Locked
            </h1>
            <p className="text-xl text-muted-foreground">
                The Cloud Firewall Lite tool is available exclusively to PRO subscribers. Upgrade your plan to generate and manage firewall configurations.
            </p>
            <div className="flex gap-4 justify-center">
                <Button asChild size="lg">
                    <Link href="/pricing">Upgrade to PRO</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                    <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
            </div>
        </div>
      )}

      <div className={`grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto ${!isPro ? 'opacity-50 pointer-events-none' : ''}`}>
        <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
          <CardHeader>
            <CardTitle>Rule Generator</CardTitle>
            <CardDescription>Define your server and add rules below.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="server-ip">Server IP or Domain</Label>
              <Input id="server-ip" placeholder="e.g., 192.168.1.1 or my-server.com" value={serverIP} onChange={(e) => setServerIP(e.target.value)} disabled={!isPro} />
            </div>
            
            <div className="border bg-secondary/30 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold">Add New Rule</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select value={newRule.action} onValueChange={(v) => setNewRule({...newRule, action: v as 'Allow' | 'Deny' })} disabled={!isPro}>
                  <SelectTrigger><SelectValue placeholder="Action" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Allow">Allow</SelectItem>
                    <SelectItem value="Deny">Deny</SelectItem>
                  </SelectContent>
                </Select>
                 <Select value={newRule.protocol} onValueChange={(v) => setNewRule({...newRule, protocol: v as 'TCP' | 'UDP' })} disabled={!isPro}>
                  <SelectTrigger><SelectValue placeholder="Protocol" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TCP">TCP</SelectItem>
                    <SelectItem value="UDP">UDP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Port (e.g., 22, 443)" value={newRule.port} onChange={(e) => setNewRule({...newRule, port: e.target.value})} disabled={!isPro}/>
                  <Input placeholder="Source (e.g., 0.0.0.0/0)" value={newRule.source} onChange={(e) => setNewRule({...newRule, source: e.target.value})} disabled={!isPro}/>
              </div>
              <Button onClick={addRule} className="w-full" disabled={!isPro}>
                <Plus className="mr-2 h-4 w-4" /> Add Rule
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={handleGenerate} disabled={isGenerating || !isPro}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate Firewall Config
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
          <CardHeader>
            <CardTitle>Current Ruleset</CardTitle>
            <CardDescription>{rules.length} rules defined.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg max-h-96 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Action</TableHead>
                    <TableHead>Port</TableHead>
                    <TableHead>Protocol</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rules.length > 0 ? rules.map(rule => (
                    <TableRow key={rule.id}>
                      <TableCell>{rule.action}</TableCell>
                      <TableCell>{rule.port}</TableCell>
                      <TableCell>{rule.protocol}</TableCell>
                      <TableCell>{rule.source}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeRule(rule.id)} disabled={!isPro}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) : (
                     <TableRow>
                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                            No rules added yet.
                        </TableCell>
                     </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
