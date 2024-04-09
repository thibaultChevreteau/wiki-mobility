export interface Solution {
	id: string;
	name: string;
	description: string;
	img: string;
	googlePlusCode: string;
	details?: string;
}

export type NewSolution = Omit<Solution, "id">;
