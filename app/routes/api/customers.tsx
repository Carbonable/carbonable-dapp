import { json, type ActionArgs } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
    const parsedBody = await request.json();
    const backendUrl = process.env.CUSTOMER_API_URL;
    
    const response = await fetch(`${backendUrl}/customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedBody),
    });

    if (!response.ok) {
        console.error(`Failed to create customer ${parsedBody}`);
    }
    return json({ ok: true });
  }