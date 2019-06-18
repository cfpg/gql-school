import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

export default function AddStudentForm() {
  const [userName, setUserName] = useState("");

  const handleUserNameChange = e => {
    setUserName(e.currentTarget.value);
  };

  const CREATE_STUDENT = gql`
    mutation CreateStudent($studentName: String!) {
      createStudent(name: $studentName) {
        id
        name
      }
    }
  `;

  return (
    <div className="AddStudentForm">
      <h2>Add Student</h2>
      <Mutation mutation={CREATE_STUDENT}>
        {(mutation, { data }) => (
          <div>
            <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              placeholder="First &amp; Last Name"
            />

            <button
              onClick={e => {
                mutation({ variables: { studentName: userName } });
              }}
            >
              Create
            </button>
          </div>
        )}
      </Mutation>
    </div>
  );
}
