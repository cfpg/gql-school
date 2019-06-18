import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: "Mutation";
  createStudent: Student;
  createTeacher: Teacher;
  updateTeacherAndConnectStudent: Teacher;
};

export type MutationCreateStudentArgs = {
  name: Scalars["String"];
};

export type MutationCreateTeacherArgs = {
  name: Scalars["String"];
};

export type MutationUpdateTeacherAndConnectStudentArgs = {
  where: TeacherWhereUniqueInput;
  data: TeacherUpdateInput;
};

export type Query = {
  __typename?: "Query";
  students: Array<Maybe<Student>>;
  teachers: Array<Maybe<Teacher>>;
};

export type Student = {
  __typename?: "Student";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type StudentCreateInput = {
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
};

export type StudentUpdateManyWithoutTeachersInput = {
  connect?: Maybe<Array<StudentWhereUniqueInput>>;
};

export type StudentWhereInput = {
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
};

export type StudentWhereUniqueInput = {
  id?: Maybe<Scalars["ID"]>;
};

export type Teacher = {
  __typename?: "Teacher";
  id: Scalars["ID"];
  name: Scalars["String"];
  students?: Maybe<Array<Student>>;
};

export type TeacherStudentsArgs = {
  where?: Maybe<StudentWhereInput>;
};

export type TeacherCreateInput = {
  id?: Maybe<Scalars["ID"]>;
  name: Scalars["String"];
};

export type TeacherUpdateInput = {
  name?: Maybe<Scalars["String"]>;
  students?: Maybe<StudentUpdateManyWithoutTeachersInput>;
};

export type TeacherWhereUniqueInput = {
  id?: Maybe<Scalars["ID"]>;
};

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: {};
  Student: Student;
  ID: Scalars["ID"];
  String: Scalars["String"];
  Teacher: Teacher;
  StudentWhereInput: StudentWhereInput;
  Mutation: {};
  TeacherWhereUniqueInput: TeacherWhereUniqueInput;
  TeacherUpdateInput: TeacherUpdateInput;
  StudentUpdateManyWithoutTeachersInput: StudentUpdateManyWithoutTeachersInput;
  StudentWhereUniqueInput: StudentWhereUniqueInput;
  Boolean: Scalars["Boolean"];
  StudentCreateInput: StudentCreateInput;
  TeacherCreateInput: TeacherCreateInput;
};

export type MutationResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Mutation"]
> = {
  createStudent?: Resolver<
    ResolversTypes["Student"],
    ParentType,
    ContextType,
    MutationCreateStudentArgs
  >;
  createTeacher?: Resolver<
    ResolversTypes["Teacher"],
    ParentType,
    ContextType,
    MutationCreateTeacherArgs
  >;
  updateTeacherAndConnectStudent?: Resolver<
    ResolversTypes["Teacher"],
    ParentType,
    ContextType,
    MutationUpdateTeacherAndConnectStudentArgs
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Query"]
> = {
  students?: Resolver<
    Array<Maybe<ResolversTypes["Student"]>>,
    ParentType,
    ContextType
  >;
  teachers?: Resolver<
    Array<Maybe<ResolversTypes["Teacher"]>>,
    ParentType,
    ContextType
  >;
};

export type StudentResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Student"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type TeacherResolvers<
  ContextType = any,
  ParentType = ResolversTypes["Teacher"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  students?: Resolver<
    Maybe<Array<ResolversTypes["Student"]>>,
    ParentType,
    ContextType,
    TeacherStudentsArgs
  >;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Student?: StudentResolvers<ContextType>;
  Teacher?: TeacherResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
