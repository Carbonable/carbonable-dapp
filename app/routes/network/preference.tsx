import type { ActionArgs} from "@remix-run/node";
import { redirect } from "@remix-run/node";

export async function action({ request }: ActionArgs) {

    const formData = await request.formData();
    const selectedNetwork = formData.get("selectedValue");

    const redirectPath = selectedNetwork === 'testnet' ? 'https://testnet.carbonable.io' : 'https://app.carbonable.io';
  
    return redirect(redirectPath);
  };