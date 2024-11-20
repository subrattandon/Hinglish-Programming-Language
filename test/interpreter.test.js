import { expect, test, describe } from 'vitest';
import { HinglishInterpreter } from '../src/interpreter.js';

describe('HinglishInterpreter', () => {
  test('should handle variable assignment and printing', () => {
    const interpreter = new HinglishInterpreter();
    const code = `
      rakho naam = "Raj"
      likho naam
    `;
    const output = interpreter.run(code);
    expect(output).toEqual(['Raj']);
    expect(interpreter.getVariable('naam')).toBe('Raj');
  });

  test('should handle number assignments', () => {
    const interpreter = new HinglishInterpreter();
    const code = `
      rakho umar = 25
      likho umar
    `;
    const output = interpreter.run(code);
    expect(output).toEqual([25]);
    expect(interpreter.getVariable('umar')).toBe(25);
  });

  test('should handle boolean values', () => {
    const interpreter = new HinglishInterpreter();
    const code = `
      rakho flag = sach
      rakho flag2 = jhoot
      likho flag
      likho flag2
    `;
    const output = interpreter.run(code);
    expect(output).toEqual([true, false]);
    expect(interpreter.getVariable('flag')).toBe(true);
    expect(interpreter.getVariable('flag2')).toBe(false);
  });

  test('should handle multiple variables and operations', () => {
    const interpreter = new HinglishInterpreter();
    const code = `
      rakho naam = "Raj"
      rakho umar = 25
      rakho active = sach
      likho naam
      likho umar
      likho active
    `;
    const output = interpreter.run(code);
    expect(output).toEqual(['Raj', 25, true]);
  });

  test('should ignore comments', () => {
    const interpreter = new HinglishInterpreter();
    const code = `
      # Ye ek comment hai
      rakho naam = "Raj"
      # Ye bhi comment hai
      likho naam
    `;
    const output = interpreter.run(code);
    expect(output).toEqual(['Raj']);
  });
});