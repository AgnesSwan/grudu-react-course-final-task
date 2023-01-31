import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import _ from "lodash";
import { Tweet } from "../../../types/tweet";
import './TweetForm.css';
import { authenticatedUserAtom, refreshAtom, tweetsListAtom } from "../../../recoil/atom";


const TweetForm: React.FC = () => {
    const { user } = useRecoilValue(authenticatedUserAtom);
    const setTweets = useSetRecoilState(tweetsListAtom);
    const setShouldRefresh = useSetRecoilState(refreshAtom);
    const [isError, setIsError] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<Tweet>({
        defaultValues: {
            id: '',
            author_id: user.id,
            text: ''
        }, criteriaMode: "all"
    });

    const onSubmit = async (data: Tweet) => {
        try {
            const result = await axios.post('http://localhost:3001/tweets', data);
            setTweets(result.data);
            setShouldRefresh(true);
        }
        catch (error) {
                setIsError(true);
              }
        reset()
    }

    if (isError) {
        return <Navigate to='/error' />
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type='text'
                {...register("text", {
                    minLength: { value: 1, message: 'Tweet is too short' }, maxLength: { value: 14, message: 'Tweet is too long' }, required: "This is required."
                })}
                placeholder='Whats happening?'
                className="tweet-input"
                name="text"
            />
            <ErrorMessage
                errors={errors}
                name="text"
                render={({ messages }) => {
                    return messages
                        ? _.entries(messages).map(([type, message]) => (
                            <p className='invalid-input' key={type}>{message}</p>
                        ))
                        : null;
                }}
            />
            <div className='button-tweet'>
                <button type='submit'>Tweet</button>
            </div>
        </form>
    );
};

export default TweetForm;