import { useDispatch } from "react-redux";
import { fetchPostById } from "../features/posts/postsAsyncThunks";
import { useEffect, useCallback } from "react";
import { AppDispatch } from "../app/store"; // Adjust the import to your store file

/**
 * 현재 fetchPosts로 데이터를 불러온 뒤에 postsSelector.ts에서 singlePost를 가져올 수 있으므로 일단 사용 보류하는 게 좋을 거 같습니다.
 *
 * @param {string} fetchUrl - The URL to fetch post by id.
 */

export default function useFetchPostById(fetchUrl: string) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(fetchPostById({ fetchUrl }))
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [dispatch, fetchUrl]);
}
