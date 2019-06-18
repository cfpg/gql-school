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
            <h2>Students</h2>
            <ul>
              {data.students.map(student => {
                return <li>{student.name}</li>;
              })}
            </ul>
          </div>
        );
      }}
    </Query>
  );
}
