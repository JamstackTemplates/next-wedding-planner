/** Lowcountry wedding settings used to filter the Real Weddings index. */
export interface Setting {
  /** URL-safe unique identifier referenced by real weddings. */
  id: string;
  /** Human-readable setting label. */
  label: string;
}

export const settings = [
  { id: 'garden', label: 'Oak gardens' },
  { id: 'coast', label: 'Beaches & dunes' },
  { id: 'chapel', label: 'Churches & courtyards' },
  { id: 'city', label: 'Rooftops & city' },
  { id: 'farm', label: 'Farms & rivers' },
] as const satisfies readonly Setting[];

export type SettingId = (typeof settings)[number]['id'];

export function settingById(id: string): Setting | undefined {
  return settings.find(setting => setting.id === id);
}
