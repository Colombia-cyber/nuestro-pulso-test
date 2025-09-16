// Simple unit tests for Universal Search functionality
// These tests can be run with basic Node.js without additional testing infrastructure

import { getSearchResults, fallbackSearchData, generateDynamicResults } from '../data/searchFallbackData.js';

// Simple test runner
function runTests() {
  console.log('🧪 Running Universal Search Tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  function test(name: string, testFn: () => void) {
    try {
      testFn();
      console.log(`✅ ${name}`);
      passed++;
    } catch (error) {
      console.log(`❌ ${name}: ${error.message}`);
      failed++;
    }
  }
  
  function expect(actual: any) {
    return {
      toBe: (expected: any) => {
        if (actual !== expected) {
          throw new Error(`Expected ${expected}, got ${actual}`);
        }
      },
      toBeGreaterThan: (expected: number) => {
        if (actual <= expected) {
          throw new Error(`Expected ${actual} to be greater than ${expected}`);
        }
      },
      toHaveLength: (expected: number) => {
        if (!actual || actual.length !== expected) {
          throw new Error(`Expected length ${expected}, got ${actual ? actual.length : 'undefined'}`);
        }
      },
      toContain: (expected: any) => {
        if (!actual || !actual.includes(expected)) {
          throw new Error(`Expected "${actual}" to contain "${expected}"`);
        }
      },
      toHaveProperty: (expected: string) => {
        if (!actual || !(expected in actual)) {
          throw new Error(`Expected object to have property "${expected}"`);
        }
      }
    };
  }

  // Test Facebook search results
  test('Facebook search returns multiple results', () => {
    const results = getSearchResults('Facebook');
    expect(results.length).toBeGreaterThan(5);
    expect(results[0].title).toContain('Facebook');
  });

  // Test Trump search results  
  test('Trump search returns relevant results', () => {
    const results = getSearchResults('Trump');
    expect(results.length).toBeGreaterThan(5);
    expect(results[0].title).toContain('Trump');
  });

  // Test technology search
  test('Technology search returns targeted results', () => {
    const results = getSearchResults('tecnología');
    expect(results.length).toBeGreaterThan(3);
  });

  // Test dynamic result generation
  test('Dynamic results generated for unknown queries', () => {
    const results = getSearchResults('unknown_topic_xyz');
    expect(results).toHaveLength(25);
    expect(results[0].title).toContain('unknown_topic_xyz');
  });

  // Test result structure
  test('Results have proper structure', () => {
    const results = getSearchResults('Facebook');
    const result = results[0];
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('title');
    expect(result).toHaveProperty('summary');
    expect(result).toHaveProperty('source');
    expect(result).toHaveProperty('category');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('relevanceScore');
    expect(result).toHaveProperty('link');
  });

  // Test generateDynamicResults function
  test('Generate dynamic results with custom count', () => {
    const results = generateDynamicResults('test', 10);
    expect(results).toHaveLength(10);
  });

  // Test fallback data structure
  test('Fallback data has required categories', () => {
    expect(fallbackSearchData).toHaveProperty('facebook');
    expect(fallbackSearchData).toHaveProperty('trump');
    expect(fallbackSearchData).toHaveProperty('tecnología');
  });

  // Test empty query handling
  test('Empty query still returns results', () => {
    const results = getSearchResults('');
    expect(results.length).toBeGreaterThan(0);
  });

  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('🎉 All tests passed!');
  } else {
    console.log('⚠️  Some tests failed. Check the implementation.');
  }
  
  return { passed, failed };
}

// Export for use in build process or manual testing
export { runTests };

// Auto-run if this file is executed directly
if (typeof window === 'undefined' && typeof process !== 'undefined') {
  // Running in Node.js environment
  runTests();
}