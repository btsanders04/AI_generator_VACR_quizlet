'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <Button variant="outline" size="icon" onClick={cycleTheme}>
      {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />}
      {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />}
      {theme === 'system' && <Monitor className="h-[1.2rem] w-[1.2rem] transition-all" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
