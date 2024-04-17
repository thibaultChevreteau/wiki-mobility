export enum Category {
	Amenagement = "amenagement",
	Materiel = "materiel",
	Sensibilisation = "sensibilisation",
	Other = "autre",
}

export enum Region {
	Occitanie = "occitanie",
	NouvelleAquitaine = "nouvelle-aquitaine",
	Other = "autre",
}

export interface Solution {
	id: string;
	name: string;
	description: string;
	category: Category;
	img: string;
	region: Region;
	googlePlusCode: string;
	website?: string;
	contact?: string;
	details?: string;
}

export type NewSolution = Omit<Solution, "id">;
