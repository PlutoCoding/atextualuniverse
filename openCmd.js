const { exec } = require('child_process');
const readline = require('readline');

// Function to execute another JS file
function runJSFile(fileName) {
    exec(`node ${fileName}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`Output:\n${stdout}`);
    });
}

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'COMMAND> '
});

// Display prompt and handle user input
rl.prompt();

rl.on('line', (line) => {
    const command = line.trim();

    if (command === 'exit') {
        console.log('Exiting...');
        rl.close();
        return;
    }

    if (command.startsWith('run ')) {
        const fileName = command.split(' ')[1]; // Get the file name after 'run'
        if (fileName) {
            runJSFile(fileName);
        } else {
            console.log('Please specify a JavaScript file to run.');
        }
    } else {
        console.log(`Unknown command: ${command}`);
    }

    rl.prompt();
}).on('close', () => {
    console.log('Command Prompt closed.');
    process.exit(0);
});
