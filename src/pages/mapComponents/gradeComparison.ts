// Type for valid special grade strings
import {
  ClimbsTableResponse,
  ClimbWithDependencies,
} from '../../types/interfaces';
type SpecialGrade =
  | 'VEASY'
  | 'VBASIC'
  | 'VBEGINNER'
  | 'VB'
  | 'EASY'
  | 'BEGINNER'
  | 'BASIC';

// Map of special grades to their numeric values
const SPECIAL_GRADES: Record<SpecialGrade, number> = {
  VEASY: -1,
  VBASIC: -1,
  VBEGINNER: -1,
  VB: -1,
  EASY: -1,
  BEGINNER: -1,
  BASIC: -1,
};

// Clean grade string by taking the first grade in a range and removing modifiers
const cleanGradeString = (gradeStr: string | null | undefined): string => {
  if (!gradeStr) return '';

  // Convert to uppercase and remove spaces/hyphens for consistency
  gradeStr = gradeStr.toUpperCase().replace(/\s+/g, '').replace(/^V-/, 'V'); // Handle "V-Easy" -> "VEASY"

  // Handle grade ranges by taking the first grade
  if (gradeStr.includes('-')) {
    gradeStr = gradeStr.split('-')[0];
  }

  // Remove any trailing minus signs
  gradeStr = gradeStr.replace(/\-$/, '');

  // For YDS grades with letter ranges (e.g., "5.10a-b"), take the first letter
  if (gradeStr.startsWith('5.')) {
    gradeStr = gradeStr.replace(/[A-D]\-[A-D]/, (match) => match[0]);
  }

  return gradeStr.trim();
};

// Convert grades to numeric values for comparison
const parseGrade = (gradeStr: string | null | undefined): number => {
  // Clean the grade string first
  gradeStr = cleanGradeString(gradeStr);

  // Check for special grades first
  if (gradeStr in SPECIAL_GRADES) {
    return SPECIAL_GRADES[gradeStr as SpecialGrade];
  }

  // Handle V-grades
  if (gradeStr.startsWith('V')) {
    const vGrade = parseInt(gradeStr.slice(1));
    // Return a value only if we got a valid number
    if (!isNaN(vGrade)) {
      return 10000 + vGrade;
    }
    // If we got something like "VEASY", check the special grades map
    return (gradeStr as SpecialGrade) in SPECIAL_GRADES
      ? SPECIAL_GRADES[gradeStr as SpecialGrade]
      : 0;
  }

  // Handle YDS grades (5.x)
  if (gradeStr.startsWith('5.')) {
    const base = gradeStr.slice(2); // Remove "5."
    let numeric = 0;

    // Handle grades with letters (e.g., 5.10a)
    if (base.match(/\d+[a-d]/i)) {
      const number = parseInt(base);
      const letter = base.slice(-1).toLowerCase();
      const letterValue: Record<string, number> = {
        a: 0.25,
        b: 0.5,
        c: 0.75,
        d: 1.0,
      };

      numeric = number * 100 + (letterValue[letter] || 0);
    } else {
      // Handle grades without letters (e.g., 5.9)
      numeric = parseFloat(base) * 100;
    }

    return numeric;
  }

  // Return 0 for invalid grades
  return 0;
};

// Comparison function for sorting
const compareGrades = (
  gradeA: string | null | undefined,
  gradeB: string | null | undefined,
): number => {
  const valueA = parseGrade(gradeA);
  const valueB = parseGrade(gradeB);
  return valueA - valueB;
};

const groupByGrade = (input: any) => {
  var combinedArrayBoulderTrigger = false;
  var combinedArrayRopeTrigger = false;

  const combinedArrayBoulder = [
    { rating: 'v0-v3', count: 0 },

    { rating: 'v4-v6', count: 0 },

    { rating: 'v7+', count: 0 },
  ];

  const combinedArrayRope = [
    { rating: '5.0-9', count: 0 },
    { rating: '5.10-11d', count: 0 },
    { rating: '5.12+', count: 0 },
  ];

  for (let item of input) {
    const value = parseGrade(item.rating);

    //boulder climbs
    if (value < 10004 && value > 9000) {
      combinedArrayBoulder[0].count += item.count;
      combinedArrayBoulderTrigger = true;
    } else if (value > 10003 && value < 10007) {
      combinedArrayBoulder[1].count += item.count;
      combinedArrayBoulderTrigger = true;
    } else if (value > 10006) {
      combinedArrayBoulder[2].count += item.count;
      combinedArrayBoulderTrigger = true;
    }
    //sport climbs
    else if (value < 1000) {
      combinedArrayRope[0].count += item.count;
      combinedArrayRopeTrigger = true;
    } else if (value >= 1000 && value < 1200) {
      combinedArrayRope[1].count += item.count;
      combinedArrayRopeTrigger = true;
    } else if (value >= 1200) {
      combinedArrayRope[2].count += item.count;
      combinedArrayRopeTrigger = true;
    }
  }
  if (combinedArrayBoulderTrigger && combinedArrayRopeTrigger) {
    return {
      type: 'Both',
      boulderArray: combinedArrayBoulder,
      sportArray: combinedArrayRope,
    };
  } else if (combinedArrayBoulderTrigger) {
    return { type: 'boulder', array: combinedArrayBoulder };
  }
  {
    return { type: 'sport', array: combinedArrayRope };
  }
};

const sortByGradeDesc = (
  a: ClimbWithDependencies,
  b: ClimbWithDependencies,
): number => {
  return compareGrades(b.climb?.rating, a.climb?.rating); // Descending order
};

export { compareGrades, sortByGradeDesc, groupByGrade };
