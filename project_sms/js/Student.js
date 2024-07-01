// 생성자 함수
export default function Student(ssn, name, korean, english, math) {
  this.ssn = ssn;
  this.name = name;
  this.korean = korean;
  this.english = english;
  this.math = math;
}

// Student.prototype객체에 기능(메소드) 추가
Student.prototype.getSum = function () {
  return this.korean + this.english + this.math;
}

Student.prototype.getAverage = function(){
  return (this.getSum() / 3).toFixed(1);
}
// Object의 toString() 재정의(Overring)
Student.prototype.toString = function(){
  return `${this.ssn}\t${this.name}\t${this.korean}\t${this.english}\t${this.math}\t${this.getSum()}\t${this.getAverage()}`;
}