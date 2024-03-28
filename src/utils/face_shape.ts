import { randomFromInterval, getEggShapePoints } from "./";

export function generateFaceCountourPoints(numPoints = 100) {
  var faceSizeX0 = randomFromInterval(50, 100);
  var faceSizeY0 = randomFromInterval(70, 100);

  var faceSizeY1 = randomFromInterval(50, 80);
  var faceSizeX1 = randomFromInterval(70, 100);
  var faceK0 = randomFromInterval(0.001, 0.005) * (Math.random() > 0.5 ? 1 : -1);
  var faceK1 = randomFromInterval(0.001, 0.005) * (Math.random() > 0.5 ? 1 : -1);
  var face0TranslateX = randomFromInterval(-5, 5);
  var face0TranslateY = randomFromInterval(-15, 15);

  var face1TranslateY = randomFromInterval(-5, 5);
  var face1TranslateX = randomFromInterval(-5, 25);
  var results0 = getEggShapePoints(faceSizeX0, faceSizeY0, faceK0, numPoints);
  var results1 = getEggShapePoints(faceSizeX1, faceSizeY1, faceK1, numPoints);
  for (var i = 0; i < results0.length; i++) {
    results0[i][0] += face0TranslateX;
    results0[i][1] += face0TranslateY;
    results1[i][0] += face1TranslateX;
    results1[i][1] += face1TranslateY;
  }
  var results: number[][] = [];
  let center = [0, 0]
  for (var i = 0; i < results0.length; i++) {
    results.push([(results0[i][0]) * 0.5 + (results1[(i + results0.length / 4) % results0.length][1]) * 0.5, (results0[i][1]) * 0.5 - (results1[(i + results0.length / 4) % results0.length][0]) * 0.5]);
    center[0] += results[i][0];
    center[1] += results[i][1];
  }
  center[0] /= results.length;
  center[1] /= results.length;
  // center the face
  for (var i = 0; i < results.length; i++) {
    results[i][0] -= center[0];
    results[i][1] -= center[1];
  }

  let width = results[0][0] - results[results.length / 2][0];
  let height = results[results.length / 4][1] - results[results.length * 3 / 4][1];
  // add the first point to the end to close the shape
  results.push(results[0]);
  results.push(results[1]);
  return { face: results, width: width, height: height, center: [0, 0] };
}