import React from "react";

import StudentsList from "../../components/StudentsList";

export default function StudentsContainer() {
  return (
    <div className="StudentsContainer">
      <h1>Students</h1>

      <StudentsList />
    </div>
  );
}
