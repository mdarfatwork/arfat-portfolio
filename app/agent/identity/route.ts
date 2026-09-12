import { GET as registerGET, POST as registerPOST, OPTIONS as registerOPTIONS } from "@/app/api/auth/register/route";

export const dynamic = "force-dynamic";

export const GET = registerGET;
export const POST = registerPOST;
export const OPTIONS = registerOPTIONS;
