export function prepareItems(
  items,
  { createdBy, batchId, now = new Date().toISOString(), collectionName = 'exercises' } = {},
) {
  return items.map((item) => {
    const prepared = {
      reviewStatus: 'draft',
      isPreview: false,
      ...item,
      createdAt: item.createdAt ?? now,
      updatedAt: now,
      createdBy: item.createdBy ?? createdBy,
      importBatchId: batchId,
    };

    if (collectionName === 'exercises') {
      prepared.visibility = item.visibility ?? 'bank';
      prepared.assignedUids = item.assignedUids ?? [];
    }

    return prepared;
  });
}

export function chunk(array, size) {
  const out = [];
  for (let i = 0; i < array.length; i += size) {
    out.push(array.slice(i, i + size));
  }
  return out;
}
