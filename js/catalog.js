// Turns a pathway definition into what the views need: display week numbers,
// progress item IDs and totals. Week objects are shared between pathways, so
// numbers are worked out here rather than stored in the data.

/** Progress item IDs for one week: <weekId>.d0, .x0, .p0 */
export function weekItemIds(week) {
  return [
    ...week.deliverables.map((_, i) => `${week.id}.d${i}`),
    ...week.explain.map((_, i) => `${week.id}.x${i}`),
    ...(week.project ? week.project.items.map((_, i) => `${week.id}.p${i}`) : []),
  ];
}

export function buildPathway(def) {
  const seen = new Set();
  let n = 0;
  const phases = def.phases.map((phase) => {
    const weeks = phase.weeks.map((week) => {
      if (seen.has(week.id)) throw new Error(`${def.id}: week "${week.id}" appears twice`);
      seen.add(week.id);
      n += 1;
      return { week, n, ids: weekItemIds(week) };
    });
    return { ...phase, weeks, ids: weeks.filter((w) => !w.week.optional).flatMap((w) => w.ids) };
  });
  const all = phases.flatMap((p) => p.weeks);
  const countedIds = phases.flatMap((p) => p.ids);
  return {
    def,
    phases,
    weeks: all,
    weekCount: n,
    countedIds,
    validIds: new Set(all.flatMap((w) => w.ids)),
    /** Display number of a week in this pathway, by week id. */
    numberOf: (id) => all.find((w) => w.week.id === id)?.n ?? null,
  };
}

export const pad = (n) => String(n).padStart(2, "0");
