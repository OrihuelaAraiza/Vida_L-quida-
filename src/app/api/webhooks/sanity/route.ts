import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const documentType: string = body._type ?? body.body?._type;

  if (documentType === "product") {
    revalidatePath("/productos", "page");
    revalidatePath("/", "page");
  } else if (documentType === "category") {
    revalidatePath("/productos", "page");
  } else if (documentType === "post") {
    revalidatePath("/blog", "page");
  }

  return NextResponse.json({ revalidated: true });
}
