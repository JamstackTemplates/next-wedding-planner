import type { SettingId } from './settings.ts';

export type VignetteKey =
  | 'oaks'
  | 'dunes'
  | 'steeple'
  | 'lighthouse'
  | 'rooftop'
  | 'shed';

export interface PaletteSwatch {
  name: string;
  hex: string;
}

export interface RunOfDayMoment {
  /** Local 24-hour time HH:MM, ascending, none after 23:30. */
  time: string;
  label: string;
}

export interface VendorCredit {
  role: string;
  name: string;
}

/** Real-wedding editorial feature (fictitious sample couples and vendors). */
export interface RealWedding {
  /** URL-safe unique slug for /real-weddings/<id>/. */
  id: string;
  /** First names of the couple. */
  couple: string;
  /** Wedding month in YYYY-MM format. */
  month: string;
  /** Setting identifier referencing content/settings.ts. */
  settingId: SettingId;
  /** Described Lowcountry location, never a named private venue. */
  place: string;
  /** Guest count (must fall within the linked package's guest range). */
  guests: number;
  /** Package identifier referencing content/packages.ts. */
  packageId: string;
  /** Editorial dek line. */
  dek: string;
  /** Two to three paragraphs telling the story of the day. */
  story: readonly string[];
  /** Exactly three colour swatches with valid hex values. */
  palette: readonly [PaletteSwatch, PaletteSwatch, PaletteSwatch];
  /** Three to five ascending highlights on the ribbon run sheet. */
  runOfDay: readonly RunOfDayMoment[];
  /** Pull quote from the couple. */
  quote: string;
  /** Fictitious vendor credits for the colophon. */
  vendors: readonly VendorCredit[];
  /** Artwork key matching one of the six copperplate vignettes. */
  vignette: VignetteKey;
  /** Exactly three weddings are featured on Home. */
  featured: boolean;
}

