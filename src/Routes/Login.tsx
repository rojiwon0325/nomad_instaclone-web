import { useMutation } from '@apollo/client';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Default, Title } from 'Components';
import { AuthLayout, ButtonWrap, FormWrap, InputWrap, LinkWrap, LogoWrap } from 'Components/auth';
import { LinkButton } from 'Components/pure';
import { login } from 'Interfaces/Igql/login';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { setCookie } from 'State/cookie';
import { LOGIN_MUTATION } from 'State/query';

interface ILogin {
    result: string;
    account: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { state }: { state: null | { account: string, password: string } } = useLocation();
    const { register, handleSubmit, formState: { isValid, errors }, setError, clearErrors } = useForm<ILogin>({
        mode: "onChange",
        defaultValues: {
            account: state?.account ?? "",
            password: state?.password ?? ""
        }
    });
    const accountRegister = register("account", { required: "계정을 입력하세요.", minLength: 5 });
    const passwordRegister = register("password", { required: "비밀번호를 입력하세요.", minLength: 5 });
    const [login, { loading }] = useMutation<login>(LOGIN_MUTATION, {
        onCompleted: ({ login: { ok, token, error } }) => {
            if (ok && token !== null) {
                setCookie('jwt', token, {
                    path: "/",
                    secure: true,
                    sameSite: "none"
                });
                navigate("/");
            } else {
                setError("result", { message: error ?? undefined });
            }
        }
    });

    return (
        <AuthLayout>
            <Title title="로그인" />

            <FormWrap>
                <LogoWrap>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </LogoWrap>
                <form onSubmit={handleSubmit((variables) => loading ? null : login({ variables }))}>
                    <InputWrap>
                        {errors?.account?.message}
                        <Default.Input
                            {...accountRegister}
                            onChange={(e) => { clearErrors(); accountRegister.onChange(e) }}
                            type="text"
                            placeholder="Account"
                            style={{ height: 38 }} />
                    </InputWrap>
                    <InputWrap>
                        {errors?.password?.message}
                        <Default.Input
                            {...passwordRegister}
                            onChange={(e) => { clearErrors(); passwordRegister.onChange(e) }}
                            type="password"
                            placeholder="Password"
                            style={{ height: 38 }} />
                    </InputWrap>
                    <ButtonWrap>
                        {errors?.result?.message}
                        <Default.Button type="submit" disabled={!isValid || loading}>로그인</Default.Button>
                    </ButtonWrap>
                </form>
            </FormWrap>
            <FormWrap>
                <LinkWrap>
                    계정이 없으신가요?&nbsp;
                    <LinkButton to="/join">가입하기</LinkButton>
                </LinkWrap>
            </FormWrap>
        </AuthLayout>
    );
};

export default Login;