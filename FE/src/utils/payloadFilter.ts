import { Post } from "../types/commonType";

/**
 * Filters the payload data by the specified category or topic.
 *
 * @param {Data} data - The data object containing the payload to filter.
 * @param {string} categoryOrTopic - The category or topic to filter by.
 * @returns {Post[]} - The filtered array of posts that match the category or topic.
 */
export default function payloadFilter(data: Post[], categoryOrTopic: string): Post[] {
  const filteredData = data.filter(post =>
    typeof post.topic === 'string' &&
    post.topic.length > 1 &&
    post.topic.includes(categoryOrTopic)
  );

  return filteredData;
}

// export default function payloadFilter(data, categoryOrTopic) {

//     const filteredData =
//         data.filter(post => typeof post.topic === 'string'
//             && post.topic.length > 1
//             && post.topic.includes(categoryOrTopic))
//     return filteredData
// }


// 최적화된 알고리즘 선택: 현재 코드는 filter 메서드를 사용하여 배열을 반복하고 각 항목을 검사합니다. 이 방법은 일반적으로 작은 데이터셋에는 효율적이지만, 대규모 데이터셋의 경우 성능에 영향을 줄 수 있습니다. 대신 선형 검색보다 빠른 알고리즘을 사용하는 것이 좋을 수 있습니다.

// 인덱싱: 데이터가 정렬되어 있다면 이진 검색을 사용하여 빠르게 항목을 찾을 수 있습니다. 주제 또는 카테고리가 데이터에서 일정한 패턴으로 나타난다면 이를 활용하여 빠른 검색을 할 수 있습니다.

// 조건 최적화: 현재 코드는 각 게시물의 주제가 문자열이고 길이가 1보다 크며 주어진 카테고리 또는 주제를 포함하는지 확인합니다. 이 조건들을 최적화하여 불필요한 조건을 제거하고, 더 효율적인 검색을 할 수 있습니다.

// 메모이제이션: 함수의 결과를 캐시하여 이전에 동일한 입력에 대해 계산된 결과를 재사용할 수 있습니다. 이를 통해 중복 계산을 줄이고 성능을 향상시킬 수 있습니다.

// 병렬 처리: 데이터가 충분히 크고 병렬 처리가 가능하다면, 데이터를 병렬로 처리하여 처리 시간을 단축시킬 수 있습니다.

// 테스트와 프로파일링: 실제 데이터에 대해 테스트하고 성능을 프로파일링하여 병목 현상을 찾고 개선할 수 있습니다.