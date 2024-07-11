export default function setSortParams(newProperty, setSort) {
	setSort((prev) => {
		if (prev.property === newProperty) return { property: newProperty, asc: !prev.asc };
		else return { property: newProperty, asc: true };
	});
}
