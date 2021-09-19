import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any;
};



export type AddFamilyInput = {
  familyName: Scalars['String'];
};

export type AddFamilyMembersInput = {
  familyId: Scalars['ID'];
  memberId: Scalars['ID'];
};

export type AddFamilyPayload = {
  __typename?: 'AddFamilyPayload';
  family?: Maybe<Family>;
  errors?: Maybe<Array<UserError>>;
};

export type AddFamilyTaskInput = {
  shortDescription: Scalars['String'];
  payment: Scalars['Int'];
  familyId: Scalars['ID'];
};

export type AddFamilyTaskPayload = {
  __typename?: 'AddFamilyTaskPayload';
  family?: Maybe<Family>;
  familyTask?: Maybe<FamilyTask>;
  errors?: Maybe<Array<UserError>>;
};

export type AddUserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  birthDate?: Maybe<Scalars['DateTime']>;
};

export type AddUserPayload = {
  __typename?: 'AddUserPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  errors?: Maybe<Array<UserError>>;
};

export type ClaimTaskInput = {
  taskIds: Array<Scalars['ID']>;
};

export type ClaimTaskPayload = {
  __typename?: 'ClaimTaskPayload';
  user?: Maybe<User>;
  errors?: Maybe<Array<UserError>>;
};


export type Family = Node & {
  __typename?: 'Family';
  id: Scalars['ID'];
  members?: Maybe<Array<Maybe<User>>>;
  tasks?: Maybe<Array<Maybe<FamilyTask>>>;
  familyName: Scalars['String'];
};

export type FamilyTask = Node & {
  __typename?: 'FamilyTask';
  id: Scalars['ID'];
  family?: Maybe<Family>;
  assignedTo?: Maybe<User>;
  familyId?: Maybe<Scalars['ID']>;
  shortDescription: Scalars['String'];
  payment: Scalars['Int'];
  isCompleted?: Maybe<Scalars['Boolean']>;
  assignedToId?: Maybe<Scalars['Int']>;
  createdBy?: Maybe<User>;
  createdById?: Maybe<Scalars['Int']>;
  createdOn: Scalars['DateTime'];
  updatedOn: Scalars['DateTime'];
};

export type GetUserPayload = {
  __typename?: 'GetUserPayload';
  user?: Maybe<User>;
  errors?: Maybe<Array<UserError>>;
};

export type LoginUserInput = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export type LoginUserPayload = {
  __typename?: 'LoginUserPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  errors?: Maybe<Array<UserError>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: AddUserPayload;
  loginUser: LoginUserPayload;
  claimTask: ClaimTaskPayload;
  createFamily: AddFamilyPayload;
  addFamilyMembers: AddFamilyPayload;
  addFamilyTask: AddFamilyTaskPayload;
};


export type MutationCreateUserArgs = {
  input: AddUserInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationClaimTaskArgs = {
  input: ClaimTaskInput;
};


export type MutationCreateFamilyArgs = {
  input: AddFamilyInput;
};


export type MutationAddFamilyMembersArgs = {
  input: AddFamilyMembersInput;
};


export type MutationAddFamilyTaskArgs = {
  input: AddFamilyTaskInput;
};

/** The node interface is implemented by entities that have a global unique identifier. */
export type Node = {
  id: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  node?: Maybe<Node>;
  users: Array<User>;
  findUser: GetUserPayload;
  families: Array<Family>;
  family: Family;
  familyTasks: Array<FamilyTask>;
  familyTask: FamilyTask;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryFindUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryFamilyArgs = {
  id: Scalars['ID'];
};


export type QueryFamilyTaskArgs = {
  id: Scalars['ID'];
};

export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  userTasks?: Maybe<Array<Maybe<FamilyTask>>>;
  family?: Maybe<Family>;
  username: Scalars['String'];
  birthDate?: Maybe<Scalars['DateTime']>;
  familyId?: Maybe<Scalars['ID']>;
  userCreatedTasks: Array<FamilyTask>;
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
  code: Scalars['String'];
};

export type ErrorInfoFragment = (
  { __typename?: 'UserError' }
  & Pick<UserError, 'code' | 'message'>
);

export type CreateFamilyMutationVariables = Exact<{
  familyName: Scalars['String'];
}>;


export type CreateFamilyMutation = (
  { __typename?: 'Mutation' }
  & { createFamily: (
    { __typename?: 'AddFamilyPayload' }
    & { family?: Maybe<(
      { __typename?: 'Family' }
      & Pick<Family, 'id' | 'familyName'>
      & { members?: Maybe<Array<Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'username'>
      )>>> }
    )> }
  ) }
);

export type FamilyInfoFragment = (
  { __typename?: 'Family' }
  & Pick<Family, 'familyName'>
);

export type FamilyMembersFragment = (
  { __typename?: 'Family' }
  & { members?: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )>>> }
);

export type CreateTaskMutationVariables = Exact<{
  familyId: Scalars['ID'];
  payment: Scalars['Int'];
  shortDescription: Scalars['String'];
}>;


