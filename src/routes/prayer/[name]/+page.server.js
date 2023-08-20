import { error } from '@sveltejs/kit';
import { prayers } from "../../../data/prayers/prayers"


export function load({params}) {

	// get prayer by matching parameter
	const prayer = prayers.find((prayer) => prayer.name === params.name);

	// throw error if prayer not found
	if (!prayer) throw error(404);

	return {
		prayer
	};
}

