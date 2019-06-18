import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

export default function TeachersList() {
  // Graphql
  const getTeachers = gql`
    query {
      teachers {
        id
        name
        students {
          name
        }
      }
    }
  `;

  return (
    <Query query={getTeachers}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;

        return (
          <div className="TeachersList">
            <h2>Teachers</h2>
            <ul>
              {data.teachers.map(teacher => {
                return (
                  <li>
                    {teacher.name}
                    <ul>
                      <li>
                        <strong>Students:</strong>
                      </li>
                      {teacher.students.map(student => {
                        return <li>{student.name}</li>;
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      }}
    </Query>
  );
}
