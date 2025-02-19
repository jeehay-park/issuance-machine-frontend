import React from "react";
import {
  Container,
  ImageSection,
  FormSection,
  FormContainer,
  Input,
  Button,
} from "../../styles/styledLogin";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authAtom } from "../../recoil/atoms/auth";
import { useNavigate } from "react-router-dom";
import { login } from "../../recoil/atoms/auth";
import { errorAtom } from "../../recoil/atoms/error";

interface FormData {
  userId: string | null;
  password: string | null;
}

// 로그인
const Login: React.FC = () => {
  const setAuthState = useSetRecoilState(authAtom);
  const [error, setError] = useRecoilState(errorAtom);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    userId: null,
    password: null,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = await login({
      ...formData,
    });

    if (result?.header?.rtnCode === "000000") {
      setAuthState(result.body);
      navigate("/dashboard");
    } else {
      if (result?.header) {
        setError(result.header);
      }
      console.error("Error:", result);
    }
  };

  return (
    <Container>
      <ImageSection></ImageSection>
      <FormSection>
        <FormContainer>
          <h2 style={{ textAlign: "center" }}>ICTK 발급장비</h2>
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
            관리자 페이지
          </h2>
          <form>
            <Input
              name="userId"
              type="text"
              placeholder="ID"
              onChange={handleChange}
            />
            <Input
              name="password"
              type="password"
              placeholder="비밀번호"
              onChange={handleChange}
            />
            <Button type="submit" onClick={handleSubmit}>
              Login
            </Button>
          </form>
        </FormContainer>
      </FormSection>
    </Container>
  );
};

export default Login;
