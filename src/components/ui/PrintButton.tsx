'use client';
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

/** Print/save-as-PDF replaces a static CV file so the profile never drifts from the site data. */
export function PrintButton() {
  return (
    <Button type="button" variant="outline" onClick={() => window.print()}>
      Print / save as PDF <Printer size={16} />
    </Button>
  );
}
