// Cinema Kalalayam™ - Automated Smoke Test Suite
// Verifies data integrity, 6 courses, mentors, feedback logic, and image asset delivery

import assert from 'node:assert';
import fs from 'node:fs';
import { COURSES } from '../src/data/courseData.js';
import { MENTORS } from '../src/data/mentorData.js';
import { ACHIEVEMENTS } from '../src/data/achievementsData.js';
import { CATEGORIES, INITIAL_LEADERBOARD } from '../src/data/leaderboardData.js';
import { FeedbackEngine } from '../src/feedback/feedbackEngine.js';

console.log('🎬 Starting Cinema Kalalayam™ Automated Smoke Test Suite...\n');

// 1. Test Hero Artwork Asset
console.log('▶ Test 1: Validating Uploaded Hero Artwork Asset...');
const heroAssetPath = './assets/cinema_kalalayam_hero.jpg';
assert.ok(fs.existsSync(heroAssetPath), `Hero asset must exist at ${heroAssetPath}`);
const stats = fs.statSync(heroAssetPath);
assert.ok(stats.size > 100000, 'Hero asset must be a valid high-res image (>100KB)');
console.log(`✓ Test 1 Passed: Hero poster found (${Math.round(stats.size / 1024)} KB).`);

// 2. Test Courses (6 courses)
console.log('▶ Test 2: Validating 6 Courses Dataset...');
assert.strictEqual(COURSES.length, 6, 'Should have exactly 6 courses');
const expectedCourseIds = ['hero-walk-101', 'cinematic-dance', 'hand-gesture-science', 'villain-stare', 'dialogue-delivery', 'dramatic-reaction'];
expectedCourseIds.forEach(id => {
  const c = COURSES.find(item => item.id === id);
  assert.ok(c, `Course ${id} should exist`);
  assert.ok(c.title && c.title.length > 0, `Course ${id} should have a title`);
  assert.ok(c.difficulty, `Course ${id} should have difficulty`);
  assert.ok(c.levels && c.levels.length >= 3, `Course ${id} should have at least 3 levels`);
  assert.ok(c.kinematicRules && c.kinematicRules.length >= 1, `Course ${id} should have kinematic rules`);
});
console.log('✓ Test 2 Passed: All 6 courses verified.');

// 3. Test Mentors
console.log('▶ Test 3: Validating Mentors Dataset...');
assert.strictEqual(MENTORS.length, 5, 'Should have exactly 5 mentors');
const expectedMentorIds = ['sasi-master', 'subhash-pillai', 'guru-kunjumon', 'colonel-vincent', 'balan-menon'];
expectedMentorIds.forEach(id => {
  const m = MENTORS.find(item => item.id === id);
  assert.ok(m, `Mentor ${id} should exist`);
  assert.ok(m.name && m.title, `Mentor ${id} should have name and title`);
  assert.ok(m.speciality, `Mentor ${id} should have speciality`);
  assert.ok(m.personality, `Mentor ${id} should have personality`);
  assert.ok(m.quote, `Mentor ${id} should have quote`);
  assert.ok(typeof m.drama === 'number' && m.drama > 0, `Mentor ${id} should have drama stat`);
  assert.ok(typeof m.mass === 'number' && m.mass > 0, `Mentor ${id} should have mass stat`);
});
console.log('✓ Test 3 Passed: All 5 mentors verified.');

// 4. Test Achievements & Leaderboard
console.log('▶ Test 4: Validating Achievements & Leaderboard...');
assert.ok(ACHIEVEMENTS.length >= 6, 'Should have at least 6 achievements');
assert.strictEqual(CATEGORIES.length, 6, 'Should have 6 leaderboard categories');
console.log('✓ Test 4 Passed: Achievements & Leaderboard verified.');

// 5. Test AI Feedback Engine
console.log('▶ Test 5: Validating AI Feedback Engine Across Score Thresholds...');
const testScores = [
  { score: 42, expectedTier: 'poor' },
  { score: 68, expectedTier: 'average' },
  { score: 88, expectedTier: 'good' },
  { score: 98, expectedTier: 'excellent' }
];

testScores.forEach(({ score, expectedTier }) => {
  const scoreData = {
    overall: score,
    accuracy: score,
    timing: score,
    drama: score,
    style: score,
    mass: score
  };
  const v = FeedbackEngine.generateVerdict(scoreData, 'sasi-master', 'cinematic-dance');
  assert.strictEqual(v.tier, expectedTier, `Score ${score} should produce tier ${expectedTier}`);
  assert.ok(v.quote.length > 0, 'Verdict must contain quote');
  assert.ok(v.translation.length > 0, 'Verdict must contain translation');
});
console.log('✓ Test 5 Passed: AI Feedback Engine verified.');

console.log('\n🎉 ALL SMOKE TESTS PASSED SUCCESSFULLY!');
console.log('“Skill padikkam. Cinema aakkam.”');
