import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    let query = {};
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query = {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      };
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 }).lean();
    
    // Convert MongoDB ObjectId to string
    const formattedContacts = contacts.map(contact => ({
      ...contact,
      _id: contact._id.toString()
    }));
    
    return NextResponse.json(formattedContacts);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const contact = await Contact.create(data);
    
    // Return the created contact with string ID
    return NextResponse.json({ 
      ...contact.toObject(), 
      _id: contact._id.toString() 
    }, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json(
      { error: "Failed to create contact" },
      { status: 500 }
    );
  }
}