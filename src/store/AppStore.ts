import { defineStore } from 'pinia';
export interface State {
	test: number;
}

export const useAppStore = defineStore('main', {
	state(): State {
		return {
			test: 5,
		};
	},
});
