import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { gql } from "apollo-boost";
import { Form, Select, Button } from "antd";
const { Option } = Select;

export default function AssignTeacherStudentForm({ teachers, students }) {
  const [teacher, setTeacher] = useState(undefined);
  const [student, setStudent] = useState(undefined);

  const UPDATE_TEACHER_CONNECT_STUDENT = gql`
    mutation UpdateTeacherAndConnectStudent(
      $where: TeacherWhereUniqueInput!
      $data: TeacherUpdateInput!
    ) {
      updateTeacherAndConnectStudent(where: $where, data: $data) {
        id
        name
      }
    }
  `;

  const onSubmit = e => {
    e.preventDefault();
    console.log(teacher, student);
  };

  return (
    <div className="AssignTeacherStudentForm">
      <h2>Assign Student to Teacher</h2>
      <Mutation mutation={UPDATE_TEACHER_CONNECT_STUDENT}>
        {(mutation, { data }) => {
          return (
            <div>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  mutation({
                    variables: {
                      where: { id: teacher },
                      data: { students: { connect: { id: student } } }
                    }
                  });
                }}
              >
                <Form.Item>
                  <Select
                    placeholder="Teacher"
                    onChange={teacherId => {
                      setTeacher(teacherId);
                    }}
                  >
                    {teachers.map(teacher => {
                      return (
                        <Option key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Select
                    placeholder="Student"
                    onChange={studentId => {
                      setStudent(studentId);
                    }}
                  >
                    {students.map(student => {
                      return (
                        <Option key={student.id} value={student.id}>
                          {student.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="assign-button"
                  >
                    Assign
                  </Button>
                </Form.Item>
              </Form>
            </div>
          );
        }}
      </Mutation>
    </div>
  );
}
