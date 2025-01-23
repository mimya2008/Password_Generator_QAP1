#!/usr/bin/env node

// used npm commander library to automatically parse arguments, validate input, handle defaults, and generate a help message.
const { program } = require('commander');  


// Help message explaining how to use the application and its flags
function printHelpMessage() {
    console.log(`\nUsage: Password-Generator
                         --help, -h, help       Display this help message
                         --length <number>      Specify the length of the password (default: 8)
                         --numbers              Include numbers in the password
                         --symbols              Include symbols in the password
                         --uppercase            Include uppercase letters in the password
                         --lowercase            Include lowercase letters in the password);`);
}

// Generating a password consisting of lowercase letters
function generatePassword(length = 8) {
    const validOptions = 'abcdefghijklmnopqrstuvwxyz';
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * validOptions.length);
        generatedPassword += validOptions[randomIndex];
    }
    return generatedPassword;
}

// CLI options with Commander.js
program
    .option('--length <number>', 'Specify the length of the password (default: 8)', '8');

// Parsing the CLI arguments
program.parse(process.argv);

// Retrieval parsed options
const options = program.opts();
const length = parseInt(options.length, 10) || 8;

// If no arguments are passed, display the help message
if (process.argv.length <= 2) {
    printHelpMessage(); // displays the help message
} else {
    // Generate and print the password
    console.log(`Generated Password: ${generatePassword(length)}`);
}

