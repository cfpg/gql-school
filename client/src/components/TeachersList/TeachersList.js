import React from "react";

export default function TeachersList({ teachers }) {
  return (
    <div className="TeachersList">
      <ul>
        {teachers.map(teacher => {
          return (
            <li key={teacher.id}>
              {teacher.name}
              <ul>
                <li key="title">
                  <strong>Students:</strong>
                </li>
                {teacher.students.map(student => {
                  return <li key={student.id}>{student.name}</li>;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
