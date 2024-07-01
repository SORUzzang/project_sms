import Student from "./Student.js";
import StudentService from "./StudentService.js";
import { Validator } from "./validator.js";

/**
 * 학생 목록 테이블 렌더링
 * @param {*} students  
 */
const renderingStudents = function (students) {
  const tbody = document.querySelector("#studentList");
  let trs = "";
  console.log(students);
  students.forEach(student => {
    trs += `
      <tr>
        <th>${student.ssn}</th>
        <td>${student.name}</td>
        <td>${student.korean}</td>
        <td>${student.english}</td>
        <td>${student.math}</td>
        <td>${student.getSum()}</td>
        <td>${student.getAverage()}</td>
        <td>1</td>
      </tr>
    `;
  });
  // console.log(trs);
  tbody.innerHTML = trs;
}

const createStudent = function (studentService) {
  const ssn = document.studentForm.ssn.value;
  const name = document.studentForm.name.value;
  const korean = document.studentForm.korean.value;
  const english = document.studentForm.english.value;
  const math = document.studentForm.math.value;

  // 입력 데이터 데이터 유효성 검증
  if (Validator.isEmpty(ssn) || !Validator.isNumber(ssn)) {
    alert("학번을 숫자로 입력하여 주세요");
    document.studentForm.ssn.value = "";
    document.studentForm.ssn.focus();
    return;
  }
  // studentService 객체에 신규 학생 등록
  studentService.addStudent(new Student(ssn, name, parseInt(korean), parseInt(english), parseInt(math)));
  inputFieldReset();
  // 학생 등록 완료 후 전체 목록 반환 후 출력
  const students = studentService.findAll();
  renderingStudents(students);
  showMessageModal("등록 결과", "정상 등록 처리되었습니다.");
}

// input 초기화
const inputFieldReset = function () {
  const fields = document.querySelectorAll("input[type='text']");
  fields.forEach((field) => {
    field.value = "";
  })
}

// 정렬
const sortStudents = function (studentService, sortType) {
  const students = studentService.findAll();
  switch (sortType) {
    case "ssn":
      students.sort((student1, student2) => parseInt(student1.ssn) - parseInt(student2.ssn));
      break;
    case "name":
      students.sort((student1, student2) => student1.name.charCodeAt(0) - student2.name.charCodeAt(0));
      break;
    case "sum":
      students.sort((student1, student2) => student1.getSum() - student2.getSum());
      break;
  }
  renderingStudents(students);
}

// Sweet Alert2 활용
const showMessageModal = function (title, text) {
  Swal.fire({
    title: title,
    text: text,
    icon: "success"
  });
}

const showErrorModal = function (title, text) {
  Swal.fire({
    title: title,
    text: text,
    icon: "error"
  });
}

const saveStorage = function (studentService) {
  if (!localStorage) {
    throw new Error("localStorage를 지원하지 않는 브라우저입니다.");
  }
  const students = studentService.findAll();

  const saveStudents = students.map(student => {
    student.sum = student.getSum();
    student.average = student.getAverage();
    return student;
  });
  localStorage.students = JSON.stringify(saveStudents);

  showMessageModal("저장 결과", "학생 정보를 저장 완료하였습니다.");
}

const readStorage = function (studentService) {
  if (!localStorage) {
    throw new Error("localStorage를 지원하지 않는 브라우저입니다.");
  }
  // 저장된 학생 정보가 없는 경우..
  if(!localStorage.students){
      showMessageModal("결과", "등록된 학생 정보가 없습니다.");
      return;
  }
  let students = JSON.parse(localStorage.students);
  // 변환된 객체에는 getSum(), getAverage() 메소드가 존재하지 않는다
  students = students.map(student => new Student(student.ssn, student.name, student.korean, student.english, student.math));
  studentService.students = students;
}


/**
 * 이벤트타겟에 이벤트핸들러 등록
 */
const eventRegister = function () {
  // 학생 성적 관리 서비스 객체
  let studentService = null;

  // 문서 로드이벤트 처리
  window.addEventListener("load", function () {
    studentService = new StudentService();
    // 더미데이터(학생) 등록
    // const student = new Student(10, "김기정", 90, 100, 95);
    // studentService.addStudent(student);
    // studentService.addStudent(new Student(11, "박기정", 95, 100, 90));
    // studentService.addStudent(new Student(12, "김기정", 50, 50, 90));
    // studentService.addStudent(new Student(13, "김찬규", 95, 95, 95));
    readStorage(studentService);

    // 학생 전체 목록 출력
    const students = studentService.findAll();
    renderingStudents(students);

    // 검색 이벤트 처리
    document.studentForm.sortType.addEventListener("change", function (event) {
      if (this.selectedIndex == 0) {
        return;
      }
      const searchType = this.options[this.selectedIndex].value;
      sortStudents(studentService, searchType);
    });
  });

  // 학생 등록 이벤트 처리
  document.querySelector("#addButton").addEventListener("click", event => {
      createStudent(studentService);
      // saveStorage(studentService);
    });

  // 저장 이벤트 처리
  document.querySelector("#saveButton").addEventListener("click", event => {
    saveStorage(studentService);
  });

}

/**
 * 실행 진입점
 */
function main() {
  eventRegister();
  // 학생 등록
  // 학생 전체 목록
  // 학생 검색
  // const array = studentService.findBySearch("ssn", 10);
  // const array = studentService.findBySearch("name", "김기정");
  // array.forEach((student) => console.log(student.toString()));
}
main();