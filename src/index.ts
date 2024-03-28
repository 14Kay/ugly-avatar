/*
 * @Description= Ugly Avatar Generator
 * @Author= 14K
 * @Date= 2024-03-28 14=28=24
 * @LastEditTime: 2024-03-28 17:29:38
 * @LastEditors: 14K
 */
import * as faceShape from "./utils/face_shape";
import * as eyeShape from "./utils/eye_shape";
import * as hairLines from "./utils/hair_lines";
import * as mouthShape from "./utils/mouth_shape";
import { randomFromInterval } from "./utils/index"

export class GenerateUglyAvatar {
    faceScale = 1.8 // face scale
    computedFacePoints: number[][] = [] // the polygon points for face countour
    eyeRightUpper: number[][] = [] // the points for right eye upper lid
    eyeRightLower: number[][] = []
    eyeRightCountour: number[][] = [] // for the white part of the eye
    eyeLeftUpper: number[][] = []
    eyeLeftLower: number[][] = []
    eyeLeftCountour: number[][] = []
    faceHeight = 0 // the height of the face
    faceWidth = 0 // the width of the face
    center = [0, 0] // the center of the face
    distanceBetweenEyes = 0 // the distance between the eyes
    leftEyeOffsetX = 0 // the offset of the left eye
    leftEyeOffsetY = 0 // the offset of the left eye
    rightEyeOffsetX = 0 // the offset of the right eye
    rightEyeOffsetY = 0 // the offset of the right eye
    eyeHeightOffset = 0 // the offset of the eye height
    leftEyeCenter = [0, 0] // the center of the left eye
    rightEyeCenter = [0, 0] // the center of the right eye
    rightPupilShiftX = 0 // the shift of the right pupil
    rightPupilShiftY = 0 // the shift of the right pupil
    leftPupilShiftX = 0 // the shift of the left pupil
    leftPupilShiftY = 0 // the shift of the left pupil
    rightNoseCenterX = 0 // the center of the right nose
    rightNoseCenterY = 0 // the center of the right nose
    leftNoseCenterX = 0 // the center of the left nose
    leftNoseCenterY = 0 // the center of the left nose
    hairs: number[][][] = []
    hairColors = [
        "rgb(0, 0, 0)", // Black
        "rgb(44, 34, 43)", // Dark Brown
        "rgb(80, 68, 68)", // Medium Brown
        "rgb(167, 133, 106)", // Light Brown
        "rgb(220, 208, 186)", // Blond
        "rgb(233, 236, 239)", // Platinum Blond
        "rgb(165, 42, 42)", // Red
        "rgb(145, 85, 61)", // Auburn
        "rgb(128, 128, 128)", // Grey
        "rgb(185, 55, 55)", // fire
        "rgb(255, 192, 203)", // Pastel Pink
        "rgb(255, 105, 180)", // Bright Pink
        "rgb(230, 230, 250)", // Lavender
        "rgb(64, 224, 208)", // Turquoise
        "rgb(0, 191, 255)", // Bright Blue
        "rgb(148, 0, 211)", // Deep Purple
        "rgb(50, 205, 50)", // Lime Green
        "rgb(255, 165, 0)", // Vivid Orange
        "rgb(220, 20, 60)", // Crimson Red
        "rgb(192, 192, 192)", // Silver
    ]
    hairColor = "black"
    dyeColorOffset = "50%"
    backgroundColors = [
        "rgb(245, 245, 220)", // Soft Beige
        "rgb(176, 224, 230)", // Pale Blue
        "rgb(211, 211, 211)", // Light Grey
        "rgb(152, 251, 152)", // Pastel Green
        "rgb(255, 253, 208)", // Cream
        "rgb(230, 230, 250)", // Muted Lavender
        "rgb(188, 143, 143)", // Dusty Rose
        "rgb(135, 206, 235)", // Sky Blue
        "rgb(245, 255, 250)", // Mint Cream
        "rgb(245, 222, 179)", // Wheat
        "rgb(47, 79, 79)", // Dark Slate Gray
        "rgb(72, 61, 139)", // Dark Slate Blue
        "rgb(60, 20, 20)", // Dark Brown
        "rgb(25, 25, 112)", // Midnight Blue
        "rgb(139, 0, 0)", // Dark Red
        "rgb(85, 107, 47)", // Olive Drab
        "rgb(128, 0, 128)", // Purple
        "rgb(0, 100, 0)", // Dark Green
        "rgb(0, 0, 139)", // Dark Blue
        "rgb(105, 105, 105)", // Dim Gray
    ]
    mouthPoints: number[][] = []

