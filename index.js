#!/usr/bin/env node

// used npm commander library to automatically parse arguments, validate input, handle defaults, and generate a help message.
const { program } = require('commander');  
const arguments = process.argv.slice(2);

// Help message explaining how to use the application and its flags
function printHelpMessage() {
    console.log(`\nUsage: Password-Generator
                         --help, -h             Display this help message
                         --length <number>      The length of the password; (node index.js) will give 8 and (node index.js --length (n))
                         --numbers              Include numbers in the password
                         --symbols              Include symbols in the password
                         --uppercase            Include uppercase letters in the password
                         --lowercase            Include lowercase letters in the password);`);
}



// Generating a password consisting of lowercase letters
function generatePassword(length) {
    const validOptions = 'abcdefghijklmnopqrstuvwxyz';
    let generatedPassword = '';
  
    for (let i = 0; i < length; i++) {
        const randomPass = Math.floor(Math.random() * validOptions.length);
        generatedPassword += validOptions[randomPass];
        
    }
    return generatedPassword;
    
}

// CLI options with Commander.js
program
    .option('--length <number>', 'Specify the length of the password', 8) // default value is 8
    
    .parse(process.argv);
    



// Retrieval parsed options
const options = program.opts();
const length = options.length;




// Check if the user has entered a help flag
 if(process.argv.length < 2 ) {
    // If no arguments are provided, show the help message
    printHelpMessage();
} else if (isNaN(length) || length < 8 ) {
    // If length is not a valid number or is less than or equal to 0, show an error message
    console.error("Error: Invalid length. Please provide a positive number for the length of the password.");
    printHelpMessage();
    process.exit(1); // Exit the program with an error status
} else {  
    // Generate and print the password
    console.log(`Generated Password: ${generatePassword(length)}`);
}
