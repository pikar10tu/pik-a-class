export function formatCheckReport({ valid, invalid }) {
  const lines = [`ผ่าน ${valid.length} ข้อ / ไม่ผ่าน ${invalid.length} ข้อ`];

  if (invalid.length === 0) {
    lines.push('ผ่านทั้งหมด ไม่มีข้อที่ต้องแก้');
    return lines.join('\n');
  }

  for (const item of invalid) {
    lines.push('');
    lines.push(`ข้อที่ ${item.index + 1}`);
    for (const error of item.errors) {
      lines.push(`  - ${error.field}: ${error.message}`);
    }
  }
  return lines.join('\n');
}

export function formatCoverage(report) {
  const lines = ['ความครอบคลุมตามเลเวล'];
  for (const row of report) {
    lines.push('');
    lines.push(`${row.level} — ${row.total} ข้อ`);
    for (const tag of row.byTag) {
      lines.push(`  ${tag.label}: ${tag.count}`);
    }
    if (row.missingTagIds.length > 0) {
      lines.push(`  ยังไม่มีข้อเลย: ${row.missingTagIds.join(', ')}`);
    }
  }
  return lines.join('\n');
}
