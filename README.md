# STEPS FOLLOWED

1. Create a prisma instace with a new psql database \
   `prisma init`
2. Run `docker-compose up` then `prisma deploy` to create the default server
3. Create a user with the following mutation:
   ```
   mutation{
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
           id,
           name
       }
   }
   ```
