import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type RouteParams = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, props: RouteParams) {
  const { id } = await props.params;

  try {
    const externalUrl = new URL(`/cars/${id}`, BASE_URL);

    const res = await fetch(externalUrl.toString(), {
      headers: {
        accept: "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch car from external API" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching car by id:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
