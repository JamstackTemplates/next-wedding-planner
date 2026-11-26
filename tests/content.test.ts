import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { addOns } from '../content/add-ons.ts';
import { business } from '../content/business.ts';
import { dateBook, dateBookSummaryLine } from '../content/date-book.ts';
import { inclusions } from '../content/inclusions.ts';
import { packages } from '../content/packages.ts';
import { realWeddings } from '../content/real-weddings.ts';
import { settings } from '../content/settings.ts';
import { runOfDay, stages } from '../content/timeline.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';
import {
  validateAddOns,
  validateBusiness,
  validateDateBook,
  validateInclusions,
  validatePackages,
  validateRealWeddings,
  validateSettings,
  validateTimeline,
} from '../lib/validate-content.ts';

test('all typed content collections pass validation', () => {
  validateBusiness(business);
  const inclusionIds = validateInclusions(inclusions);
  const packagesById = validatePackages(packages, inclusionIds);
  validateAddOns(addOns, new Set(packagesById.keys()));
  const settingIds = validateSettings(settings);
  validateDateBook(dateBook);
  validateRealWeddings(realWeddings, packagesById, settingIds);
  validateTimeline(stages, runOfDay);
});

test('package prices ascend Old < Borrowed < New < Blue and schema derives from content', () => {
  const order = ['something-old', 'something-borrowed', 'something-new', 'something-blue'];
  assert.deepEqual(packages.map(p => p.id), order);
  for (let i = 1; i < packages.length; i++) {
    assert.ok(
      packages[i - 1].priceFrom < packages[i].priceFrom,
      `${packages[i - 1].id} must cost less than ${packages[i].id}`,
    );
  }

  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'ProfessionalService');
  assert.equal(schema.name, business.name);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.priceRange, '$1,650–$12,800');
  assert.equal(schema.areaServed.length, business.serviceArea.length);
  assert.equal(schema.openingHoursSpecification.length, 5);
  assert.equal(schema.hasOfferCatalog.itemListElement.length, 4);
  assert.equal(schema.hasOfferCatalog.itemListElement[0].price, '1650');
  assert.equal(schema.hasOfferCatalog.itemListElement[3].price, '12800');
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('dateBookSummaryLine reflects owner edits to October availability', () => {
  assert.equal(
    dateBookSummaryLine(dateBook),
    '2027 dates are open for enquiry: October is almost full',
  );
  const edited = {
    ...dateBook,
    lastReviewed: '2026-11-26',
    months: dateBook.months.map(m =>
      m.month === 10 ? { ...m, status: 'full' as const, saturdaysLeft: 0 } : m,
    ),
  };
  validateDateBook(edited);
  assert.match(dateBookSummaryLine(edited), /October.*full/i);
});

