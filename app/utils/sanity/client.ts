import { config } from "./config";
import sanityClient from '@sanity/client';

// Standard client for fetching data
export const client = sanityClient(config)
