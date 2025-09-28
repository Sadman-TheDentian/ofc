
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
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
  EyeOff,
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
import Link from 'next/link';
import { useDoc } from '@/firebase/firestore/use-doc';

type ApiKeyInfo = {
  key: string;
  createdAt: string;
};

export default function ApiKeysPage() {
  const { user, loading: authLoading } = useAuth();
  const { firestore } = useFirebase();

  const userDocRef = user ? doc(firestore, 'users', user.uid) : null;
  const { data: userData, isLoading: userLoading } = useDoc(userDocRef);

  const [apiKeyInfo, setApiKeyInfo] = useState<ApiKeyInfo | null>(null);
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState<string | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const userPlan = userData?.plan || 'free';

  useEffect(() => {
    if (userData) {
      if (userData.apiKeyHashed) {
        setApiKeyInfo({
          key: 'ds_prod_••••••••••••••••••••••••••••••••', // Never show the real key
          createdAt: userData.apiKeyCreatedAt ? new Date(userData.apiKeyCreatedAt.toDate()).toISOString().split('T')[0] : 'N/A',
        });
      } else {
        setApiKeyInfo(null);
      }
    }
  }, [userData]);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({ title: 'Copied to clipboard!', description: 'Your new API key has been copied.' });
  };
  
  const handleRegenerate = async () => {
    if (!user || !firestore || userPlan !== 'pro') return;
    setIsRegenerating(true);
    
    // In a real app, this would call a secure cloud function/server action
    // We are simulating this by updating the doc client-side for demo.
    // The key generation itself should be server-side.
    try {
        const response = await fetch('/api/regenerate-key', { method: 'POST' }); // Placeholder for a real API route
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to regenerate key');
        }

        setNewlyGeneratedKey(data.apiKey);
        setApiKeyInfo({
            key: 'ds_prod_••••••••••••••••••••••••••••••••',
            createdAt: new Date().toISOString().split('T')[0]
        });

        toast({
            title: 'API Key Regenerated!',
            description: 'Your new key is now active. Copy it now, you will not see it again.',
        });
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: error instanceof Error ? error.message : 'Failed to regenerate API key.',
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
        await updateDoc(userDocRef, { apiKeyHashed: null, apiKeyCreatedAt: null });
        setApiKeyInfo(null);
        setNewlyGeneratedKey(null);
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

  if (authLoading || userLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }
  
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
            {apiKeyInfo ? 'Regenerate Key' : 'Create API Key'}
        </Button>
      </div>
      
       {!isPro && (
         <Card className="mb-8 bg-yellow-500/10 border-yellow-500/30">
            <CardHeader>
                <CardTitle className="text-yellow-400">PRO Feature</CardTitle>
                <CardDescription className="text-yellow-400/80">
                    API Access is only available on the PRO plan. Upgrade your account to generate and use API keys.
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button variant="secondary" asChild>
                    <Link href="/dashboard/subscriptions">Upgrade to PRO</Link>
                </Button>
            </CardFooter>
         </Card>
      )}
      
      {newlyGeneratedKey && (
          <Card className="mb-8 bg-green-500/10 border-green-500/30">
              <CardHeader>
                  <CardTitle className="text-green-400">Your New API Key</CardTitle>
                  <CardDescription className="text-green-400/80">
                      Please copy this key and store it securely. You will not be able to see it again.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="flex items-center gap-2 p-3 bg-background rounded-md">
                      <pre className="font-mono text-sm flex-1 truncate">{newlyGeneratedKey}</pre>
                      <Button variant="ghost" size="icon" onClick={() => handleCopy(newlyGeneratedKey)}>
                          <Copy className="h-4 w-4" />
                      </Button>
                  </div>
              </CardContent>
              <CardFooter>
                  <Button variant="secondary" onClick={() => setNewlyGeneratedKey(null)}>
                        <EyeOff className="mr-2 h-4 w-4" />
                        I have saved my key
                  </Button>
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
              {apiKeyInfo ? (
                <TableRow>
                  <TableCell className="font-medium whitespace-nowrap">Primary API Key</TableCell>
                  <TableCell className="font-mono text-sm">
                    {apiKeyInfo.key}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{apiKeyInfo.createdAt}</TableCell>
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
