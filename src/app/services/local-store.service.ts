import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@app/constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {
  #storage = inject(LOCAL_STORAGE);

  public set<T>(key: string, value: T): void {
    this.#storage.setItem(key, JSON.stringify(value));
  }

  public get<T>(key: string): T | null {
    const raw = this.#storage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  }

  public remove(key: string): void {
    this.#storage.removeItem(key);
  }

  public clear(): void {
    this.#storage.clear();
  }
}
