import styled from "styled-components";


export const Item = styled.div`
    background-color: ${({ theme }) => theme.bar};
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    align-items: stretch;
    position: relative;
    pointer-events: none;
    min-width: 335px;
    max-width: 600px;
`;