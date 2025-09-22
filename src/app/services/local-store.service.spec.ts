import { TestBed } from '@angular/core/testing';
import { LocalStoreService } from './local-store.service';
import { LOCAL_STORAGE } from '@app/constants';

class MockStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
}

describe('LocalStoreService', () => {
  let service: LocalStoreService;
  let mockStorage: MockStorage;

  beforeEach(() => {
    mockStorage = new MockStorage();

    TestBed.configureTestingModule({
      providers: [LocalStoreService, { provide: LOCAL_STORAGE, useValue: mockStorage }]
    });

    service = TestBed.inject(LocalStoreService);
  });

  it('should store and retrieve an object', () => {
    const key = 'users';
    const value = { name: 'Test User' };

    service.set(key, value);
    const result = service.get(key);

    expect(result).toEqual(value);
  });

  it('should return null if item is not found', () => {
    expect(service.get('missing')).toBeNull();
  });

  it('should remove an item', () => {
    const key = 'tasks';
    service.set(key, { name: 'Test Task' });

    service.remove(key);

    expect(service.get(key)).toBeNull();
  });

  it('should clear all items', () => {
    service.set('a', 1);
    service.set('b', 2);

    service.clear();

    expect(service.get('a')).toBeNull();
    expect(service.get('b')).toBeNull();
  });
});
