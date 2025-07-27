// app/dashboard/platform-connections/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { PlatformType, ConnectionStatus } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  type: z.nativeEnum(PlatformType),
  url: z.string().url(),
});

export default function PlatformConnectionsPage() {
  const [connections, setConnections] = useState([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  const fetchConnections = async () => {
    const response = await fetch('/api/platform-connections');
    const data = await response.json();
    setConnections(data);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/platform-connections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      fetchConnections();
      form.reset();
    }
  };

  const onDelete = async (id: string) => {
    const response = await fetch(`/api/platform-connections/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchConnections();
    }
  };

  const onTestConnection = async (id: string) => {
    // TODO: Implement connection testing
    console.log('Testing connection:', id);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Platform Connections</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Add New Connection</CardTitle>
              <CardDescription>Connect a new platform to start syncing your content.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Platform</Label>
                  <Select onValueChange={(value) => form.setValue('type', value as PlatformType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(PlatformType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" placeholder="https://example.com" {...form.register('url')} />
                </div>
                <Button type="submit" className="w-full">
                  Add Connection
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Connected Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {connections.map((connection: any) => (
                  <li key={connection.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{connection.type}</p>
                      <p className="text-sm text-gray-500">{connection.url}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant={
                          connection.status === ConnectionStatus.CONNECTED
                            ? 'default'
                            : connection.status === ConnectionStatus.DISCONNECTED
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {connection.status}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => onTestConnection(connection.id)}>
                        Test
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => onDelete(connection.id)}>
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
