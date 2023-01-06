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
    
    const pathArray = request.headers.get("referer")?.split( '/' );
    const redirectPath = pathArray?.length === 0 || pathArray === undefined ? '/' : pathArray[0] + "//" + pathArray[2] + "/" + pathArray[3];
  
    return redirect(redirectPath, {
      headers: {
        "Set-Cookie": await userPrefs.serialize(cookie),
      },
    });
  };