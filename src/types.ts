export interface Solution {
	id: string;
	name: string;
	description: string;
	img: string;
}

export type NewSolution = Omit<Solution, "id">;
