import React, { useState } from "react";
import { Category, Region } from "../types";

interface FilterProps {
	categories: Category[];
	regions: Region[];
	onFilterChange: (filters: {
		category: Category | "";
		region: Region | "";
	}) => void;
}

const Filter: React.FC<FilterProps> = ({
	categories,
	regions,
	onFilterChange,
}) => {
	const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
	const [selectedRegion, setSelectedRegion] = useState<Region | "">("");

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newCategory = e.target.value as Category | "";
		setSelectedCategory(newCategory);
		onFilterChange({ category: newCategory, region: selectedRegion });
	};

	const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newRegion = e.target.value as Region | "";
		setSelectedRegion(newRegion);
		onFilterChange({ category: selectedCategory, region: newRegion });
	};

	return (
		<div className="filter">
			<div className="filter__group">
				<label htmlFor="category">Catégorie : </label>
				<select
					id="category"
					value={selectedCategory}
					onChange={handleCategoryChange}
				>
					<option value="">toutes</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
				<label htmlFor="region">Département : </label>
				<select
					id="region"
					value={selectedRegion}
					onChange={handleRegionChange}
				>
					<option value="">tous</option>
					{regions.map((region) => (
						<option key={region} value={region}>
							{region}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default Filter;
