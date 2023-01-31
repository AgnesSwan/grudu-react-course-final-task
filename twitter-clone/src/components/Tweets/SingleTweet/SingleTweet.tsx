import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../../../recoil/atom';
import { Tweet } from '../../../types/tweet';
import { User } from '../../../types/user';
import { getUser } from '../../../utils/utils';
import './SingleTweet.css';

interface SingleTweetProps {
    tweet: Tweet;
};

const SingleTweet: React.FC<SingleTweetProps> = ({ tweet }) => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoAtom);

    useEffect(() => {
        getUser(tweet.author_id).then(res => {
            setUserInfo(res)
        }).catch(error => {
            console.log(error);
        });
    }, [tweet])

    return (
        <div className="tweet-container">
            <div className='user-icon'><div className="circle">{(userInfo as User)?.name?.split(" ").map((n) => n[0]).join("")}</div></div>
            <div className="content-container">
                <h2>{tweet.author_id}</h2>
                <p dangerouslySetInnerHTML={{ __html: tweet.text }} ></p>
            </div>
        </div>
    );
}
export default SingleTweet;