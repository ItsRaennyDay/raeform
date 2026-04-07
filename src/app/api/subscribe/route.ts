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
    
    // Build form data (application/x-www-form-urlencoded)
    const formData = new URLSearchParams()
    formData.append("name", body.name || "")
    formData.append("email", body.email || "")
    formData.append("interest", body.interest || "")
    formData.append("message", body.message || "")

    try {
      const response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      })

      console.log("Sent to Google Apps Script")
    } catch (googleError) {
      console.error("Error sending to Google Apps Script:", googleError)
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
