import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PaginationOptionsDataType } from "../../../types/commonType";
export default function Pagination({ totalPage, pageCountPerGroup, currentPage }: Omit<PaginationOptionsDataType, "itemCountPerPage">) {
    //totalPage: 전체 페이지 수, pageCountPerGroup : 한 묶음당 보여줄 페이지 수, currentPage : 현재 페이지

    const [startingPage, setStartingPage] = useState(1); //각 페이지 그룹의 가장 첫 번째 페이지(가장 좌측)
    const noPrevPage = startingPage === 1;
    const noNextPage = startingPage + pageCountPerGroup - 1 >= totalPage; // startingPage + pageCountPerGroup - 1 => 현재 페이지 그룹의 마지막 페이지가 totalPages보다 크거나 같은 경우에만 다음 버튼을 비활성

    useEffect(() => {
        if (currentPage === startingPage + pageCountPerGroup) setStartingPage(prev => prev + pageCountPerGroup); // 다음 누를 때 마다 startingPage 최신화(1->6->11)
        if (currentPage < startingPage) setStartingPage(prev => prev - pageCountPerGroup); // 이전 누를 때 마다 startingPage 최신화(11->6->1)
    }, [currentPage, pageCountPerGroup, startingPage])

    return (
        <div className="flex justify-center items-center my-4 text-[#888] text-sm">
            <ul className="list-none flex flex-row">
                <li key="prev" className={`custom_pagination_li custom_pagination_move ${noPrevPage ? 'invisible' : ''}`}
                >
                    <Link to={`?page=${startingPage - 1}`} className="h-6 leading-6">이전</Link>
                </li>
                {[...Array(pageCountPerGroup)].map((_, i) =>
                    startingPage + i <= totalPage && (
                        <li key={startingPage + i}>
                            <Link
                                className={`mx-1 block cursor-pointer w-6 border-solid rounded-full text-center no-underline ${currentPage === startingPage + i ? 'font-bold bg-[#2f5d62] text-white' : ''}`}
                                to={`?page=${startingPage + i}`}>
                                {startingPage + i}
                            </Link>
                        </li>
                    )
                )}
                <li key="next" className={`custom_pagination_li custom_pagination_move ${noNextPage} ? invisible : ''`} >
                    <Link to={`?page=${startingPage + pageCountPerGroup}`}>다음</Link>
                </li>
            </ul>
        </div>
    )
}