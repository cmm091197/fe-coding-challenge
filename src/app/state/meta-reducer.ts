import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(
  reducer: ActionReducer<any>,
): ActionReducer<any> {
  return localStorageSync({
    keys: ['comments'], // Specify the state slices to sync
    rehydrate: true, // Rehydrate state from local storage on app bootstrap
    checkStorageAvailability: true, // Recommended for SSR compatibility
  })(reducer);
}

export const metaReducers: MetaReducer[] = [localStorageSyncReducer];
