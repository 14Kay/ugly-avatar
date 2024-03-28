import { randomFromInterval, getEggShapePoints, cubicBezier } from "./";

export function generateMouthShape0(faceCountour: number[][], faceHeight: number, faceWidth: number) {
    // the first one is a a big smile U shape
    var faceCountourCopy = faceCountour.slice(0, faceCountour.length - 2);
    // choose one point on face at bottom side
    var mouthRightY = randomFromInterval(faceHeight / 7, faceHeight / 3.5)
    var mouthLeftY = randomFromInterval(faceHeight / 7, faceHeight / 3.5)
    var mouthRightX = randomFromInterval(faceWidth / 10, faceWidth / 2)
    var mouthLeftX = -mouthRightX + randomFromInterval(-faceWidth / 20, faceWidth / 20)
    var mouthRight = [mouthRightX, mouthRightY]
    var mouthLeft = [mouthLeftX, mouthLeftY]

    var controlPoint0 = [randomFromInterval(0, mouthRightX), randomFromInterval(mouthLeftY + 5, faceHeight / 1.5)]
    var controlPoint1 = [randomFromInterval(mouthLeftX, 0), randomFromInterval(mouthLeftY + 5, faceHeight / 1.5)]

    var mouthPoints: number[][] = []
    for (var i = 0; i < 1; i += 0.01) {
        mouthPoints.push(cubicBezier(mouthLeft, controlPoint1, controlPoint0, mouthRight, i))
    }
    if (Math.random() > 0.5) {
        for (var i = 0; i < 1; i += 0.01) {
            mouthPoints.push(cubicBezier(mouthRight, controlPoint0, controlPoint1, mouthLeft, i))
        }
    }else{
        var y_offset_portion = randomFromInterval(0, 0.8);
        for (var i = 0; i < 100; i += 1) {
            mouthPoints.push([mouthPoints[99][0] * (1 - i / 100.0) + mouthPoints[0][0] * i / 100.0, (mouthPoints[99][1] * (1 - i / 100.0) + mouthPoints[0][1] * i / 100.0) * (1 - y_offset_portion) + mouthPoints[99 - i][1] * y_offset_portion])
        }
    }
    return mouthPoints;
}

export function generateMouthShape1(faceCountour: number[][], faceHeight: number, faceWidth: number) {
    // the first one is a a big smile U shape
    var faceCountourCopy = faceCountour.slice(0, faceCountour.length - 2);
    // choose one point on face at bottom side
    var mouthRightY = randomFromInterval(faceHeight / 7, faceHeight / 4)
    var mouthLeftY = randomFromInterval(faceHeight / 7, faceHeight / 4)
    var mouthRightX = randomFromInterval(faceWidth / 10, faceWidth / 2)
    var mouthLeftX = -mouthRightX + randomFromInterval(-faceWidth / 20, faceWidth / 20)
    var mouthRight = [mouthRightX, mouthRightY]
    var mouthLeft = [mouthLeftX, mouthLeftY]

    var controlPoint0 = [randomFromInterval(0, mouthRightX), randomFromInterval(mouthLeftY + 5, faceHeight / 1.5)]
    var controlPoint1 = [randomFromInterval(mouthLeftX, 0), randomFromInterval(mouthLeftY + 5, faceHeight / 1.5)]

    var mouthPoints: number[][] = []
    for (var i = 0; i < 1; i += 0.01) {
        mouthPoints.push(cubicBezier(mouthLeft, controlPoint1, controlPoint0, mouthRight, i))
    }

    var center = [(mouthRight[0] + mouthLeft[0]) / 2, mouthPoints[25][1] / 2 + mouthPoints[75][1] / 2];
    if (Math.random() > 0.5) {
        for (var i = 0; i < 1; i += 0.01) {
            mouthPoints.push(cubicBezier(mouthRight, controlPoint0, controlPoint1, mouthLeft, i))
        }
    }else{
        var y_offset_portion = randomFromInterval(0, 0.8);
        for (var i = 0; i < 100; i += 1) {
            mouthPoints.push([mouthPoints[99][0] * (1 - i / 100.0) + mouthPoints[0][0] * i / 100.0, (mouthPoints[99][1] * (1 - i / 100.0) + mouthPoints[0][1] * i / 100.0) * (1 - y_offset_portion) + mouthPoints[99 - i][1] * y_offset_portion])
        }
    }
    // translate to center
    for (var i = 0; i < mouthPoints.length; i++) {
        mouthPoints[i][0] -= center[0]
        mouthPoints[i][1] -= center[1]
        // rotate 180 degree
        mouthPoints[i][1] = -mouthPoints[i][1]
        // scale smaller
        mouthPoints[i][0] = mouthPoints[i][0] * 0.6
        mouthPoints[i][1] = mouthPoints[i][1] * 0.6
        // translate back
        mouthPoints[i][0] += center[0]
        mouthPoints[i][1] += center[1] * 0.8
    }
    return mouthPoints;
}

export function generateMouthShape2(faceCountour: number[][], faceHeight: number, faceWidth: number) {
    // generate a random center
    var center = [randomFromInterval(-faceWidth / 8, faceWidth / 8), randomFromInterval(faceHeight / 4, faceHeight / 2.5)]

    var mouthPoints = getEggShapePoints(randomFromInterval(faceWidth / 4, faceWidth / 10), randomFromInterval(faceHeight / 10, faceHeight / 20), 0.001, 50);
    var randomRotationDegree = randomFromInterval(-Math.PI / 9.5, Math.PI / 9.5)
    for (var i = 0; i < mouthPoints.length; i++) {
        // rotate the point
        var x = mouthPoints[i][0]
        var y = mouthPoints[i][1]
        mouthPoints[i][0] = x * Math.cos(randomRotationDegree) - y * Math.sin(randomRotationDegree)
        mouthPoints[i][1] = x * Math.sin(randomRotationDegree) + y * Math.cos(randomRotationDegree)
        mouthPoints[i][0] += center[0]
        mouthPoints[i][1] += center[1]
    }
    return mouthPoints;
}