export interface Profile {
    username: string;
    bio: string;
    image: string;
    following: boolean;
}

export const initialProfile = {
    username: '',
    bio: '',
    image: '',
    following: false
};
