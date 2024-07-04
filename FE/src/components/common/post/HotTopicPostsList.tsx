import { Link } from 'react-router-dom';
import { PostDataType } from "../../../types/postsType"

interface HotTopicPostsListProp {
    posts: PostDataType[];
}

const HotTopicPostsList: React.FC<HotTopicPostsListProp> = () => {
    // createdAt에 기반해서 하루 단위로 sorting 하게 추가.
    return (
        <div className="max-md:h-1/5 bg-slate-300">
            인기글
            <div>
                {/* {posts.map((v, i, arr) => {
                    const sorted = arr.sort((a, b) => b.likes - a.likes)
                    return (
                        <ul key={i}>
                            <Link to={`post/${v.id}`}>{sorted[i].title}</Link>
                        </ul>
                    )
                }
                )} */}
            </div>
        </div>
    )
}
export default HotTopicPostsList