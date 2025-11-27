
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const externalUrl = new URL("/cars", BASE_URL);

  searchParams.forEach((value, key) => {
    externalUrl.searchParams.set(key, value);
  });

  const res = await fetch(externalUrl.toString(), {
    headers: {
      accept: "application/json",
    },
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch cars from external API" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
