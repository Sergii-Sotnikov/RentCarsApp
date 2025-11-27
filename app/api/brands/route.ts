

import { NextResponse } from "next/server";
import type { BrandsResponse } from "@/types/car";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL


export async function GET() {
  try {
    const res = await fetch(`${BASE_URL}/brands`, {
      headers: {
        accept: "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch brands from external API" },
        { status: res.status }
      );
    }

    const data: BrandsResponse = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching brands:", error);
    return NextResponse.json(
      { message: "Internal server error while fetching brands" },
      { status: 500 }
    );
  }
}