export const realWeddings: readonly RealWedding[] = [
  {
    id: 'ines-and-theo',
    couple: 'Inès & Theo',
    month: '2026-04',
    settingId: 'garden',
    place: 'under the live oaks on Johns Island',
    guests: 140,
    packageId: 'something-blue',
    dek: 'A spring garden wedding that outran a thunderstorm by eleven minutes.',
    story: [
      'Inès and Theo wanted a ceremony under centuries-old live oaks with Spanish moss overhead and long linen tables glowing by candlelight before dusk. From our first walk-through on Johns Island fourteen months out, we watched the afternoon radar patterns as closely as the floral palette.',
      'By three o’clock on Saturday a dark squall line was crossing the Stono River. Because our rain plan was already staged under the clear-top pavilion—candles lit, place cards weighted, brass quartet briefed—we shifted the prelude forward by ten minutes, kept the vows beneath the oaks, and ushered every guest beneath the canopy eleven minutes before the first drops fell.',
      'Once the storm passed at sunset, the air cooled ten degrees and smelled of rain-washed cedar. They danced to strings and Motown under strung café lights until the sparkler tunnel at ten.',
    ],
    palette: [
      { name: 'Cornflower', hex: '#5B7FC7' },
      { name: 'Spanish moss', hex: '#9AA58A' },
      { name: 'Candle ivory', hex: '#F4ECDA' },
    ],
    runOfDay: [
      { time: '14:00', label: 'First look beneath the oak alley' },
      { time: '16:20', label: 'Vows under the live oaks' },
      { time: '16:50', label: 'Rain-plan cocktails under clear canopy' },
      { time: '18:30', label: 'Candlelit three-course dinner' },
      { time: '22:00', label: 'Sparkler send-off down the drive' },
    ],
    quote:
      'Clementine watched the sky so we never had to. Every guest thought the timing was pure luck—we knew it was her binder.',
    vendors: [
      { role: 'Photography', name: 'Maren & Co. Film' },
      { role: 'Florals', name: 'Bramble & Tide Floristry' },
      { role: 'Catering', name: 'Palmetto Table Kitchen' },
      { role: 'Strings & Band', name: 'Ashley River Ensemble' },
      { role: 'Stationery', name: 'East Bay Letterpress' },
    ],
    vignette: 'oaks',
    featured: true,
  },
  {
    id: 'marisol-and-june',
    couple: 'Marisol & June',
    month: '2025-10',
    settingId: 'coast',
    place: 'a beach house on the Folly Beach dunes',
    guests: 60,
    packageId: 'something-new',
    dek: 'Barefoot vows, a shrimp boil and a brass band down the boardwalk.',
    story: [
      'Marisol and June came to us eight months out with a cedar-shingled beach house chosen and a clear wish: no stiff ballroom, just salt air, good food and music loud enough to carry over the surf. We stepped in to pull together the catering, coastal rentals, sound permits and a sunset timeline tied to the October tide chart.',
      'Chairs were set on the dry sand beside the sea oats for a twenty-minute ceremony that ended with a second-line brass band leading sixty barefoot guests up the boardwalk to the wrap-around porch. Lowcountry boil platters, pickled okra and cold Palomas waited on driftwood-toned tables.',
      'As the sky turned coral, the porch strung with amber bulbs became the dance floor, and neighbours from two houses down applauded from their steps during the last song.',
    ],
    palette: [
      { name: 'Sea glass', hex: '#9CC9C1' },
      { name: 'Driftwood', hex: '#B59C82' },
      { name: 'Sunset coral', hex: '#E3876B' },
    ],
    runOfDay: [
      { time: '16:30', label: 'Barefoot ceremony by the dunes' },
      { time: '17:00', label: 'Brass band parade up the boardwalk' },
      { time: '18:15', label: 'Lowcountry shrimp boil on the porch' },
      { time: '21:30', label: 'Lantern stroll along the shore' },
    ],
    quote:
      'It felt like the best house party we have ever thrown—except we didn’t lift a single chair or answer a single vendor call.',
    vendors: [
      { role: 'Photography', name: 'Linden Shore Studios' },
      { role: 'Catering', name: 'Saltmarsh Boil & Provision' },
      { role: 'Brass Band', name: 'Folly Brass Collective' },
      { role: 'Rentals', name: 'Harbor Linen & Cane' },
    ],
    vignette: 'dunes',
    featured: true,
  },
  {
    id: 'priya-and-sam',
    couple: 'Priya & Sam',
    month: '2026-05',
    settingId: 'chapel',
    place: 'a downtown church and its walled courtyard',
    guests: 220,
    packageId: 'something-blue',
    dek: 'A morning ceremony in silk and marigolds, an evening of two cultures and one dance floor.',
    story: [
      'Blending Priya’s South Indian traditions with Sam’s Charleston roots meant planning a full weekend for 220 guests arriving from four continents. Over fifteen months we coordinated hotel blocks across the historic district, shuttle loops through narrow downtown streets and two distinct ceremony rhythms in one day.',
      'The morning began in the sunlit walled courtyard with fresh jasmine garlands, saffron silk and a traditional ceremony accompanied by nadaswaram and mridangam. Guests rested through the midday heat before returning at dusk for evening vows inside the whitewashed sanctuary, followed by a courtyard feast.',
      'By nine o’clock both families were trading steps between classic soul and Bollywood percussion beneath the church steeple, with cardamom kulfi and Charleston benne wafers passed on silver trays.',
    ],
    palette: [
      { name: 'Saffron', hex: '#E3A73B' },
      { name: 'Midnight', hex: '#1F2C55' },
      { name: 'Jasmine', hex: '#F6F0E0' },
    ],
    runOfDay: [
      { time: '09:30', label: 'Morning garland ceremony in the courtyard' },
      { time: '12:00', label: 'South Indian luncheon under the loggia' },
      { time: '17:30', label: 'Evening vows in the sanctuary' },
      { time: '19:00', label: 'Courtyard banquet and toasts' },
      { time: '22:30', label: 'Petal toss at the wrought-iron gate' },
    ],
    quote:
      'Our parents still talk about how calm both ceremonies felt. Nothing was rushed, and both traditions were treated with real care.',
    vendors: [
      { role: 'Photography', name: 'Calhoun & Moss' },
      { role: 'Florals & Garlands', name: 'Marigold & Magnolia' },
      { role: 'Catering', name: 'Saffron & Oyster Hospitality' },
      { role: 'Music', name: 'Broad Street Sound' },
      { role: 'Transportation', name: 'Battery Trolley Co.' },
    ],
    vignette: 'steeple',
    featured: true,
  },
  {
    id: 'hattie-and-cole',
    couple: 'Hattie & Cole',
    month: '2025-12',
    settingId: 'coast',
    place: 'on the dunes within sight of Morris Island Lighthouse',
    guests: 8,
    packageId: 'something-old',
    dek: 'Eight people, one thermos of cocoa, vows at sunrise.',
    story: [
      'Hattie and Cole wanted winter quiet: both sets of parents, two siblings, warm wool coats and the Atlantic turning silver behind Morris Island Lighthouse. They reached out three months ahead, and we arranged their officiant, documentary photographer, coastal permit and a private fireplace table downtown.',
      'We met on the beach path at six-forty with wool blankets and a thermos of spiked cocoa. As the sun broke cleanly over the lighthouse, they read handwritten vows while pelicans skimmed the water line.',
      'By nine o’clock everyone was tucked into a corner table off Broad Street with hot biscuits, champagne and nowhere else to be all afternoon.',
    ],
    palette: [
      { name: 'Winter sky', hex: '#B8C7DB' },
      { name: 'Sea oats', hex: '#D9C9A3' },
      { name: 'Navy wool', hex: '#28324D' },
    ],
    runOfDay: [
      { time: '06:45', label: 'Walk to the dunes with warm cocoa' },
      { time: '07:15', label: 'Sunrise vows facing the lighthouse' },
      { time: '07:45', label: 'Portraits along the tide line' },
      { time: '09:00', label: 'Private breakfast by the hearth' },
    ],
    quote:
      'Eight chairs weren’t even needed—just the people we love most, warm coats and a morning we will remember forever.',
    vendors: [
      { role: 'Photography', name: 'Clara Vance Film' },
      { role: 'Officiant', name: 'Rev. Owen Mercer' },
      { role: 'Florals', name: 'Sea Oat Studio' },
    ],
    vignette: 'lighthouse',
    featured: false,
  },
  {
    id: 'aiko-and-ben',
    couple: 'Aiko & Ben',
    month: '2026-09',
    settingId: 'city',
    place: 'a rooftop above King Street',
    guests: 90,
    packageId: 'something-borrowed',
    dek: 'They planned every detail themselves, then handed us the clipboard.',
    story: [
      'Aiko is an architect and Ben is a chef, so by eight weeks out they had designed their own seating chart, curated every wine pairing and chosen every vendor on King Street. What they wanted from Something Borrowed was a steady pair of hands to take over the spreadsheet and run the show.',
      'We audited every contract, built a minute-by-minute elevator load-in schedule for the fifth-floor rooftop, and directed Friday’s rehearsal so the wedding party knew their cues by heart.',
      'On Saturday afternoon, church steeples caught the amber September light all around the terrace while Aiko and Ben actually tasted their own cocktail hour—free to be guests at the wedding they had built.',
    ],
    palette: [
      { name: 'Steeple white', hex: '#F2F0EA' },
      { name: 'Indigo', hex: '#33427A' },
      { name: 'Persimmon', hex: '#D9673E' },
    ],
    runOfDay: [
      { time: '16:45', label: 'Rooftop ceremony above the steeples' },
      { time: '17:15', label: 'Persimmon spritzes and raw bar' },
      { time: '18:45', label: 'Family-style dinner under the skyline' },
      { time: '22:15', label: 'Last dance and vintage cab departure' },
    ],
    quote:
      'Handing over our binder felt like exhaling for the first time in a year. Every cue landed to the minute.',
    vendors: [
      { role: 'Photography', name: 'Mercer & Pine' },
      { role: 'Florals', name: 'King Street Stem' },
      { role: 'Catering', name: 'Lowcountry Hearth' },
      { role: 'DJ', name: 'Vinyl & Harbour' },
    ],
    vignette: 'rooftop',
    featured: false,
  },
  {
    id: 'rosa-and-dev',
    couple: 'Rosa & Dev',
    month: '2025-11',
    settingId: 'farm',
    place: 'a riverside farm on Wadmalaw Island',
    guests: 180,
    packageId: 'something-new',
    dek: 'Long tables in an old packing shed, an oyster roast and a bonfire to close.',
    story: [
      'Rosa and Dev fell in love with a working riverside farm on Wadmalaw Island, complete with a weathered timber packing shed and a wide sweep of marsh grass. They brought us in nine months out to turn a raw agricultural space into a warm November feast for 180 guests.',
      'Working from a blank canvas meant generators, catering tents, restroom trailers, gravel lighting and shuttle turnarounds—all hidden behind live-oak hedges so guests saw only long farm tables, brass candlesticks and steam rising from the oyster tables.',
      'After dinner and toasts inside the shed, everyone wandered down to the marsh-edge bonfire for roasted marshmallows, bluegrass and a clear autumn sky.',
    ],
    palette: [
      { name: 'Pecan', hex: '#8A5A3B' },
      { name: 'Cotton', hex: '#F5F1E8' },
      { name: 'Marsh blue', hex: '#5E7C99' },
    ],
    runOfDay: [
      { time: '15:30', label: 'Riverside ceremony by the marsh' },
      { time: '16:15', label: 'Oyster roast and cider on the lawn' },
      { time: '17:45', label: 'Long-table dinner in the packing shed' },
      { time: '20:30', label: 'Bonfire and bluegrass by the creek' },
    ],
    quote:
      'Bringing electricity, kitchens and 180 people out to an island farm sounded impossible until Clementine drew the map.',
    vendors: [
      { role: 'Photography', name: 'Wadmalaw Light Co.' },
      { role: 'Oyster Roast & Dinner', name: 'Creekside Fire Catering' },
      { role: 'Florals', name: 'Marsh Grass & Bloom' },
      { role: 'Band', name: 'Edisto String Band' },
      { role: 'Rentals', name: 'Cooper River Tents' },
    ],
    vignette: 'shed',
    featured: false,
  },
];

export function formatWeddingMonth(ym: string): string {
  const match = /^(\d{4})-(\d{2})$/.exec(ym);
  if (!match) return ym;
  const names = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const monthIdx = Number(match[2]) - 1;
  return `${names[monthIdx] ?? ym} ${match[1]}`;
}

export function weddingById(id: string): RealWedding | undefined {
  return realWeddings.find(wedding => wedding.id === id);
}
