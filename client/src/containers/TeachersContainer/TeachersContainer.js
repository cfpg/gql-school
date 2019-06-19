import React, { useState } from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Row, Col } from "antd";

import TeachersList from "../../components/TeachersList";
import AddTeacherForm from "../../components/AddTeacherForm";
import AssignTeacherStudentForm from "../../components/AssignTeacherStudentForm";

export default function TeachersContainer() {
  const TEACHERS = gql`
    query {
      teachers {
        id
        name
        students {
          id
          name
        }
      }
    }
  `;

  const [students, setStudents] = useState([]);
  const STUDENTS = gql`
    query {
      students {
        id
        name
      }
    }
  `;

  return (
    <div className="TeachersContainer">
      <Query query={STUDENTS}>
        {({ loading, error, data }) => {
          if (data) {
            setStudents(data.students);
            return <div />;
          }
        }}
      </Query>
      <Query query={TEACHERS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error!</div>;

          return (
            <div>
              <Row>
                <Col className="gutter-row" span={12}>
                  <h1>Teachers</h1>
                </Col>
              </Row>

              <Row>
                <Col className="gutter-row" span={12}>
                  <TeachersList teachers={data.teachers} />
                </Col>
              </Row>

              <Row>
                <Col className="gutter-row" span={6}>
                  <AddTeacherForm />
                </Col>

                <Col className="gutter-row" span={6}>
                  <AssignTeacherStudentForm
                    teachers={data.teachers}
                    students={students}
                  />
                </Col>
              </Row>
            </div>
          );
        }}
      </Query>
    </div>
  );
}
