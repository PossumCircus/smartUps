/**
 * Converts a given date string or timestamp to a formatted string in Korean time (Asia/Seoul).
 *
 * @param {string | number} createdAtProp - The date string or timestamp to convert.
 * @returns {string} - The formatted date string in Korean time.
 * @throws {Error} - Throws an error if the input type is not a string or number.
 */
export default function krTimeConvert(createdAtProp: string | number): string {
    //runtime type checks
    if (typeof createdAtProp !== "string" && typeof createdAtProp !== "number") {
      throw new Error("Invalid input type. Expected a string or number.");
    }
  
    const date = new Date(createdAtProp);
    const koreanTime = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );
    const year = koreanTime.getFullYear(); // 연도
    const month = koreanTime.getMonth() + 1; // 월 (0부터 시작하므로 +1)
    const day = koreanTime.getDate(); // 일
    const hours = koreanTime.getHours(); // 시
    const minutes = koreanTime.getMinutes(); // 분
    const postCreatedAtByKrTime = `${year}/${month}/${day}-${hours}시${minutes}분`;
  
    return postCreatedAtByKrTime;
  }
