import { error } from '@sveltejs/kit';
import {prayers} from "../../../data/prayers/prayers"


export function load({params}) {

	const prayer = prayers.find((prayer) => prayer.name === params.name);

	if (!prayer) throw error(404);
	
	return {
		prayer
	};
}

