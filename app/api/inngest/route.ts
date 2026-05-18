import {serve} from "inngest/next";
import {inngest} from "@/lib/inngest/client";
import { sendSignUpEmail} from "@/lib/inngest/functions";
// sendDailyNewsSummary is currently disabled but is ready. It will be re-enabled om demand.
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [sendSignUpEmail],
})