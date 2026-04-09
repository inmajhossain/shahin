import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // Await the params to get the id
    const { id } = await params;
    
    console.log("Deleting contact with ID:", id);

    if (!id) {
      return NextResponse.json(
        { error: "No ID provided" },
        { status: 400 }
      );
    }

    // Try to find and delete the contact
    const deletedContact = await Contact.findByIdAndDelete(id);
    
    if (!deletedContact) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Submission deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete submission" },
      { status: 500 }
    );
  }
}

// Optional: Add GET by ID if needed
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "No ID provided" },
        { status: 400 }
      );
    }

    const contact = await Contact.findById(id);

    if (!contact) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch submission" },
      { status: 500 }
    );
  }
}