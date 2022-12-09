import type { ActionArgs} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { userPrefs } from "~/cookie";

export async function action({ request }: ActionArgs) {
    const cookieHeader = request.headers.get("Cookie");
    const cookie =
      (await userPrefs.parse(cookieHeader)) || {};


    const formData = await request.formData();
    const selectedNetwork = formData.get("selectedValue");

    cookie.selected_network = selectedNetwork;
  
    return redirect(request.headers.get("referer") || '/', {
      headers: {
        "Set-Cookie": await userPrefs.serialize(cookie),
      },
    });
  };