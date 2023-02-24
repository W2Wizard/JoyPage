import { AUTHORIZATION } from '$env/static/private';
import { myData } from '$lib/stores/data';

/**
 * Handle incoming POST requests.
 * @param request The request and response objects
 * @returns The response to the client.
 */
export const POST = ({request}: {request: Request}) => {
	const authHeader = request.headers.get('Authorization');

	if (!authHeader || authHeader !== AUTHORIZATION) {
		return new Response(JSON.stringify({
			message: 'You are not authorized to access this resource'
		}), { status: 401 });
	}

	myData.update(data => {
		data.push(Math.random() * 100);
		return data;
	});

	return new Response(JSON.stringify({
		message: 'Authorized and processed!'
	}), { status: 200 });
}