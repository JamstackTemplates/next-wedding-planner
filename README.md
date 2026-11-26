# Something Blue Weddings (`next-wedding-planner`)

An editorial, cotton-paper and Delft-blue static Next.js website template for a Charleston, South Carolina wedding planning studio. Built for the Jamstacks gallery with fictitious sample couples, venues and contact details; replace the sample content with your real studio details before publishing.

Local development requires Node 24 or later and npm. Run `npm ci` and `npm run dev` to preview locally.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero invitation flat-lay, rhyme-named packages, sample Saturday ribbon, featured real weddings, 2027 date book dance card, planner letter and `ProfessionalService` JSON-LD |
| `/packages/` | Four distinct stationery package pieces, side-by-side comparison reply card, weekend enclosures, full 2027 date book with seasonal notes and Q&A folded notes |
| `/real-weddings/` | Setting filter chips and asymmetric contact sheet of six Lowcountry wedding features |
| `/real-weddings/[id]/` | Individual editorial wedding feature with facts row, two-column story, silk palette spools, ribbon run of day, vendor colophon and previous/next envelope navigation |
| `/timeline/` | Interactive wedding-date countdown (Eastern Time), eighteen-month vertical planning ribbon, sample Saturday run sheet and package starting-point guide |
| `/contact/` | Hosted Jamstacks support form when configured, visible email fallback, message checklist, studio hours with live open badge and keyless Charleston map |
| `/404.html` | Custom empty-aisle error page with links back to Home, Packages and Contact |

## Make it yours

| File | Owns |
| --- | --- |
| `content/date-book.ts` | **Most frequent owner edit**: year, `lastReviewed` date, and monthly Saturday enquiry availability (`open`, `few-left`, `full`) plus seasonal notes. Updates the Home hero note, Home dance card and Packages date book together. |
| `content/business.ts` | Studio name, email, phone, East Bay Street studio description, map query, service area, weekly hours and enquiry copy |
| `content/packages.ts` | Four planning packages (`priceFrom`, guest range, lead months, meetings, day hours, inclusions, availability) |
| `content/inclusions.ts` | Comparison table rows shared by packages |
| `content/add-ons.ts` | Optional weekend enclosure add-ons and compatible package IDs |
| `content/real-weddings.ts` | Real-wedding editorial features, palettes, run-of-day highlights and vendor credits |
| `content/settings.ts` | Setting filter chips referenced by real weddings |
| `content/timeline.ts` | Eighteen-month planning stages and the sample Saturday run of day |
| `app/**/page.tsx` | Page-specific headings, prose, Q&A and calls to action |
| `site.config.json` | Public name, description, hostname, `timeZone` (`America/New_York`) and Jamstacks `siteId`/`cdnUrl` |
| `app/tailwind.input.css` | Light ("Morning of") and dark ("After the last dance") colour tokens, textures, print styles and Jamstacks theme mappings |
| `components/art/` | Inline copperplate-engraving SVG artwork (flat-lay, motifs, six real-wedding vignettes) |
| `lib/structured-data.ts` | `ProfessionalService` JSON-LD derived from `content/business.ts` and `content/packages.ts` |
| `app/sitemap.ts` | Static sitemap including every `/real-weddings/[id]/` route |

### Common owner edit: updating the date book

Open `content/date-book.ts`, change a month's `status` (e.g. October to `'full'` with `saturdaysLeft: 0`), update `lastReviewed` to today's ISO date (`YYYY-MM-DD`), and run `npm run check`. The Home hero note, Home dance card and Packages date book all update automatically.

## Typography and licences

All fonts are self-hosted via npm (`@fontsource/*`) with no runtime third-party font requests:

- **Prata** (`@fontsource/prata`, SIL Open Font License 1.1) — display headings, prices and oversized numerals
- **EB Garamond Variable** (`@fontsource-variable/eb-garamond`, SIL Open Font License 1.1) — body copy, italic decks and small-caps labels
- **Pinyon Script** (`@fontsource/pinyon-script`, SIL Open Font License 1.1) — couple names, planner signature, wordmark flourish and wax seal monogram

## Public configuration and Contact contract

`site.config.json` holds public configuration only (`name`, `description`, `domain`, `timeZone`, `jamstacks.siteId`, `jamstacks.cdnUrl`). When `siteId` is set (or `JAMSTACKS_SITE` is provided at build time), `/contact/` renders `<jamstacks-support-form>` and loads `{cdnUrl}/sites/{siteId}/embed.js`. When unset, `/contact/` shows a direct email fallback without loading any external script. Email (`hello@example.com`) is always visible. All internal navigation to and from `/contact/` uses full-document loads via `SiteLink`.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Gallery publishing metadata lives in the removable `jamstacks/` directory and is validated separately with `node --test jamstacks/config.test.mjs`. Customer builds, tests and GitHub Pages deployments do not read `jamstacks/`.
