import { Injectable, EventEmitter } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private settings: Settings;
  public isReady = new EventEmitter();
  private static readonly IMAGE_TABLE_STORAGE_KEY: string = "settings";

   constructor(private storage: Storage) {
    storage.ready().then(() => {
      this.pullFromStorage();
    });
  }

  //Storage Methodes
  private async pullFromStorage() {
    let currentSettings = await this.storage.get(SettingsService.IMAGE_TABLE_STORAGE_KEY);
    
    if (currentSettings) {
      this.settings = currentSettings;
    }
    else {
      this.settings;
    }
    
    this.isReady.emit();
  }

  getSettings() {
    return this.settings;
  }

  private async pushToStorage() {
    await this.storage.set(SettingsService.IMAGE_TABLE_STORAGE_KEY, this.settings);
  }

  async updateSettings(newSettings: any) {
    // console.log(newSettings);
    this.settings = newSettings;
    this.pushToStorage();
  }

  async clearStorage() {
    return await this.storage.clear();
  }

  async removeFromStorage() {
    return await this.storage.remove("settings");
  }
}

export interface Settings {
  defaultTime:  boolean;
  firstStart: boolean;
  fullWeek: boolean
}
