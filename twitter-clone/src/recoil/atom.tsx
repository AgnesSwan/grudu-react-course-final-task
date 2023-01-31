import { atom } from 'recoil';
import { Tweet } from '../types/tweet';
import { AuthenticatedUser, User } from '../types/user';

export const defaultUser = {
    id: '',
    name: '',
    email: '',
    password: '',
}

const defaultAuthenticatedUser = {
    isAuthenticated: false,
    user: defaultUser
}

export const authenticatedUserAtom = atom<AuthenticatedUser>({
    key: 'userAuth',
    default: defaultAuthenticatedUser
})

export const userInfoAtom  = atom<User>({
    key: 'userInfo',
    default: defaultUser
})

export const refreshAtom = atom({
    key: 'refresh',
    default: false
});

export const tweetsListAtom = atom<Tweet[]>({
    key: 'tweetsList',
    default: []
});

export const ErrorAtom = atom<boolean>({
    key: 'error',
    default: false
}); 

export const Error404Atom = atom<boolean>({
    key: 'error404',
    default: false
}); 