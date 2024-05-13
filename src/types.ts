export enum Category {
	Amenagement = "AMÉNAGEMENT",
	Vehicule = "VÉHICULE",
	Application = "APPLICATION",
	Sensibilisation = "SENSIBILISATION",
	Ateliers = "ATELIER",
	Other = "AUTRE",
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
	imgId: string;
	region: Region;
	googlePlusCode: string;
	website?: string;
	contact?: string;
	details?: string;
}

export type NewSolution = Omit<Solution, "id">;
