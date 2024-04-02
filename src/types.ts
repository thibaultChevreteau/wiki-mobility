export interface Solution {
	id: string;
	name: string;
	description: string;
}

export type NewSolution = Omit<Solution, "id">;
