#!/usr/bin/env node
import fs from 'fs';
import { HinglishInterpreter } from './interpreter.js';

const interpreter = new HinglishInterpreter();

// If a file is provided as argument, run it
if (process.argv[2]) {
  const code = fs.readFileSync(process.argv[2], 'utf-8');
  interpreter.run(code);
} else {
  // Run demo code if no file provided
  const demoCode = `# Ye hai demo program
rakho naam = "Raj"
rakho umar = 25
likho "Namaste"
likho naam
likho umar`;

  interpreter.run(demoCode);
}