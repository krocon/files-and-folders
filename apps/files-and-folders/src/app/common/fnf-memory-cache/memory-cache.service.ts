import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class MemoryCacheService<T> {


  private readonly data: { [key: string]: T } = {};

  addEntry(key: string, text: T): void {
    this.data[key] = text;
  }

  removeEntry(key: string): void {
    delete this.data[key];
  }

  hasEntry(key: string): boolean {
    return !!this.data[key];
  }

  getEntry(key: string): T {
    return this.data[key];
  }

  clearAll() {
    const keys = Object.keys(this.data);
    for (const key of keys) {
      delete this.data[key];
    }
  }

}