export type CreateTaskMutation = (
  { __typename?: 'Mutation' }
  & { addFamilyTask: (
    { __typename?: 'AddFamilyTaskPayload' }
    & { familyTask?: Maybe<(
      { __typename?: 'FamilyTask' }
      & FamilyTaskInfoFragment
    )> }
  ) }
);

export type FamilyTaskInfoFragment = (
  { __typename?: 'FamilyTask' }
  & Pick<FamilyTask, 'id' | 'createdOn' | 'shortDescription' | 'payment' | 'isCompleted'>
  & { createdBy?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )>, assignedTo?: Maybe<(
    { __typename?: 'User' }
    & UserInfoFragment
  )> }
);

export type GetFamilyTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFamilyTasksQuery = (
  { __typename?: 'Query' }
  & { familyTasks: Array<(
    { __typename?: 'FamilyTask' }
    & FamilyTaskInfoFragment
  )> }
);

export type ClaimTasksMutationVariables = Exact<{
  taskIds: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type ClaimTasksMutation = (
  { __typename?: 'Mutation' }
  & { claimTask: (
    { __typename?: 'ClaimTaskPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserInfoFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'UserError' }
      & ErrorInfoFragment
    )>> }
  ) }
);

export type UserDetailsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'birthDate'>
);

export type UserInfoFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'familyId'>
);

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = (
  { __typename?: 'Query' }
  & { findUser: (
    { __typename?: 'GetUserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & { family?: Maybe<(
        { __typename?: 'Family' }
        & FamilyInfoFragment
      )> }
      & UserInfoFragment
      & UserDetailsFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'UserError' }
      & ErrorInfoFragment
    )>> }
  ) }
);

export type GetUserTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserTasksQuery = (
  { __typename?: 'Query' }
  & { findUser: (
    { __typename?: 'GetUserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & { userTasks?: Maybe<Array<Maybe<(
        { __typename?: 'FamilyTask' }
        & FamilyTaskInfoFragment
      )>>> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'UserError' }
      & ErrorInfoFragment
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'LoginUserPayload' }
    & Pick<LoginUserPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserInfoFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'UserError' }
      & ErrorInfoFragment
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
  birthDate: Scalars['DateTime'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'AddUserPayload' }
    & Pick<AddUserPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserInfoFragment
    )>, errors?: Maybe<Array<(
      { __typename?: 'UserError' }
      & ErrorInfoFragment
    )>> }
  ) }
);

export const ErrorInfoFragmentDoc = gql`
    fragment errorInfo on UserError {
  code
  message
}
    `;
export const FamilyInfoFragmentDoc = gql`
    fragment familyInfo on Family {
  familyName
}
    `;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on User {
  id
  username
  familyId
}
    `;
export const FamilyMembersFragmentDoc = gql`
    fragment familyMembers on Family {
  members {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const FamilyTaskInfoFragmentDoc = gql`
    fragment familyTaskInfo on FamilyTask {
  id
  createdOn
  shortDescription
  payment
  isCompleted
  createdBy {
    ...userInfo
  }
  assignedTo {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;
export const UserDetailsFragmentDoc = gql`
    fragment userDetails on User {
  birthDate
}
    `;
export const CreateFamilyDocument = gql`
    mutation createFamily($familyName: String!) {
  createFamily(input: {familyName: $familyName}) {
    family {
      id
      familyName
      members {
        username
      }
    }
  }
}
    `;
export type CreateFamilyMutationFn = Apollo.MutationFunction<CreateFamilyMutation, CreateFamilyMutationVariables>;

/**
 * __useCreateFamilyMutation__
 *
 * To run a mutation, you first call `useCreateFamilyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFamilyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFamilyMutation, { data, loading, error }] = useCreateFamilyMutation({
 *   variables: {
 *      familyName: // value for 'familyName'
 *   },
 * });
 */
export function useCreateFamilyMutation(baseOptions?: Apollo.MutationHookOptions<CreateFamilyMutation, CreateFamilyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFamilyMutation, CreateFamilyMutationVariables>(CreateFamilyDocument, options);
      }
export type CreateFamilyMutationHookResult = ReturnType<typeof useCreateFamilyMutation>;
export type CreateFamilyMutationResult = Apollo.MutationResult<CreateFamilyMutation>;
export type CreateFamilyMutationOptions = Apollo.BaseMutationOptions<CreateFamilyMutation, CreateFamilyMutationVariables>;
export const CreateTaskDocument = gql`
    mutation createTask($familyId: ID!, $payment: Int!, $shortDescription: String!) {
  addFamilyTask(
    input: {familyId: $familyId, payment: $payment, shortDescription: $shortDescription}
  ) {
    familyTask {
      ...familyTaskInfo
    }
  }
}
    ${FamilyTaskInfoFragmentDoc}`;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      familyId: // value for 'familyId'
 *      payment: // value for 'payment'
 *      shortDescription: // value for 'shortDescription'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const GetFamilyTasksDocument = gql`
    query getFamilyTasks {
  familyTasks {
    ...familyTaskInfo
  }
}
    ${FamilyTaskInfoFragmentDoc}`;

/**
 * __useGetFamilyTasksQuery__
 *
 * To run a query within a React component, call `useGetFamilyTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFamilyTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFamilyTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFamilyTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetFamilyTasksQuery, GetFamilyTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFamilyTasksQuery, GetFamilyTasksQueryVariables>(GetFamilyTasksDocument, options);
      }
