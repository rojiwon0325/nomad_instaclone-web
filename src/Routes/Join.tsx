import { useMutation } from '@apollo/client';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Default, Title } from 'Components';
import { AuthLayout, ButtonWrap, FormWrap, InputWrap, LinkWrap, LogoWrap } from 'Components/auth';
import { LinkButton } from 'Components/pure';
import { newAccount } from 'Interfaces/Igql/newAccount';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { NEWACCOUNT_MUTATION } from 'State/Query/account';

interface IJoin {
    result: string;
    username: string;
    account: string;
    password: string;
}

const Join: React.FC = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isValid, errors }, getValues, setError, clearErrors } = useForm<IJoin>({
        mode: "onChange"
    });
    const usernameRegister = register("username", { required: "이름을 입력하세요.", minLength: 3 });
    const accountRegister = register("account", { required: "계정을 입력하세요.", minLength: 5 });
    const passwordRegister = register("password", { required: "비밀번호를 입력하세요.", minLength: 5 });

    const [join, { loading }] = useMutation<newAccount>(NEWACCOUNT_MUTATION, {
        onCompleted: ({ newAccount: { ok, error } }) => {
            if (ok) {
                const { account, password } = getValues();
                navigate("/account/login", { state: { account, password } });
            } else {
                setError("result", { message: error ?? undefined });
            }
        }
    });

    return (
        <AuthLayout>
            <Title title="회원가입" />
            <FormWrap>
                <LogoWrap>
                    <FontAwesomeIcon icon={faInstagram} size="3x" />
                </LogoWrap>
                <form onSubmit={handleSubmit((variables) => loading ? null : join({ variables }))}>
                    <InputWrap>
                        {errors?.username?.message}
                        <Default.Input
                            {...usernameRegister}
                            onChange={(e) => { clearErrors(); usernameRegister.onChange(e) }}
                            type="text" placeholder="Username" style={{ height: 38 }} />
                    </InputWrap>
                    <InputWrap>
                        {errors?.account?.message}
                        <Default.Input
                            {...accountRegister}
                            onChange={(e) => { clearErrors(); accountRegister.onChange(e) }}
                            type="text" placeholder="Account" style={{ height: 38 }} />
                    </InputWrap>
                    <InputWrap>
                        {errors?.password?.message}
                        <Default.Input
                            {...passwordRegister}
                            onChange={(e) => { clearErrors(); passwordRegister.onChange(e) }}
                            type="password" placeholder="Password" style={{ height: 38 }} />
                    </InputWrap>
                    <ButtonWrap>
                        {errors?.result?.message}
                        <Default.Button type="submit" disabled={!isValid || loading}>회원가입</Default.Button>
                    </ButtonWrap>
                </form>
            </FormWrap>
            <FormWrap>
                <LinkWrap>
                    계정이 있으신가요?&nbsp;
                    <LinkButton to="/account/login">로그인</LinkButton>
                </LinkWrap>
            </FormWrap>
        </AuthLayout>
    );
};

export default Join;