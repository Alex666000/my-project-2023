import { User } from 'entities/User';

export interface Comment {
    id: string;
    user: User; // весь пользователь целиком - чтобы понятно кто коммент отправил
    text: string;
}
