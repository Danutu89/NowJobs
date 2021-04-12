import { listenersStore } from './store';

export const addListener = (actionType: symbol | symbol[], callback: () => void): void => {
	listenersStore.update((prevState) => [...prevState, { actionType, callback }]);
};
