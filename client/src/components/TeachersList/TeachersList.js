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
            <ul>
              {data.teachers.map(teacher => {
                return (
                  <li key={teacher.id}>
                    {teacher.name}
                    <ul>
                      <li key="title">
                        <strong>Students:</strong>
                      </li>
                      {teacher.students !== null &&
                        teacher.students.map(student => {
                          return <li key={student.id}>{student.name}</li>;
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
