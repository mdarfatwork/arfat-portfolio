import { GET as claimGET, POST as claimPOST, OPTIONS as claimOPTIONS } from "@/app/api/auth/claim/route";

export const dynamic = "force-dynamic";

export const GET = claimGET;
export const POST = claimPOST;
export const OPTIONS = claimOPTIONS;
