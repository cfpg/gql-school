import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

export default function AddTeacherForm() {
  const [userName, setUserName] = useState("");

  const handleUserNameChange = e => {
    setUserName(e.currentTarget.value);
  };

  const CREATE_TEACHER = gql`
    mutation CreateTeacher($teacherName: String!) {
      createTeacher(name: $teacherName) {
        id
        name
      }
    }
  `;

  return (
    <div className="AddTeacherForm">
      <h2>Add Teacher</h2>
      <Mutation mutation={CREATE_TEACHER}>
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
                mutation({ variables: { teacherName: userName } });
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
