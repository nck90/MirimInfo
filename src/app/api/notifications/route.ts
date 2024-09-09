// src/app/api/notifications/route.ts
import { NextResponse } from 'next/server';
import { getAllNotifications, createNotification } from '../../../services/notifications/notifications.service';

export async function GET() {
  try {
    const result = await getAllNotifications();
    if (result.success) {
      return NextResponse.json(result.notifications);
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.error('Failed to fetch notifications:', error);
    return NextResponse.error();
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const result = await createNotification(data);
    if (result.success) {
      return NextResponse.json(result.notification);
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.error('Failed to add notification:', error);
    return NextResponse.error();
  }
}
