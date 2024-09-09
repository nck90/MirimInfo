// src/app/api/announcements/route.ts
import { NextResponse } from 'next/server';
import { getAllAnnouncements, createAnnouncement } from '../../../services/announcements/announcements.service';

export async function GET() {
  try {
    const result = await getAllAnnouncements();
    if (result.success) {
      return NextResponse.json(result.announcements);
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.error('Failed to fetch announcements:', error);
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await createAnnouncement(data);
    if (result.success) {
      return NextResponse.json(result.announcement);
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.error('Failed to add announcement:', error);
    return NextResponse.error();
  }
}
