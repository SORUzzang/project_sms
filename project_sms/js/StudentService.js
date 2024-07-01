// 학생 성적 관리 서비스 객체
export default function StudentService(){
  // this = {};
  this.students = [];
}

// 학생 등록
StudentService.prototype.addStudent = function(student){
  this.students.push(student);
}

// 학생 목록 반환
StudentService.prototype.findAll = function(){
  return this.students;
}

// 학생 검색
StudentService.prototype.findBySearch = function(type, value){
  let searchResult = null;
  searchResult = this.students.filter((student) => {
    if(type === "ssn"){
      return student.ssn === value;
    } else if(type === "name"){
      return student.name === value;
    }
  });
  return searchResult;
}