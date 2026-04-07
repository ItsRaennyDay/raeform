import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: "Name and email are required" },
        { status: 400 }
      )
    }

    // Send to Google Apps Script webhook
    const googleScriptUrl = "https://script.google.com/macros/s/AKfycbw8J2BU4mhpOthMl3Ran1cJLV8ElFqhmXbi8X_OW-_A6qjzfTrh7SMi0fYmgNBxPNLu/exec"
    
    try {
      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: body.name,
          email: body.email,
          interest: body.interest || "",
          message: body.message || "",
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) {
        console.warn("Google Apps Script returned non-200 status:", response.status)
      }
    } catch (googleError) {
      console.error("Error sending to Google Apps Script:", googleError)
      // Don't fail the request if Google Script fails
    }

    console.log("Form submission received:", body)

    return NextResponse.json(
      { success: true, message: "Thank you for joining!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
