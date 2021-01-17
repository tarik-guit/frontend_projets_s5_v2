export class SVCParameters {
  C: number = 2.0;
}

export class SVCResult {
  accuracy: number;
}
export class Cardi {
  constructor(public age: number,public sex: number,public bloodPressure: number,public cholesterol: number,public maximumHeart: number,public angina: number){

  }

}

// export class ProbabilityPrediction {
//   name: string;
//   value: number;
// }

export class ProbabilityPrediction {

  results: number;
}
