function assertIdPart(value) {
  if (typeof value !== 'string' || value.trim() === '') throw new Error('รหัสเอกสารห้ามว่าง');
  if (value.includes('/')) throw new Error('ห้ามมีเครื่องหมาย / ในรหัสเอกสาร');
  return value;
}

export function submissionId(uid, exerciseId, assignmentId = null) {
  const scope = assignmentId === null || assignmentId === undefined ? 'bank' : assignmentId;
  return [uid, scope, exerciseId].map(assertIdPart).join('__');
}

export function stageClearId(uid, stageId) {
  return [uid, stageId].map(assertIdPart).join('__');
}
