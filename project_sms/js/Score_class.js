class Score {
  constructor(korean, english, math){
    // this = {};
    this.scores = [korean, english, math];
  }

  getKorean(){
    return this.scores[0];
  }

  getEnglish(){
    return this.scores[1];
  }

  getMath(){
    return this.scores[2];
  }

  getSum(){
    return this.scores.reduce((total, score) => total + score , 0);
  }

  getAverage(){
    return (this.getSum() / this.scores.length).toFixed(1);
  }
}