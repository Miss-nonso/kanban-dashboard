function processData(input) {
  //Enter your code here

  const inputArr = input.trim().split(';');

  if (inputArr[0] === 'S') {
    const idxArr = [0];
    const justLetters =
      inputArr[1] === 'M' ? inputArr[2].slice(0, inputArr[2].length - 2) : inputArr[2];
    justLetters.split('').forEach((val, index) => val === val.toUpperCase() && idxArr.push(index));

    const refLetters = idxArr
      .map((num, index) => justLetters.slice(num, idxArr[index + 1]).toLowerCase())
      .join(' ')
      .trim();

    return refLetters;
  }

  if (inputArr[0] === 'C') {
    const splitWords = inputArr[2].split(' ');
    const joinedWords = splitWords
      .map((word, index) =>
        inputArr[1] === 'C'
          ? word[0].toUpperCase() + word.slice(1)
          : index > 0
            ? word[0].toUpperCase() + word.slice(1)
            : word
      )
      .join('');

    return inputArr[1] === 'M' ? joinedWords + '()' : joinedWords;
  }
}

console.log(processData('S;M;plasticCup()'));
console.log(processData('S;V;pictureFrame'));
console.log(processData('S;C;LargeSoftwareBook'));
console.log(processData('C;V;mobile phone'));
console.log(processData('C;C;coffee machine'));
console.log(processData('C;M;white sheet of paper'));
console.log(processData('S;V;iPad'));
console.log(processData('C;M;mouse pad'));
console.log(processData('C;C;code swarm'));
console.log(processData('S;C;OrangeHighlighter'));

// Sample Input***********

// S;M;plasticCup()

// C;V;mobile phone

// C;C;coffee machine

// S;C;LargeSoftwareBook

// C;M;white sheet of paper

// S;V;pictureFrame

// Sample Output*************

// plastic cup

// mobilePhone

// CoffeeMachine

// large software book

// whiteSheetOfPaper()

// picture frame
