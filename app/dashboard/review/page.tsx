// app/dashboard/review/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { getPlatformLogo } from '@/components/platform-logos';
import { Textarea } from '@/components/ui/textarea';

export default function ReviewPage() {
  const [repurposedContent, setRepurposedContent] = useState([]);

  const fetchRepurposedContent = async () => {
    const response = await fetch('/api/repurposed-content');
    const data = await response.json();
    setRepurposedContent(data);
  };

  useEffect(() => {
    fetchRepurposedContent();
  }, []);

  const onApprove = (id: string) => {
    console.log('Approving content:', id);
  };

  const onReject = (id: string) => {
    console.log('Rejecting content:', id);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Review Repurposed Content</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {repurposedContent.map((content: any) => (
          <Card key={content.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center">
                  {getPlatformLogo(content.platform, 'w-8 h-8')}
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-white tracking-wider">{content.platform}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea value={content.content} readOnly className="mb-4" />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => onReject(content.id)}>
                  Reject
                </Button>
                <Button onClick={() => onApprove(content.id)}>Approve</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
