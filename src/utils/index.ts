export function randomFromInterval(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function getEggShapePoints(a: number, b: number, k: number, segment_points: number): number[][] {
    // the function is x^2/a^2 * (1 + ky) + y^2/b^2 = 1
    const result: number[][] = [];
    //   var pointString = "";
    for (var i = 0; i < segment_points; i++) {
      // x positive, y positive
      // first compute the degree
      var degree =
        (Math.PI / 2 / segment_points) * i +
        randomFromInterval(
          -Math.PI / 1.1 / segment_points,
          Math.PI / 1.1 / segment_points
        );
      var y = Math.sin(degree) * b;
      var x =
        Math.sqrt(((1 - (y * y) / (b * b)) / (1 + k * y)) * a * a) +
        randomFromInterval(-a / 200.0, a / 200.0);
      // pointString += x + "," + y + " ";
      result.push([x, y]);
    }
    for (var i = segment_points; i > 0; i--) {
      // x is negative, y is positive
      var degree =
        (Math.PI / 2 / segment_points) * i +
        randomFromInterval(
          -Math.PI / 1.1 / segment_points,
          Math.PI / 1.1 / segment_points
        );
      var y = Math.sin(degree) * b;
      var x =
        -Math.sqrt(((1 - (y * y) / (b * b)) / (1 + k * y)) * a * a) +
        randomFromInterval(-a / 200.0, a / 200.0);
      // pointString += x + "," + y + " ";
      result.push([x, y]);
    }
    for (var i = 0; i < segment_points; i++) {
      // x is negative, y is negative
      var degree =
        (Math.PI / 2 / segment_points) * i +
        randomFromInterval(
          -Math.PI / 1.1 / segment_points,
          Math.PI / 1.1 / segment_points
        );
      var y = -Math.sin(degree) * b;
      var x =
        -Math.sqrt(((1 - (y * y) / (b * b)) / (1 + k * y)) * a * a) +
        randomFromInterval(-a / 200.0, a / 200.0);
      // pointString += x + "," + y + " ";
      result.push([x, y]);
    }
    for (var i = segment_points; i > 0; i--) {
      // x is positive, y is negative
      var degree =
        (Math.PI / 2 / segment_points) * i +
        randomFromInterval(
          -Math.PI / 1.1 / segment_points,
          Math.PI / 1.1 / segment_points
        );
      var y = -Math.sin(degree) * b;
      var x =
        Math.sqrt(((1 - (y * y) / (b * b)) / (1 + k * y)) * a * a) +
        randomFromInterval(-a / 200.0, a / 200.0);
      // pointString += x + "," + y + " ";
      result.push([x, y]);
    }
    return result;
}

export function cubicBezier(P0: number[], P1: number[], P2: number[], P3: number[], t: number) {
    const x = (1 - t) ** 3 * P0[0] + 3 * (1 - t) ** 2 * t * P1[0] + 3 * (1 - t) * t ** 2 * P2[0] + t ** 3 * P3[0];
    const y = (1 - t) ** 3 * P0[1] + 3 * (1 - t) ** 2 * t * P1[1] + 3 * (1 - t) * t ** 2 * P2[1] + t ** 3 * P3[1];
    return [x, y];
}