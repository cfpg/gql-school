import React from "react";

import TeachersList from "../../components/TeachersList";
import AddTeacherForm from "../../components/AddTeacherForm";

export default function TeachersContainer() {
  return (
    <div className="TeachersContainer">
      <h1>Teachers</h1>

      <TeachersList />
      <AddTeacherForm />
    </div>
  );
}
