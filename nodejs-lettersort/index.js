const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What letters do you want to have solved? ', (answer) => {
    var permutation = getPermutations(answer);
    console.log("Total permutation: " + permutation.length);
    console.log(permutation);
    rl.close();
});

function getPermutations(string) {
    var results = [];

    if (string.length === 1) {
        results.push(string);
        return results;
    }

    for (var i = 0; i < string.length; i++) {
        var firstChar = string[i];
        var otherChar = string.substring(0, i) + string.substring(i + 1);
        var otherPermutations = getPermutations(otherChar);

        for (var j = 0; j < otherPermutations.length; j++) {
            results.push(firstChar + otherPermutations[j]);
        }
    }
    return results;
}