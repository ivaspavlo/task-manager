export class MockLocalStoreService {
  private store: Record<string, string> = {};

  public set<T>(key: string, value: T): void {
    this.store[key] = JSON.stringify(value);
  }

  public get<T>(key: string): T | null {
    const raw = this.store[key];
    return raw ? (JSON.parse(raw) as T) : null;
  }

  public remove(key: string): void {
    delete this.store[key];
  }

  public clear(): void {
    this.store = {};
  }
}
