import React from 'react';

export default async function SearchPage({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const { category } = await params;
	return <div>{category}</div>;
}
