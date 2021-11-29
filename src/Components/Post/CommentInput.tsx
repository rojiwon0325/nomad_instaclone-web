import { useMutation, gql } from '@apollo/client';
import { newComment } from 'Interfaces/Igql/newComment';
import { seePost_seePost_detail } from 'Interfaces/Igql/seePost';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NEWCOMMENT_MUTATION } from 'State/Query/post';
import styled from 'styled-components';

const CommentInput: React.FC<{ postId: number, rootId?: number }> = ({ postId, rootId }) => {
    const { register, handleSubmit, setValue, formState: { isValid }, setError } = useForm<{ text: string }>({ mode: "onChange" });
    const textRegister = register("text", { required: true });
    const [newComment, { loading }] = useMutation<newComment>(NEWCOMMENT_MUTATION, {
        update: (cache, result) => {
            setValue("text", "");
            setError("text", {});
            if (result.data?.newComment.ok && result.data.newComment.comment) {
                const cmt = cache.writeFragment({
                    data: result.data.newComment.comment,
                    fragment: gql`
                        fragment BSName on Comment{
                            id
                            text
                            rootId
                            account
                            createdAt
                            _count{
                                reComment
                            }
                            isMine
                        }
                    `,
                });
                cache.modify({
                    id: `Post:${postId}`,
                    fields: {
                        detail: (prev: seePost_seePost_detail) => ({
                            ...prev,
                            comments: [...prev.comments, cmt]
                        }),
                    }
                });
            }
        },

    });
    return (
        <Container onSubmit={handleSubmit(({ text }) => loading ? null : newComment({ variables: { postId, rootId, text } }))}>
            <Form>
                <TextArea
                    {...textRegister}
                    onChange={
                        (e) => {
                            const target = e.currentTarget;
                            target.style.height = "1px";
                            target.style.height = target.scrollHeight + "px";
                            textRegister.onChange(e);
                        }
                    }
                    placeholder="댓글 달기..."></TextArea>
                <Submit disabled={loading || !isValid}>게시</Submit>
            </Form>
        </Container>
    );
};

const Submit = styled.button`
    color: ${({ theme }) => theme.primary};
    display: inline;
    position: relative;
    appearance: none;
    text-overflow: ellipsis;
    text-align: center;
    user-select: none;
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
    padding-left: 7px;
    &:disabled{
        opacity: .3;
        pointer-events: none;
    }
`;

const TextArea = styled.textarea.attrs({
    ariaLabel: "comment",
    autoCapitalize: "off",
    autoComplete: "off",
    autoCorrect: "off"
})`
    background: 0 0;
    border: none;
    color: ${({ theme }) => theme.text};
    &::placeholder{
        color: ${({ theme }) => theme.subtext};
    }
    display: flex;
    flex: 1;
    font-size: 14px;
    line-height: 18px;
    max-height: 80px;
    height: 18px;
    outline: 0;
    padding: 0;
    resize: none;
    width: 0;
`;

const Form = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1 1;
    position: relative;
`;

const Container = styled.section`
    padding: 6px 16px;
    border-top: 1px solid ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    line-height: 18px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    position: relative;
    pointer-events: auto;
    @media only screen and (max-width:735px){
        display: none;
    };
`;

export default CommentInput;