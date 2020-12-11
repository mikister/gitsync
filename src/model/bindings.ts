export interface Log {
  type: string;
  message: string;
  command: string;
  options?: Record<string, any>;
  error?: unknown;
}