    pointNoseProbability: number = 0.5
    constructor(faceScale?: number, pointNoseProbability?: number) {
        this.faceScale = faceScale || 1.8;
        this.pointNoseProbability = pointNoseProbability || 0.5;
        if (this.pointNoseProbability > 1 || this.pointNoseProbability < 0) {
            this.pointNoseProbability = 0.5;
        }
    }

    generateFace() {
        let faceResults = faceShape.generateFaceCountourPoints();
        this.computedFacePoints = faceResults.face;
        this.faceHeight = faceResults.height;
        this.faceWidth = faceResults.width;
        this.center = faceResults.center;
        let eyes = eyeShape.generateBothEyes(this.faceWidth / 2);
        let left = eyes.left;
        let right = eyes.right;
        this.eyeRightUpper = right.upper;
        this.eyeRightLower = right.lower;
        this.eyeRightCountour = right.upper
            .slice(10, 90)
            .concat(right.lower.slice(10, 90).reverse());
        this.eyeLeftUpper = left.upper;
        this.eyeLeftLower = left.lower;
        this.eyeLeftCountour = left.upper
            .slice(10, 90)
            .concat(left.lower.slice(10, 90).reverse());
        this.distanceBetweenEyes = randomFromInterval(
            this.faceWidth / 4.5,
            this.faceWidth / 4
        );
        this.eyeHeightOffset = randomFromInterval(
            this.faceHeight / 8,
            this.faceHeight / 6
        );
        this.leftEyeOffsetX = randomFromInterval(
            -this.faceWidth / 20,
            this.faceWidth / 10
        );
        this.leftEyeOffsetY = randomFromInterval(
            -this.faceHeight / 50,
            this.faceHeight / 50
        );
        this.rightEyeOffsetX = randomFromInterval(
            -this.faceWidth / 20,
            this.faceWidth / 10
        );
        this.rightEyeOffsetY = randomFromInterval(
            -this.faceHeight / 50,
            this.faceHeight / 50
        );
        this.leftEyeCenter = left.center[0];
        this.rightEyeCenter = right.center[0];
        this.leftPupilShiftX = randomFromInterval(
            -this.faceWidth / 20,
            this.faceWidth / 20
        );

        // now we generate the pupil shifts
        // we first pick a point from the upper eye lid
        let leftInd0 = Math.floor(randomFromInterval(10, left.upper.length - 10));
        let rightInd0 = Math.floor(
            randomFromInterval(10, right.upper.length - 10)
        );
        let leftInd1 = Math.floor(randomFromInterval(10, left.upper.length - 10));
        let rightInd1 = Math.floor(
            randomFromInterval(10, right.upper.length - 10)
        );
        let leftLerp = randomFromInterval(0.2, 0.8);
        let rightLerp = randomFromInterval(0.2, 0.8);

        this.leftPupilShiftY =
            left.upper[leftInd0][1] * leftLerp +
            left.lower[leftInd1][1] * (1 - leftLerp);
        this.rightPupilShiftY =
            right.upper[rightInd0][1] * rightLerp +
            right.lower[rightInd1][1] * (1 - rightLerp);
        this.leftPupilShiftX =
            left.upper[leftInd0][0] * leftLerp +
            left.lower[leftInd1][0] * (1 - leftLerp);
        this.rightPupilShiftX =
            right.upper[rightInd0][0] * rightLerp +
            right.lower[rightInd1][0] * (1 - rightLerp);

        var numHairLines: any = [];
        var numHairMethods = 4;
        for (var i = 0; i < numHairMethods; i++) {
            numHairLines.push(Math.floor(randomFromInterval(0, 50)));
        }
        this.hairs = [];
        if (Math.random() > 0.3) {
            this.hairs = hairLines.generateHairLines0(
                this.computedFacePoints,
                numHairLines[0] * 1 + 10
            );
        }
        if (Math.random() > 0.3) {
            this.hairs = this.hairs.concat(
                hairLines.generateHairLines1(
                    this.computedFacePoints,
                    numHairLines[1] / 1.5 + 10
                )
            );
        }
        if (Math.random() > 0.5) {
            this.hairs = this.hairs.concat(
                hairLines.generateHairLines2(
                    this.computedFacePoints,
                    numHairLines[2] * 3 + 10
                )
            );
        }
        if (Math.random() > 0.5) {
            this.hairs = this.hairs.concat(
                hairLines.generateHairLines3(
                    this.computedFacePoints,
                    numHairLines[3] * 3 + 10
                )
            );
        }
        this.rightNoseCenterX = randomFromInterval(
            this.faceWidth / 18,
            this.faceWidth / 12
        );
        this.rightNoseCenterY = randomFromInterval(0, this.faceHeight / 5);
        this.leftNoseCenterX = randomFromInterval(
            -this.faceWidth / 18,
            -this.faceWidth / 12
        );
        this.leftNoseCenterY =
            this.rightNoseCenterY +
            randomFromInterval(-this.faceHeight / 30, this.faceHeight / 20);
        if (Math.random() > 0.1) {
            // use natural hair color
            this.hairColor = this.hairColors[Math.floor(Math.random() * 10)];
        } else {
            this.hairColor = "url(#rainbowGradient)";
            this.dyeColorOffset = randomFromInterval(0, 100) + "%";
        }

        var choice = Math.floor(Math.random() * 3);
        if (choice == 0) {
            this.mouthPoints = mouthShape.generateMouthShape0(
                this.computedFacePoints,
                this.faceHeight,
                this.faceWidth
            );
        } else if (choice == 1) {
            this.mouthPoints = mouthShape.generateMouthShape1(
                this.computedFacePoints,
                this.faceHeight,
                this.faceWidth
            );
        } else {
            this.mouthPoints = mouthShape.generateMouthShape2(
                this.computedFacePoints,
                this.faceHeight,
                this.faceWidth
            );
        }

        return this.getSVG()
    }

