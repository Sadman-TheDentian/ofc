
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Copy,
  MoreHorizontal,
  PlusCircle,
  Trash2,
  RefreshCcw,
  Loader2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useFirebase } from '@/firebase';
import { generate as generateApiKey } from 'random-string';

type ApiKey = {
  name: string;
  key: string;
  created: string;
  lastUsed: string;
};

export default function ApiKeysPage() {
  const { user, loading: authLoading } = useAuth();
  const { firestore } = useFirebase();
  const [apiKey, setApiKey] = useState<ApiKey | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user && firestore) {
      const fetchApiKey = async () => {
        setIsLoading(true);
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // @ts-ignore
          if (userData.apiKey && userData.plan === 'pro') {
            setApiKey({
              name: 'Primary API Key',
              // @ts-ignore
              key: userData.apiKey,
              created: new Date(userData.createdAt.toDate()).toISOString().split('T')[0],
              lastUsed: 'Never', // Placeholder
            });
          } else {
            setApiKey(null);
          }
        }
        setIsLoading(false);
      };
      fetchApiKey();
    } else if (!authLoading) {
      setIsLoading(false);
    }
  }, [user, firestore, authLoading]);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: 'Copied to clipboard!', description: 'The API key has been copied.' });
  };
  
  const handleRegenerate = async () => {
    if (!user || !firestore) return;
    setIsRegenerating(true);
    
    const newKey = `ds_prod_${generateApiKey(32)}`;
    const userDocRef = doc(firestore, 'users', user.uid);

    try {
        await updateDoc(userDocRef, { apiKey: newKey });
        setApiKey(prev => prev ? { ...prev, key: newKey } : {
            name: 'Primary API Key',
            key: newKey,
            created: new Date().toISOString().split('T')[0],
            lastUsed: 'Never'
        });
        toast({
            title: 'API Key Regenerated',
            description: 'Your new API key is now active.',
        });
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to regenerate API key.',
        });
        console.error("Error regenerating API key:", error);
    } finally {
        setIsRegenerating(false);
    }
  };

  const handleDelete = async () => {
     if (!user || !firestore) return;
    
    const userDocRef = doc(firestore, 'users', user.uid);
    try {
        await updateDoc(userDocRef, { apiKey: null });
        setApiKey(null);
        toast({
            title: 'API Key Deleted',
            description: 'Your API key has been successfully revoked.',
        });
    } catch (error) {
         toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to delete API key.',
        });
    }
    setDeleteDialogOpen(false);
  };


  if (isLoading || authLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }
  
  // @ts-ignore
  const userPlan = user?.plan;
  const isPro = userPlan === 'pro';

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-headline text-2xl font-bold">API Keys</h1>
          <p className="text-muted-foreground mt-1">
            Manage API keys for programmatic access to DentiSystems tools.
          </p>
        </div>
        <Button onClick={handleRegenerate} disabled={isRegenerating || !isPro}>
            {isRegenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
            {apiKey ? 'Regenerate Key' : 'Create API Key'}
        </Button>
      </div>
      
       {!isPro && !isLoading && (
         <Card className="mb-8 bg-yellow-500/10 border-yellow-500/30">
            <CardHeader>
                <CardTitle className="text-yellow-400">PRO Feature</CardTitle>
                <CardDescription className="text-yellow-400/80">
                    API Access is only available on the PRO plan. Upgrade your account to generate and use API keys.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button variant="secondary" onClick={() => window.location.href='/dashboard/subscriptions'}>Upgrade to PRO</Button>
            </CardFooter>
         </Card>
      )}

      <Card className={`bg-gradient-to-br from-card to-card/80 border-border/50 ${!isPro ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKey ? (
                <TableRow>
                  <TableCell className="font-medium whitespace-nowrap">{apiKey.name}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {apiKey.key.slice(0, 8)}••••••••••••••••
                    {apiKey.key.slice(-4)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{apiKey.created}</TableCell>
                  <TableCell>
                    <Badge variant="outline">Never</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleCopy(apiKey.key)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Key
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleRegenerate}>
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          Regenerate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setDeleteDialogOpen(true)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                    {isPro ? 'No API keys found. Generate your first key to get started.' : 'Upgrade to PRO to generate an API key.'}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="mt-8 bg-gradient-to-br from-accent/50 to-accent/30 border-border/50">
        <CardHeader>
          <CardTitle className="font-headline">API Documentation</CardTitle>
          <CardDescription>
            Need help integrating with our API? Check out our comprehensive
            developer documentation.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button variant="secondary">Read Docs</Button>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently revoke your API key.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
