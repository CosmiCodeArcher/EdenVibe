export class YouTubeAPIError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'YouTubeAPIError';
    }
  }
  
  export function handleAPIError(error: unknown): never {
    if (error instanceof Error) {
      throw new YouTubeAPIError(error.message);
    }
    throw new YouTubeAPIError('An unknown error occurred');
  }