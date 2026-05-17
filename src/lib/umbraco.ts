const UMBRACO_URL =
	import.meta.env.PUBLIC_UMBRACO_URL;

export interface RouteItem {
	id: string;
	name: string;
	path: string;
	contentType: string;
	updateDate: string;
}

export async function getRoutes(): Promise<RouteItem[]> {
	const response = await fetch(
		`${UMBRACO_URL}/api/routes`
	);

	if (!response.ok) {
		throw new Error(
			"Failed to fetch routes"
		);
	}

	return response.json();
}

export async function getPageByRoute(
	path: string
) {
	const cleanPath = path.replace(
		/^\/|\/$/g,
		""
	);

	const url = cleanPath
		? `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/${cleanPath}`
		: `${UMBRACO_URL}/umbraco/delivery/api/v2/content/item/home`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(
			`Failed to fetch page: ${path}`
		);
	}

	return response.json();
}

export function getMediaUrl(url?: string) {
	if (!url) {
		return "";
	}

	// Already absolute
	if (url.startsWith("http")) {
		return url;
	}

	return `${UMBRACO_URL}${url}`;
}
