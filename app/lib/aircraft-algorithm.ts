import { Aircraft, Isabel } from '../types/aircraft';
import { getAircraft, getAircraftExcluding } from './get-aircraft';

export interface AircraftAnalysis {
  aircraft: Aircraft;
  score: number;
}

export const analyzeAircraft = (aircraft: string): AircraftAnalysis[] => {
  const currentAircraft = getAircraft(aircraft);
  if (!currentAircraft) {
    return [];
  }
  const allAircraft = getAircraftExcluding(aircraft);
  return allAircraft
    .map(ac => ({
      score: compareIsable(currentAircraft.isabel, ac.isabel),
      aircraft: ac,
    }))
    .filter(ac => ac.score > 16)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
};

const compareIsable = (isabel1: Isabel, isabel2: Isabel): number => {
  let score = baselineComparison(isabel1, isabel2);
  score += distinctiveFeatures(isabel2);
  return score;
};

const baselineComparison = (target1: Isabel, target2: Isabel): number => {
  let score = 0;
  if (target1.wings.type === target2.wings.type) {
    score += 20;
  } else {
    score -= 5;
  }
  if (target1.engine.type === target2.engine.type) {
    score += 10;
  } else {
    score -= 3;
  }
  if (target1.fuselage.shape === target2.fuselage.shape) {
    score += 10;
  } else {
    score -= 3;
  }
  if (target1.tail.type === target2.tail.type) {
    score -= 3;
  } else {
    score -= 2;
  }
  return score;
};

const distinctiveFeatures = (target: Isabel): number => {
  const score = Math.min(target.fuselage.distinctiveFeatures.length * 2, 6);
  return score;
};
