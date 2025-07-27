// app/dashboard/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { getPlatformLogo } from '@/components/platform-logos';
import { Badge } from '@/components/ui/badge';
import { ConnectionStatus } from '@prisma/client';

export default function DashboardPage() {
  const [connections, setConnections] = useState([]);

  const fetchConnections = async () => {
    const response = await fetch('/api/platform-connections');
    const data = await response.json();
    setConnections(data);
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const onFetchContent = async (connectionId: string) => {
    await fetch(`/api/platform-connections/${connectionId}/fetch-content`, {
      method: 'POST',
    });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {connections.map((connection: any) => (
          <Card key={connection.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  {getPlatformLogo(connection.type, 'w-8 h-8')}
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-white tracking-wider">{connection.type}</CardTitle>
                  <p className="text-sm text-neutral-400">{connection.url}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
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
                <Button onClick={() => onFetchContent(connection.id)}>Fetch Content</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}