import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

export default function StudentsList() {
  // Graphql
  const getStudents = gql`
    query {
      students {
        id
        name
      }
    }
  `;

  return (
    <Query query={getStudents}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error</div>;

        return (
          <div className="StudentsList">
            <ul>
              {data.students.map(student => {
                return <li key={student.id}>{student.name}</li>;
              })}
            </ul>
          </div>
        );
      }}
    </Query>
  );
}
