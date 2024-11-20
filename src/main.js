import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { HinglishInterpreter } from './interpreter.js';

// Initialize CodeMirror editor
let editor = new EditorView({
  extensions: [basicSetup, javascript(), oneDark],
  parent: document.querySelector('#editor')
});

// Set initial content
editor.dispatch({
  changes: {
    from: 0,
    to: editor.state.doc.length,
    insert: `# Ye hai demo program
rakho naam = "Raj"
rakho umar = 25
likho "Namaste"
likho naam
likho umar`
  }
});

// Initialize interpreter
const interpreter = new HinglishInterpreter();

// Setup output handling
const output = document.querySelector('#output');
interpreter.console = {
  log: (...args) => {
    output.textContent += args.join(' ') + '\n';
  }
};

// Run button handler
document.querySelector('#runButton').addEventListener('click', () => {
  output.textContent = ''; // Clear previous output
  const code = editor.state.doc.toString();
  interpreter.run(code);
});