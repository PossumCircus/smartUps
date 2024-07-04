import { useState, useEffect } from 'react'
import useGetQuery from './useGetQuery';
import { PaginationOptionsType } from "../types/commonType";

export default function usePagination(dataLength: number, itemCount: number)
    : [
        React.Dispatch<React.SetStateAction<number>>,
        React.Dispatch<React.SetStateAction<number>>,
        PaginationOptionsType
    ] {
    const page = useGetQuery("page")

    // 총 데이터 길이
    const [totalDataLength, setTotalDataLength] = useState<number>(dataLength)

    // 페이지 당 보여줄 데이터 숫자. 현재 임시값
    const [itemCountPerPage, setItemCountPerPage] = useState<number>(itemCount);

    useEffect(() => {
        setTotalDataLength(dataLength)
        setItemCountPerPage(itemCount)
    }, [dataLength, itemCount])

    const paginationOptions: PaginationOptionsType = {
        // 페이지네이션 한 그룹당 보여줄 페이지 수
        pageCountPerGroup: 5,
        currentPage: page && parseInt(page) > 0 ? parseInt(page) : 1,
        totalPage: Math.ceil(totalDataLength / itemCountPerPage),
        itemCountPerPage
    }

    return [setTotalDataLength, setItemCountPerPage, paginationOptions]
}
