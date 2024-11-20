import fs from 'fs';

const keywords = {
  'agar': 'if',
  'nahi_to': 'else',
  'jabtak': 'while',
  'likho': 'print',
  'rakho': 'let',
  'sach': 'true',
  'jhoot': 'false',
  'khatam': 'return'
};

export class HinglishInterpreter {
  constructor() {
    this.variables = {};
    this.output = [];
    this.console = console;
  }

  tokenize(code) {
    return code.split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'));
  }

  evaluate(line) {
    if (line.startsWith('likho')) {
      const value = line.slice(6).trim();
      const evaluated = this.evaluateExpression(value);
      this.output.push(evaluated);
      this.console.log(evaluated);
      return evaluated;
    }

    if (line.startsWith('rakho')) {
      const [_, varName, value] = line.match(/rakho\s+(\w+)\s+=\s+(.+)/);
      this.variables[varName] = this.evaluateExpression(value);
      return this.variables[varName];
    }
  }

  evaluateExpression(expr) {
    // Handle string literals
    if (expr.startsWith('"') && expr.endsWith('"')) {
      return expr.slice(1, -1);
    }

    // Handle numbers
    if (!isNaN(expr)) {
      return Number(expr);
    }

    // Handle variables
    if (this.variables[expr] !== undefined) {
      return this.variables[expr];
    }

    // Handle boolean literals
    if (expr === 'sach') return true;
    if (expr === 'jhoot') return false;

    return expr;
  }

  run(code) {
    const lines = this.tokenize(code);
    this.output = [];
    for (const line of lines) {
      this.evaluate(line);
    }
    return this.output;
  }

  getVariable(name) {
    return this.variables[name];
  }
}