// // Maria plays college basketball and wants to go pro. Each season she maintains a record of her play. She tabulates the number of times she breaks her season record for most points and least points in a game. Points scored in the first game establish her record for the season, and she begins counting from there.

// // Example

// // Scores are in the same order as the games played. She tabulates her results as follows:
// // Given the scores for a season, determine the number of times Maria breaks her records for most and least points scored during the season.

// // Function Description

// // Complete the breakingRecords function in the editor below.

// // breakingRecords has the following parameter(s):

// // int scores[n]: points scored per game
// // Returns

// // int[2]: An array with the numbers of times she broke her records. Index  is for breaking most points records, and index  is for breaking least points records.
// // Input Format

// // The first line contains an integer , the number of games.
// // The second line contains  space-separated integers describing the respective values of .

// function breakingRecords(scores) {
//   // Write your code here

//   let breakingMostPoint = [];
//   let breakingLeastPoints = [];

// //   let lowestPoint = 0

// //   scores.map((num, index) => {

// //     // lowestPoint = scores[0];

// //     if (index > 0) {

// //       let res =
// //         num > scores[index - 1] &&
// //         (breakingMostPoint.length < 1 ||
// //           num > breakingMostPoint[breakingMostPoint.length - 1])
// //           ? breakingMostPoint.push(num)
// //           : num < scores[index - 1] && lowestPoint > num
// //           ? (lowestPoint = num) & breakingLeastPoints.push(num): ""
// //         }
// //     });
// //     console.log(lowestPoint);

// // console.log(breakingMostPoint, breakingLeastPoints);

// //   return [breakingMostPoint.length, breakingLeastPoints.length];
// // }

// // console.log(breakingRecords([17, 45, 41, 60, 17, 41, 76, 41, 60, 17, 41, 76, 43, 51, 40, 89, 92, 34, 6, 64, 7, 37, 81, 32, 50]));
// // // console.log(breakingRecords([10, 5, 20, 21 36 10 28 35 5 24 42]));

// "use strict";

// const fs = require("fs");

// process.stdin.resume();
// process.stdin.setEncoding("utf-8");

// let inputString = "";
// let currentLine = 0;

// process.stdin.on("data", function (inputStdin) {
//   inputString += inputStdin;
// });

// process.stdin.on("end", function () {
//   inputString = inputString.split("\n");

//   main();
// });

// function readLine() {
//   return inputString[currentLine++];
// }

/*
 * Complete the 'authEvents' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_STRING_ARRAY events as parameter.
 */

function authEvents(events) {
  // Write your code here

  let currentPassword;

  for (let i = 0; i < events.length; i++) {
    if (events[i][0] === "setPassword") {
      const setPasswordArr = [...events[i][1]];

      const res =
        setPasswordArr
          .map(
            (letter, index) =>
              letter.charCodeAt(0) * 131 ** (setPasswordArr.length - 1 - index)
          )
          .reduce((acc, curr) => acc + curr) %
        (1e9 + 7);
      currentPassword = res;
    }

    if (events[i][0] === "authorize") {
      if (
        events[i][1] === currentPassword ||
        String.fromCharCode(events[i][1] - currentPassword) ||
        events[i][1] - currentPassword > 9
      ) {
        console.log(1);

        console.log(
          currentPassword,
          events[i][1],
          String.fromCharCode(
            events[i][1] - currentPassword,
            +events[i][1] - +currentPassword
          ),
          events[i][1] - currentPassword
        );
      }
    } else {
      console.log(0);
    }
  }
}

console.log(
  authEvents([
    ["setPassword", "000A"],
    ["authorize", 108738450],
    ["authorize", 108738449],
    ["authorize", 244736787]
  ])
);

// function main() {
//     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

//     const eventsRows = parseInt(readLine().trim(), 10);

//     const eventsColumns = parseInt(readLine().trim(), 10);

//     let events = Array(eventsRows);

//     for (let i = 0; i < eventsRows; i++) {
//         events[i] = readLine().replace(/\s+$/g, '').split(' ');
//     }

//     const result = authEvents(events);

//     ws.write(result.join('\n') + '\n');

//     ws.end();
// }