test('content validators reject invalid IDs, references, prices, ranges, palettes and schedules with item-specific messages', () => {
  const inclusionIds = validateInclusions(inclusions);
  const packagesById = validatePackages(packages, inclusionIds);
  const packageIdSet = new Set(packagesById.keys());
  const settingIds = validateSettings(settings);

  // Duplicate and non-URL-safe IDs
  assert.throws(() => validateInclusions([...inclusions, inclusions[0]]), /venue-search/);
  assert.throws(
    () => validateSettings([...settings, { id: 'Bad Setting!', label: 'Bad' }]),
    /Bad Setting!/,
  );
  assert.throws(
    () => validateAddOns([...addOns, addOns[0]], packageIdSet),
    /welcome-party/,
  );

  // Unknown references
  assert.throws(
    () =>
      validatePackages(
        packages.map(p =>
          p.id === 'something-old' ? { ...p, includes: ['not-a-real-inclusion' as never] } : p,
        ),
        inclusionIds,
      ),
    /something-old.*not-a-real-inclusion/,
  );
  assert.throws(
    () =>
      validateAddOns(
        addOns.map(a =>
          a.id === 'welcome-party' ? { ...a, packageIds: ['ghost-package'] } : a,
        ),
        packageIdSet,
      ),
    /welcome-party.*ghost-package/,
  );
  assert.throws(
    () =>
      validateRealWeddings(
        realWeddings.map(w => (w.id === 'ines-and-theo' ? { ...w, packageId: 'missing-pkg' } : w)),
        packagesById,
        settingIds,
      ),
    /ines-and-theo.*missing-pkg/,
  );
  assert.throws(
    () =>
      validateRealWeddings(
        realWeddings.map(w =>
          w.id === 'ines-and-theo' ? { ...w, settingId: 'mountain' as never } : w,
        ),
        packagesById,
        settingIds,
      ),
    /ines-and-theo.*mountain/,
  );

  // Non-positive / non-integer prices & invalid guest ranges
  assert.throws(
    () =>
      validatePackages(
        packages.map(p => (p.id === 'something-new' ? { ...p, priceFrom: 0 } : p)),
        inclusionIds,
      ),
    /something-new\.priceFrom/,
  );
  assert.throws(
    () =>
      validatePackages(
        packages.map(p => (p.id === 'something-new' ? { ...p, priceFrom: 199.5 } : p)),
        inclusionIds,
      ),
    /something-new\.priceFrom/,
  );
  assert.throws(
    () =>
      validatePackages(
        packages.map(p =>
          p.id === 'something-old' ? { ...p, guests: { min: 40, max: 30 } } : p,
        ),
        inclusionIds,
      ),
    /something-old.*guests\.min/,
  );

  // Real wedding guests outside its package's range
  assert.throws(
    () =>
      validateRealWeddings(
        realWeddings.map(w => (w.id === 'hattie-and-cole' ? { ...w, guests: 120 } : w)),
        packagesById,
        settingIds,
      ),
    /hattie-and-cole.*something-old/,
  );

  // Featured package count must be exactly 1
  assert.throws(
    () => validatePackages(packages.map(p => ({ ...p, featured: false })), inclusionIds),
    /expected exactly 1 featured package/,
  );
  assert.throws(
    () => validatePackages(packages.map(p => ({ ...p, featured: true })), inclusionIds),
    /expected exactly 1 featured package/,
  );

  // Featured weddings count must be exactly 3
  assert.throws(
    () =>
      validateRealWeddings(
        realWeddings.map(w => (w.id === 'ines-and-theo' ? { ...w, featured: false } : w)),
        packagesById,
        settingIds,
      ),
    /expected exactly 3 featured weddings/,
  );

  // Palette hex validation
  assert.throws(
    () =>
      validateRealWeddings(
        realWeddings.map(w =>
          w.id === 'rosa-and-dev'
            ? {
                ...w,
                palette: [
                  { name: 'Bad', hex: 'not-hex' },
                  w.palette[1],
                  w.palette[2],
                ],
              }
            : w,
        ),
        packagesById,
        settingIds,
      ),
    /rosa-and-dev.*not-hex/,
  );

  // Malformed YYYY-MM
  assert.throws(
    () =>
      validateRealWeddings(
        realWeddings.map(w => (w.id === 'aiko-and-ben' ? { ...w, month: '2026-13' } : w)),
        packagesById,
        settingIds,
      ),
    /aiko-and-ben.*2026-13/,
  );

  // Run-of-day invalid, out of order, or after 23:30
  assert.throws(
    () =>
      validateTimeline(stages, [
        { time: '16:00', label: 'Ceremony' },
        { time: '15:00', label: 'Out of order' },
      ]),
    /Out of order.*ascending/,
  );
  assert.throws(
    () =>
      validateTimeline(stages, [
        { time: '22:00', label: 'Send-off' },
        { time: '23:45', label: 'Afterparty' },
      ]),
    /Afterparty.*23:30/,
  );

  // Timeline stages gaps, overlaps, or not ending at 0
  assert.throws(
    () =>
      validateTimeline(
        stages.map(s => (s.id === 'week-of' ? { ...s, monthsBefore: { from: 1, to: 1 } } : s)),
        runOfDay,
      ),
    /week-of/,
  );
  assert.throws(
    () =>
      validateTimeline(
        stages.map(s => (s.id === 'last-two' ? { ...s, monthsBefore: { from: 3, to: 1 } } : s)),
        runOfDay,
      ),
    /last-two.*gap or overlap/,
  );

  // Date book invalid month, duplicate month, inconsistent saturdaysLeft
  assert.throws(
    () =>
      validateDateBook({
        ...dateBook,
        months: [...dateBook.months, { month: 13, status: 'open', saturdaysLeft: 1 }],
      }),
    /outside 1–12/,
  );
  assert.throws(
    () =>
      validateDateBook({
        ...dateBook,
        months: [...dateBook.months, { month: 10, status: 'open', saturdaysLeft: 1 }],
      }),
    /duplicate month 10/,
  );
  assert.throws(
    () =>
      validateDateBook({
        ...dateBook,
        months: dateBook.months.map(m => (m.month === 12 ? { ...m, saturdaysLeft: 1 } : m)),
      }),
    /month 12.*full/,
  );

  // Unused setting
  assert.throws(
    () =>
      validateRealWeddings(
        realWeddings,
        packagesById,
        new Set([...settingIds, 'vineyard']),
      ),
    /settings\.vineyard.*unused/,
  );
});

test('site copy contains no booking/reservation/payment promises', () => {
  const forbidden = /\b(book now|reserve|confirmed|secure your date)\b/i;
  const dirs = ['content', 'app'];

  function walk(dir: string): string[] {
    const results: string[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) results.push(...walk(full));
      else if (/\.(ts|tsx)$/.test(entry.name)) results.push(full);
    }
    return results;
  }

  for (const dir of dirs) {
    for (const file of walk(dir)) {
      const text = readFileSync(file, 'utf8');
      const match = forbidden.exec(text);
      assert.equal(match, null, `${file} contains forbidden wording: "${match?.[0]}"`);
    }
  }
});