    getEyeCircles(x: number, y: number, name: string = "rightEyeClipPath") {
        let circles = '';
        for (var i = 1; i <= 10; i++) {
            circles += '<circle ' +
                'key="' + i + '" ' +
                'r="' + (Math.random() * 2 + 3.0) + '" ' +
                'cx="' + (x + Math.random() * 5 - 2.5) + '" ' +
                'cy="' + (y + Math.random() * 5 - 2.5) + '" ' +
                'stroke="black" ' +
                'fill="none" ' +
                'stroke-width="1.0" ' +
                'filter="url(#fuzzy)" ' +
                'clip-path="url(#' + name + ')"' +
                '/>';
        }

        return circles;
    }

    getHairsPolyline() {
        var polylines = '';
        for (var index = 0; index < this.hairs.length; index++) {
            polylines += '<polyline ' +
                'key="' + index + '" ' +
                'points="' + this.hairs[index] + '" ' +
                'fill="none" ' +
                'stroke="' + this.hairColor + '" ' +
                'stroke-width="2" ' +
                'stroke-linejoin="round" ' +
                'filter="url(#fuzzy)"' +
                '/>';
        }

        return polylines;
    }

    getNoseCircle(cx: number, cy: number) {
        let circles = '';
        for (var i = 1; i <= 10; i++) {
            circles += '<circle ' +
                'key="' + i + '" ' +
                'r="' + (Math.random() * 2 + 1.0) + '" ' +
                'cx="' + (cx + Math.random() * 4 - 2) + '" ' +
                'cy="' + (cy + Math.random() * 4 - 2) + '" ' +
                'stroke="black" ' +
                'fill="none" ' +
                'stroke-width="1.0" ' +
                'filter="url(#fuzzy)"' +
                '/>';
        }
        return circles;
    }

    getNosePath() {
        if (Math.random() > this.pointNoseProbability) {
            return `<g id="pointNose">
            <g id="rightNose">
              ${this.getNoseCircle(this.rightNoseCenterX, this.rightNoseCenterY)}
            </g>
            <g id="leftNose">
              ${this.getNoseCircle(this.leftNoseCenterX, this.leftNoseCenterY)}
            </g>
          </g>`
        } else {
            return `<g id="lineNose">
            <path
              d="M ${this.leftNoseCenterX} ${this.leftNoseCenterY}, Q${this.rightNoseCenterX} ${this.rightNoseCenterY * 1.5},${(this.leftNoseCenterX + this.rightNoseCenterX) / 2}) - ${this.eyeHeightOffset * 0.2}"
              fill="none"
              stroke="black"
              stroke-width="3"
              stroke-linejoin="round"
              filter="url(#fuzzy)"
            ></path>
          </g>`
        }
    }

