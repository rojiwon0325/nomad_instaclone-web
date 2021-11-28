import { useState } from "react";
import styled from "styled-components";
import { Item } from "./PostPure";


const Photos: React.FC<{ photos: string[] }> = ({ photos }) => {
    const [page, setPage] = useState(0);
    const onClick = (isNext: boolean) => {
        if (isNext) {
            setPage((pre) => {
                const val = pre + 1;
                return val >= 0 && val < photos.length ? val : pre;
            });
        } else {
            setPage((pre) => {
                const val = pre - 1;
                return val >= 0 && val < photos.length ? val : pre;
            });
        }
    };
    return (
        <Item>
            <div style={{ paddingBottom: "100%" }} />
            <PhotoList>
                {photos.map((photo, idx) => (
                    <Photo key={photo + idx} style={{ transform: `translateX(${-100 * page + "%"})` }}>
                        <img src={photo} alt={idx + ""} />
                        <Btn style={{ left: 0 }} onClick={() => onClick(false)} />
                        <Btn style={{ right: 0 }} onClick={() => onClick(true)} />
                    </Photo>))}
            </PhotoList>
            <Pagination page={page}>{photos.map((_, idx) => <div key={idx} />)}</Pagination>
        </Item>
    );
};

const PhotoList = styled.ul`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex: 0 0 auto;
    overflow: hidden;
    position: absolute;
    align-items: stretch;
    align-content: stretch;
    justify-content: flex-start;
`;

const Photo = styled.li`
    padding-left: 100%;
    height: 100%;
    background-color:black;
    position: relative;
    transition: all .2s ease-in-out;
    transform: translateX(-100%);
    img{
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;

const Btn = styled.button`
    top: 50%;
    width: 25%;
    height: 30%;
    padding: 16px 8px;
    position: absolute;
    transform: translateY(-50%);
    pointer-events: all;
    background-color: transparent;
`;

const Pagination = styled.div<{ page: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: -21px;
    div{
        z-index: 2;
        margin-right: 4px;
        width: 6px;
        height: 6px;
        transition: all .2s ease-in-out;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.subtext};
    }
    div:nth-child(${({ page }) => page + 1}){
        background-color: ${({ theme }) => theme.primary};
    }
`;

export default Photos;