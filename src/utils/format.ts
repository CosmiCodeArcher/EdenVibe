export function formatDuration(isoDuration: string): string {
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    
    if (!match) return 'Invalid duration';
  
    const hours = match[1] ? match[1].replace('H', '') : '';
    const minutes = match[2] ? match[2].replace('M', '') : '';
    const seconds = match[3] ? match[3].replace('S', '') : '';
  
    const parts = [];
    
    if (hours) parts.push(`${hours}h`);
    if (minutes) parts.push(`${minutes}m`);
    if (seconds && !hours) parts.push(`${seconds}s`);
  
    return parts.join(' ') || 'Invalid duration';
  }