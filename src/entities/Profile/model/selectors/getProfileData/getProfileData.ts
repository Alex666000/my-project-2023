import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileData = (state: StateSchema) => state.profile?.form;

/*
- чтобы data не было "андефайнд" то ? но лучше поставить строгий режим в ТС
- Далее создаем ProfileCard и там достаем эти селекторы -->
 */
