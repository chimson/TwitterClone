import * as React from "react";
import { ButtonContainer, SpanContainer, StyledForm } from "../../styles";
import { TextFormField } from "../../components/FormComponents/TextFormField";
import { Formik, FormikErrors, FormikValues } from "formik";
import * as yup from "yup";
import {
  AuthUserDocument,
  AuthUserQuery,
  RegisterDocument,
  LoginDocument,
} from "../../generated/graphql";
import { setAccessToken } from "../../accessToken";
import { useMutation } from "@apollo/client";

const schema = yup.object().shape({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

interface IHandleSubmit {
  values: FormikValues;
  setErrors: (
    errors: FormikErrors<{
      name: string | undefined;
      username: string | undefined;
      email: string | undefined;
      password: string | undefined;
      message: string;
      __typename: "UserRegisterInvalidInputError";
    }>
  ) => void;
}

export const Form: React.FC = () => {
  const [login] = useMutation(LoginDocument);
  const [register] = useMutation(RegisterDocument);

  const handleSubmit = async ({
    values: { name, username, email, password },
    setErrors,
  }: IHandleSubmit) => {
    const response = await register({
      variables: { name, username, email, password },
    });
    if (response!.data!.register!.message) {
      setErrors(
        response!.data!.register as FormikErrors<{
          name: string | undefined;
          username: string | undefined;
          email: string | undefined;
          password: string | undefined;
          message: string;
          __typename: "UserRegisterInvalidInputError";
        }>
      );
    }

    if (response!.data!.register!.node) {
      const loginResponse = await login({
        variables: { email, password },
        update: (store, { data }) => {
          store.writeQuery<AuthUserQuery>({
            query: AuthUserDocument,
            data: {
              authUser: data!.login!.node,
            },
          });
        },
      });
      setAccessToken(loginResponse.data!.login!.accessToken);
    }
  };
  return (
    <Formik
      initialValues={{ name: "", username: "", email: "", password: "" }}
      onSubmit={async (values, { setErrors }) =>
        handleSubmit({ values, setErrors })
      }
      validationSchema={schema}
    >
      {() => (
        <StyledForm>
          <TextFormField name="name" label="Your name" />
          <TextFormField name="username" label="Username, e.g chimson" />
          <TextFormField name="email" label="Email" />
          <TextFormField name="password" label="Password" type="password" />
          <ButtonContainer type="submit" noMarginLeft filledVariant bigger>
            <SpanContainer bold>
              <span>Sign Up</span>
            </SpanContainer>
          </ButtonContainer>
        </StyledForm>
      )}
    </Formik>
  );
};