    getSVG() {
        return `
        <svg
            viewBox="-100 -100 200 200"
            xmlns="http://www.w3.org/2000/svg"
            width="500"
            height="500"
            id="face-svg"
        >
        <defs>
          <clipPath id="leftEyeClipPath">
            <polyline points="${this.eyeLeftCountour}" />
          </clipPath>
          <clipPath id="rightEyeClipPath">
            <polyline points="${this.eyeRightCountour}" />
          </clipPath>
          <filter id="fuzzy">
            <feTurbulence
              id="turbulence"
              baseFrequency="0.05"
              numOctaves="3"
              type="noise"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
          <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style="stop-color: ${this.hairColors[Math.floor(Math.random() * 10)]};  stop-opacity: 1"
            />
            <stop
              offset="${this.dyeColorOffset}"
              style="stop-color:${this.hairColors[Math.floor(Math.random() * this.hairColors.length)]};  stop-opacity: 1 "
            />
            <stop
              offset="100%"
              style="stop-color:${this.hairColors[Math.floor(Math.random() * this.hairColors.length)]};  stop-opacity: 1 "
            />
          </linearGradient>
        </defs>
        <title>That's an ugly face</title>
        <desc>CREATED BY XUAN TANG, MORE INFO AT TXSTC55.GITHUB.IO</desc>
        <rect
          x="-100"
          y="-100"
          width="100%"
          height="100%"
          fill="${this.backgroundColors[Math.floor(Math.random() * this.backgroundColors.length)]}"
        />
        <polyline
          id="faceContour"
          points="${this.computedFacePoints}"
          fill="#ffc9a9"
          stroke="black"
          stroke-width="${3.0 / this.faceScale}"
          stroke-linejoin="round"
          filter="url(#fuzzy)"
        />
  
        <g
          transform="translate(${(this.center[0] + this.distanceBetweenEyes + this.rightEyeOffsetX)} ${-(-this.center[1] + this.eyeHeightOffset + this.rightEyeOffsetY)})"
        >
          <polyline
            id="rightCountour"
            points="${this.eyeRightCountour}"
            fill="white"
            stroke="white"
            stroke-width="${0.0 / this.faceScale}"
            stroke-linejoin="round"
            filter="url(#fuzzy)"
          />
        </g>
        <g
          transform="translate(${-(this.center[0] + this.distanceBetweenEyes + this.leftEyeOffsetX)} ${-(-this.center[1] + this.eyeHeightOffset + this.leftEyeOffsetY)})"
        >
          <polyline
            id="leftCountour"
            points="${this.eyeLeftCountour}"
            fill="white"
            stroke="white"
            stroke-width="${0.0 / this.faceScale}"
            stroke-linejoin="round"
            filter="url(#fuzzy)"
          />
        </g>
        <g
            transform="translate(${(this.center[0] + this.distanceBetweenEyes + this.rightEyeOffsetX)} ${-(-this.center[1] + this.eyeHeightOffset + this.rightEyeOffsetY)})"
        >
          <polyline
            id="rightUpper"
            points="${this.eyeRightUpper}"
            fill="none"
            stroke="black"
            stroke-width="${3.0 / this.faceScale}"
            stroke-linejoin="round"
            filter="url(#fuzzy)"
          />
          <polyline
            id="rightLower"
            points="${this.eyeRightLower}"
            fill="none"
            stroke="black"
            stroke-width="${4.0 / this.faceScale}"
            stroke-linejoin="round"
            filter="url(#fuzzy)"
          />
          ${this.getEyeCircles(this.rightPupilShiftX, this.rightPupilShiftY, "rightEyeClipPath")}
        </g>
        <g
            transform="translate(${-(this.center[0] + this.distanceBetweenEyes + this.leftEyeOffsetX)} ${-(-this.center[1] + this.eyeHeightOffset + this.leftEyeOffsetY)})"
        >
          <polyline
            id="leftUpper"
            points="${this.eyeLeftUpper}"
            fill="none"
            stroke="black"
            stroke-width="${4.0 / this.faceScale}"
            stroke-linejoin="round"
            filter="url(#fuzzy)"
          />
          <polyline
            id="leftLower"
            points="${this.eyeLeftLower}"
            fill="none"
            stroke="black"
            stroke-width="${4.0 / this.faceScale}"
            stroke-linejoin="round"
            filter="url(#fuzzy)"
          />
          ${this.getEyeCircles(this.leftPupilShiftX, this.leftPupilShiftY, "leftEyeClipPath")}
        </g>
        <g id="hairs">
          ${this.getHairsPolyline()}
        </g>
        ${this.getNosePath()}
        <g id="mouth">
          <polyline
            points="${this.mouthPoints}"
            fill="rgb(215,127,140)"
            stroke="black"
            stroke-width="3"
            stroke-linejoin="round"
            filter="url(#fuzzy)"
          />
        </g>
      </svg>`
    }
}
