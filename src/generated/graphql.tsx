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

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
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
      & Pick<User, 'id' | 'familyId'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'code' | 'message'>
    )>> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'AddUserPayload' }
    & Pick<AddUserPayload, 'token'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'UserError' }
      & Pick<UserError, 'code' | 'message'>
    )>> }
  ) }
);


export const GetUsersDocument = gql`
    query getUsers {
  users {
    id
    username
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const LoginDocument = gql`
    mutation Login($name: String!, $password: String!) {
  loginUser(input: {name: $name, password: $password}) {
    token
    user {
      id
      familyId
    }
    errors {
      code
      message
    }
  }
}
    `;
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
    mutation Register($name: String!, $password: String!) {
  createUser(input: {name: $name, password: $password}) {
    token
    user {
      id
      username
    }
    errors {
      code
      message
    }
  }
}
    `;
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