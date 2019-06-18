import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";

export default function Form() {
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("Teacher");

  const handleUserNameChange = e => {
    setUserName(e.currentTarget.value);
  };

  const handleUserTypeChange = e => {
    setUserType(e.currentTarget.value);
  };

  const CREATE_TEACHER = gql`
    mutation CreateTeacher($teacherName: String!) {
      createTeacher(data: { name: $teacherName }) {
        id
        name
      }
    }
  `;

  return (
    <div className="Form">
      <h2>Add User</h2>
      <Mutation mutation={CREATE_TEACHER}>
        {(mutation, { data }) => (
          <div>
            <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              placeholder="First &amp; Last Name"
            />
            <select name="type" onChange={handleUserTypeChange}>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>

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
