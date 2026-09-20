import { collection, query, where, orderBy } from 'firebase/firestore';

export function bankExerciseConstraints({ skill, level, tier }) {
  const constraints = [
    ['reviewStatus', '==', 'published'],
    ['visibility', '==', 'bank'],
    ['skill', '==', skill],
    ['level', '==', level],
  ];
  if (tier !== 'full') constraints.push(['isPreview', '==', true]);
  return constraints;
}

export function assignedExerciseConstraints(uid) {
  return [['assignedUids', 'array-contains', uid]];
}

export function myAssignmentConstraints(uid) {
  return [['assignedTo', 'array-contains', uid]];
}

export function myHistoryConstraints(uid) {
  return [['uid', '==', uid]];
}

export function gradingQueueConstraints() {
  return [['status', '==', 'pending']];
}

export function studentListConstraints() {
  return [['role', '==', 'student']];
}

export function contentLibraryConstraints({ reviewStatus, skill, level } = {}) {
  const constraints = [];
  if (reviewStatus) constraints.push(['reviewStatus', '==', reviewStatus]);
  if (skill) constraints.push(['skill', '==', skill]);
  if (level) constraints.push(['level', '==', level]);
  return constraints;
}

export function buildQuery(db, collectionName, constraints, orderBySpec = null) {
  const parts = constraints.map(([field, op, value]) => where(field, op, value));
  if (orderBySpec) parts.push(orderBy(orderBySpec.field, orderBySpec.direction ?? 'asc'));
  return query(collection(db, collectionName), ...parts);
}
