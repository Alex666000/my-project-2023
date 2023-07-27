import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/StoreProvider/config/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
/*
Теперь на UI используем useAppDispatch вместо обычного useDispatch
 */
