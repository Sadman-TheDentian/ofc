
'use client';

import {useState} from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
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
  Edit,
  Loader2,
} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {useToast} from '@/hooks/use-toast';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

type ApiKey = {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
};

const initialApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Primary Server Key',
    key: 'ds_prod_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    created: '2023-01-15',
    lastUsed: '2024-05-20',
  },
  {
    id: '2',
    name: 'Staging Environment',
    key: 'ds_test_p6o5n4m3l2k1j0i9h8g7f6e5d4c3b2a1',
    created: '2023-03-10',
    lastUsed: '2024-05-18',
  },
  {
    id: '3',
    name: 'Personal Dev Key',
    key: 'ds_dev_z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4',
    created: '2024-02-01',
    lastUsed: 'Never',
  },
];

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<ApiKey | null>(null);
  const {toast} = useToast();

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    toast({title: 'Copied to clipboard!', description: "The API key has been copied."});
  };

  const openDeleteDialog = (key: ApiKey) => {
    setKeyToDelete(key);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (keyToDelete) {
      setApiKeys(apiKeys.filter(k => k.id !== keyToDelete.id));
      toast({
        title: 'API Key Deleted',
        description: `The key "${keyToDelete.name}" has been revoked.`,
      });
    }
    setDeleteDialogOpen(false);
    setKeyToDelete(null);
  };

  const handleCreateKey = () => {
    if (!newKeyName.trim()) {
        toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Key name cannot be empty.",
        });
        return;
    }
    
    setIsCreating(true);
    // Simulate API call
    setTimeout(() => {
        const newKey = `ds_prod_${[...Array(32)].map(() => Math.random().toString(36)[2]).join('')}`;
        const newApiKey: ApiKey = {
            id: new Date().getTime().toString(),
            name: newKeyName,
            key: newKey,
            created: new Date().toISOString().split('T')[0],
            lastUsed: "Never",
        };

        setApiKeys(prev => [newApiKey, ...prev]);
        setIsCreating(false);
        setCreateDialogOpen(false);
        setNewKeyName('');
        toast({
            title: "API Key Created",
            description: `A new key named "${newKeyName}" has been successfully created.`,
        });
    }, 1000);
  }

  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="font-headline text-2xl font-bold">API Keys</h1>
          <p className="text-muted-foreground mt-1">
            Manage API keys for programmatic access to DentiSystems tools.
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Key
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50">
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
                {apiKeys.map(apiKey => (
                <TableRow key={apiKey.id}>
                    <TableCell className="font-medium whitespace-nowrap">{apiKey.name}</TableCell>
                    <TableCell className="font-mono text-sm">
                    {apiKey.key.slice(0, 8)}••••••••••••••••
                    {apiKey.key.slice(-4)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{apiKey.created}</TableCell>
                    <TableCell>
                    {apiKey.lastUsed === 'Never' ? (
                        <Badge variant="outline">Never</Badge>
                    ) : (
                        apiKey.lastUsed
                    )}
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
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Name
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => openDeleteDialog(apiKey)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
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
              This action cannot be undone. This will permanently delete the API
              key named "{keyToDelete?.name}" and revoke its access.
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

      {/* Create Key Dialog */}
       <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New API Key</DialogTitle>
            <DialogDescription>
              Give your new key a descriptive name to help you identify it later.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="key-name" className="text-right">
                Name
              </Label>
              <Input
                id="key-name"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="col-span-3"
                placeholder="e.g. My Production Server"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)} disabled={isCreating}>Cancel</Button>
            <Button onClick={handleCreateKey} disabled={isCreating}>
              {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
