#!/usr/bin/env node

// used npm commander library to automatically parse arguments, validate input, handle defaults, and generate a help message.
const { program } = require('commander');  
const arguments = process.argv.slice(2);

// Help message explaining how to use the application and its flags
function printHelpMessage() {
    console.log(`\nUsage: Password-Generator
                         --help, -h             Display this help message
                         --length <number>      The length of the password; (node index.js) will give 8 lowercase and 
                                                (node index.js --length (n))
                         --numbers              Include numbers in the password
                         --symbols              Include symbols in the password
                         --uppercase            Include uppercase letters in the password;`)
}


// Generating a password consisting of default lowercase letters
function generatePassword(length, options) {
    let validOptions = 'abcdefghijklmnopqrstuvwxyz';  // default lowercase
    if (options.uppercase) validOptions += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // adding uppercase
    if (options.numbers) validOptions += '0123456789'; // adding numbers
    if (options.symbols) validOptions += '!@#$%^&*()_+[]{}|;:,.<>?'; // adding symbols
    let generatedPassword = '';
  

    // this will generate a random number based on the length and given specification within the valid options    
    for (let i = 0; i < length; i++) {                                          
        const randomPass = Math.floor(Math.random() * validOptions.length);
        generatedPassword += validOptions[randomPass];
        
    }
    return generatedPassword;
    
}

// CLI options with Commander.js that specifies all the options that inclues the program
program
    .option('--length <number>', 'Specify the length of the password', 8) // default value is 8
    .option('--uppercase', 'Include uppercase letters in the password')
    .option('--numbers', 'Include numbers in the password')
    .option('--symbols', 'Include symbols in the password')
    .option('--help, -h', 'Include symbols in the password')
    .parse(process.argv);
    

// Retrieval parsed options
const options = program.opts();
const length = options.length;

// Handle --help or -h specifically
if (options.help) {
    printHelpMessage();
    process.exit(0); // Exit without error
} 


if (isNaN(length) || length < 8 ) {
    // If length is not a valid number or is less than 8, show an error message
    console.error("Error: Invalid length. Please provide a positive number for the length of the password.");
    printHelpMessage();
    process.exit(1); // Exit the program with an error status
} else {  
    // Generate and print the password with usage message
    printHelpMessage();
    console.log(`Generated Password: ${generatePassword(length, options)}`);
}