export function useGetFamilyTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFamilyTasksQuery, GetFamilyTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFamilyTasksQuery, GetFamilyTasksQueryVariables>(GetFamilyTasksDocument, options);
        }
export type GetFamilyTasksQueryHookResult = ReturnType<typeof useGetFamilyTasksQuery>;
export type GetFamilyTasksLazyQueryHookResult = ReturnType<typeof useGetFamilyTasksLazyQuery>;
export type GetFamilyTasksQueryResult = Apollo.QueryResult<GetFamilyTasksQuery, GetFamilyTasksQueryVariables>;
export const ClaimTasksDocument = gql`
    mutation ClaimTasks($taskIds: [ID!]!) {
  claimTask(input: {taskIds: $taskIds}) {
    user {
      ...userInfo
    }
    errors {
      ...errorInfo
    }
  }
}
    ${UserInfoFragmentDoc}
${ErrorInfoFragmentDoc}`;
export type ClaimTasksMutationFn = Apollo.MutationFunction<ClaimTasksMutation, ClaimTasksMutationVariables>;

/**
 * __useClaimTasksMutation__
 *
 * To run a mutation, you first call `useClaimTasksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClaimTasksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [claimTasksMutation, { data, loading, error }] = useClaimTasksMutation({
 *   variables: {
 *      taskIds: // value for 'taskIds'
 *   },
 * });
 */
export function useClaimTasksMutation(baseOptions?: Apollo.MutationHookOptions<ClaimTasksMutation, ClaimTasksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClaimTasksMutation, ClaimTasksMutationVariables>(ClaimTasksDocument, options);
      }
export type ClaimTasksMutationHookResult = ReturnType<typeof useClaimTasksMutation>;
export type ClaimTasksMutationResult = Apollo.MutationResult<ClaimTasksMutation>;
export type ClaimTasksMutationOptions = Apollo.BaseMutationOptions<ClaimTasksMutation, ClaimTasksMutationVariables>;
export const GetUserInfoDocument = gql`
    query getUserInfo {
  findUser {
    user {
      ...userInfo
      ...userDetails
      family {
        ...familyInfo
      }
    }
    errors {
      ...errorInfo
    }
  }
}
    ${UserInfoFragmentDoc}
${UserDetailsFragmentDoc}
${FamilyInfoFragmentDoc}
${ErrorInfoFragmentDoc}`;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a React component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
      }
export function useGetUserInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserInfoQuery, GetUserInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, options);
        }
export type GetUserInfoQueryHookResult = ReturnType<typeof useGetUserInfoQuery>;
export type GetUserInfoLazyQueryHookResult = ReturnType<typeof useGetUserInfoLazyQuery>;
export type GetUserInfoQueryResult = Apollo.QueryResult<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const GetUserTasksDocument = gql`
    query getUserTasks {
  findUser {
    user {
      userTasks {
        ...familyTaskInfo
      }
    }
    errors {
      ...errorInfo
    }
  }
}
    ${FamilyTaskInfoFragmentDoc}
${ErrorInfoFragmentDoc}`;

/**
 * __useGetUserTasksQuery__
 *
 * To run a query within a React component, call `useGetUserTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTasksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserTasksQuery(baseOptions?: Apollo.QueryHookOptions<GetUserTasksQuery, GetUserTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserTasksQuery, GetUserTasksQueryVariables>(GetUserTasksDocument, options);
      }
export function useGetUserTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserTasksQuery, GetUserTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserTasksQuery, GetUserTasksQueryVariables>(GetUserTasksDocument, options);
        }
export type GetUserTasksQueryHookResult = ReturnType<typeof useGetUserTasksQuery>;
export type GetUserTasksLazyQueryHookResult = ReturnType<typeof useGetUserTasksLazyQuery>;
export type GetUserTasksQueryResult = Apollo.QueryResult<GetUserTasksQuery, GetUserTasksQueryVariables>;
export const LoginDocument = gql`
    mutation Login($name: String!, $password: String!) {
  loginUser(input: {name: $name, password: $password}) {
    token
    user {
      ...userInfo
    }
    errors {
      ...errorInfo
    }
  }
}
    ${UserInfoFragmentDoc}
${ErrorInfoFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($name: String!, $password: String!, $birthDate: DateTime!) {
  createUser(input: {name: $name, password: $password, birthDate: $birthDate}) {
    token
    user {
      ...userInfo
    }
    errors {
      ...errorInfo
    }
  }
}
    ${UserInfoFragmentDoc}
${ErrorInfoFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      name: // value for 'name'
 *      password: // value for 'password'
 *      birthDate: // value for 'birthDate'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;