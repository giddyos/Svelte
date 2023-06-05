import { writable } from 'svelte/store';

interface ErrorObject {
	title: string;
	message: string;
}

interface ErrorsStore {
	[category: string]: ErrorObject[];
}

function CreateErrorStore() {
	const { subscribe, set, update } = writable<ErrorsStore>({});

	return {
		subscribe,
		add: (category: string, error: ErrorObject, reset: boolean = true) =>
			update((errors: ErrorsStore) => {
				if (!errors[category] || reset === true) {
					errors[category] = [];
				}
        
				errors[category].push(error);
				return errors;
			}),
		remove: (category: string, index: number) =>
			update((errors: ErrorsStore) => {
				errors[category].splice(index, 1);
				return errors;
			}),
		clear: (category: string) =>
			update((errors: ErrorsStore) => {
				errors[category] = [];
				return errors;
			}),
		reset: () => set({})
	};
}

export const errors = CreateErrorStore();
