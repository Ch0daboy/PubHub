// app/dashboard/profile/page.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  voice: z.string(),
  style: z.string(),
  niche: z.string(),
  topics: z.array(z.string()),
});

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fetchProfile = async () => {
    const response = await fetch('/api/creator-profile');
    const data = await response.json();
    setProfile(data);
    form.reset(data);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const onGenerateProfile = async () => {
    const response = await fetch('/api/creator-profile', {
      method: 'POST',
    });

    if (response.ok) {
      fetchProfile();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch('/api/creator-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      fetchProfile();
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Creator Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>This profile is generated based on your content. You can edit it below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="voice">Voice</Label>
              <Textarea id="voice" {...form.register('voice')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="style">Style</Label>
              <Textarea id="style" {...form.register('style')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="niche">Niche</Label>
              <Textarea id="niche" {...form.register('niche')} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topics">Topics</Label>
              <Textarea id="topics" {...form.register('topics')} />
            </div>
            <div className="flex space-x-2">
              <Button type="submit">Save Profile</Button>
              <Button variant="outline" onClick={onGenerateProfile}>
                Regenerate Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
