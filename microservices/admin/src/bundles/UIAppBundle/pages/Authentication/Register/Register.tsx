import { ApolloClient, use, useGuardian, useRouter, useTranslate } from "@bluelibs/x-ui";
import React, { useState } from "react";
import { Routes } from "@bundles/UIAppBundle";
import { UserRegistrationInput } from "../../../../../api.types"
import {
  Layout,
  Form,
  Input,
  Checkbox,
  Button,
  Space,
  Row,
  Col,
  Alert,
  Card,
  notification,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { UsersCollection } from "@bundles/UIAppBundle/collections";
import { gql, useMutation } from '@apollo/client';


export function Register() {
  const router = useRouter();
  const tl = useTranslate("authentication.register");
  const [submitError, setSubmitError] = useState(null);
  const UserRegistration = gql`
  mutation Mutation($document: UserRegistrationInput!) {
   UserRegistration(document: $document)
  }
`;
  type UserRegistration = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }
  const [register, { data }] = useMutation(UserRegistration);
  const onSubmit = (newUser: UserRegistration) => {
    const { email,
      password,
      firstName,
      lastName,
    } = newUser;
    register({
      variables: {
        document: {
          email,
          password,
          profile: {
            firstName,
            lastName,
          }
        }
      }
    }).then((status) => {
      notification.success({
        message: tl("success.header"),
        description: tl("success.description"),
      });

      setSubmitError(null);
      router.go(Routes.LOGIN);
    })
      .catch((err) => {
        setSubmitError(err.toString());
      });
  };

  const style = { minHeight: "100vh" };
  return (
    <Row
      justify="center"
      align="middle"
      style={style}
      className="register-page"
    >
      <Col sm={24} md={12} lg={6}>
        <Card title={tl("header")}>
          <Form
            onFinish={(data) => onSubmit(data)}
            className="authentication-form"
          >
            <Form.Item name="firstName" rules={[{ required: true }]}>
              <Input placeholder={tl("fields.firstName")} />
            </Form.Item>
            <Form.Item name="lastName" rules={[{ required: true }]}>
              <Input placeholder={tl("fields.lastName")} />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true }]}>
              <Input placeholder={tl("fields.email")} />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true }]}>
              <Input.Password placeholder={tl("fields.password")} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="authentication-form-button"
              >
                {tl("submit")}
              </Button>
            </Form.Item>
            {submitError && <Alert message={submitError} type="error" />}
          </Form>
        </Card>
      </Col>
    </Row>
  );
}
