import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import Airtable from "airtable";
import { validateEmail } from "~/utils/utils";

/**
 * Save email adress of the user in Airtable
 * 
 * @param { ActionArgs } request
 * @returns { json } Returns a json containing either the error message or the success message
 */
export async function action({ request }: ActionArgs) {
    const email = (await request.formData()).get("email");

    const API_KEY = process.env.AIRTABLE_API_KEY;
    const USER_TABLE = process.env.AIRTABLE_USER_BASE || '';
    const base = new Airtable({ apiKey: API_KEY }).base(USER_TABLE);

    try {
        if (false === validateEmail(email?.toString())) {
            return json({ error: "Please enter a valid email address" });
        }
        const alreadyExists = await base('email').select({filterByFormula: `{email} = "${email}"`}).all();

        if (alreadyExists.length > 0) {
            return json({ message: "Thanks for joining!" });
        }

        base('email').create({
            email: email?.toString(),
            "creation_date": new Date().toUTCString()
            }, function(err, record) {
            if (err) {
                return json({ error: "Please enter a valid email address" });
            }
        });
        return json({ message: "Thanks for joining!" });
    } catch (error) {
        return json({ error: "Your email has not been saved. Please try again later." });
    }
  }