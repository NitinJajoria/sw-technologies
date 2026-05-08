import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.json();
    const filePath = path.join(process.cwd(), "enquires", "data.js");
    const dirPath = path.join(process.cwd(), "enquires");

    // Ensure directory exists
    try {
      await fs.access(dirPath);
    } catch (e) {
      await fs.mkdir(dirPath, { recursive: true });
    }

    // Read existing file or create new one
    let enquiries = [];
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      // Basic extraction of the array from "export const enquiries = [...];"
      const match = fileContent.match(/export const enquiries = (\[.*\]);/s);
      if (match) {
        enquiries = JSON.parse(match[1]);
      }
    } catch (e) {
      // File doesn't exist yet
    }

    // Add new enquiry with timestamp
    enquiries.push({
      ...data,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
    });

    // Write back to file
    const newContent = `export const enquiries = ${JSON.stringify(enquiries, null, 2)};`;
    await fs.writeFile(filePath, newContent, "utf-8");

    return new Response(
      JSON.stringify({ success: true, message: "Enquiry saved successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error saving enquiry:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to save enquiry" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
