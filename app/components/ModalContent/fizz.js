// Maria plays college basketball and wants to go pro. Each season she maintains a record of her play. She tabulates the number of times she breaks her season record for most points and least points in a game. Points scored in the first game establish her record for the season, and she begins counting from there.

// Example

// Scores are in the same order as the games played. She tabulates her results as follows:
// Given the scores for a season, determine the number of times Maria breaks her records for most and least points scored during the season.

// Function Description

// Complete the breakingRecords function in the editor below.

// breakingRecords has the following parameter(s):

// int scores[n]: points scored per game
// Returns

// int[2]: An array with the numbers of times she broke her records. Index  is for breaking most points records, and index  is for breaking least points records.
// Input Format

// The first line contains an integer , the number of games.
// The second line contains  space-separated integers describing the respective values of .

function breakingRecords(scores) {
  // Write your code here

  let breakingMostPoint = [];
  let breakingLeastPoints = [];

  scores.map((num, index) => {
    if (index > 0) {
      let res =
        num > scores[index - 1] &&
        (breakingMostPoint.length < 1 ||
          num > breakingMostPoint[breakingMostPoint.length - 1])
          ? breakingMostPoint.push(num)
          : num < scores[index - 1] && breakingLeastPoints.push(num);
    }
  });

  console.log(breakingMostPoint, breakingLeastPoints);

  return [breakingMostPoint.length, breakingLeastPoints.length];
}

console.log(breakingRecords([3, 4, 21, 36, 10, 28, 35, 5, 24, 42]));
// console.log(breakingRecords([10, 5, 20, 21 36 10 28 35 5 24 42]));
