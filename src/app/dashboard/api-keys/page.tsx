import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ApiKeysPage() {
    const apiKeys = [
        { id: 1, name: "Primary Server Key", key: "ds_prod_••••••••••••••••••••1a2b", created: "2023-01-15", lastUsed: "2024-05-20" },
        { id: 2, name: "Staging Environment", key: "ds_test_••••••••••••••••••••3c4d", created: "2023-03-10", lastUsed: "2024-05-18" },
        { id: 3, name: "Personal Dev Key", key: "ds_dev_••••••••••••••••••••5e6f", created: "2024-02-01", lastUsed: "Never" },
    ];

    return (
        <div>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="font-headline text-2xl font-bold">API Keys</h1>
                    <p className="text-muted-foreground mt-1">Manage API keys for programmatic access to DentiSystems tools.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create New Key
                </Button>
            </div>
            
            <Card>
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
                                <TableCell className="font-medium">{apiKey.name}</TableCell>
                                <TableCell className="font-mono text-sm">{apiKey.key}</TableCell>
                                <TableCell>{apiKey.created}</TableCell>
                                <TableCell>{apiKey.lastUsed === 'Never' ? <Badge variant="outline">Never</Badge> : apiKey.lastUsed}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <Card className="mt-8 bg-accent">
                <CardHeader>
                    <CardTitle className="font-headline">API Documentation</CardTitle>
                    <CardDescription>
                        Need help integrating with our API? Check out our comprehensive developer documentation.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="secondary">Read Docs</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
