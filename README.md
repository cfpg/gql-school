# STEPS FOLLOWED

1. Create a prisma instace with a new psql database \
   `prisma init`
2. Run `docker-compose up` then `prisma deploy` to create the default server
3. Create a user with the following mutation:

```
mutation {
  createUser(data:{
    name:"Admin"
  }) {
    id
  }
}
```

4. Retrieve the name and id of the created user:

```
query {
  users {
    id
    name
  }
}
```

5. Add Student and Teacher models to datamodel.prisma

```
type Student {
  id: ID! @id
  name: String!
  teachers: [Teacher!]! @relation(name: "TeacherStudent")
}

type Teacher {
  id: ID! @id
  name: String!
  students: [Student!]! @relation(name: "TeacherStudent")
}
```

6. Create a Student using the Playground

```
mutation {
  createStudent(data: {
    name: "John Doe"
  }) {
    id
  }
}
# Result: "id": "cjvzwxtpu001e07120w45g8fj"
```

7. Create a Teacher using the Playground

```
mutation {
  createTeacher(data: {
    name: "Alice Doe"
  }) {
    id
  }
}
# Result: "id": "cjvzx4ory001o0712eq5hqmya"
```

8. Connect Student to Teacher

```
mutation updateTeacherAndConnectStudent {
  updateTeacher(
    where: { id: "cjvzx4ory001o0712eq5hqmya" }
    data: { students: { connect: [{ id: "cjvzwxtpu001e07120w45g8fj" }] } }
  ) {
    name
    students {
      name
    }
  }
}
```

9. Find Student given an ID

```
query {
  student(where: { id: "cjvzwxtpu001e07120w45g8fj" }) {
    name
  }
}
```

10. Find all Students given a Teacher ID

```
query {
  teacher(where: { id: "cjvzx4ory001o0712eq5hqmya" }) {
    name
    students {
      name
    }
  }
}
```

11. Created an Apollo app which can be run using `node index.js`
