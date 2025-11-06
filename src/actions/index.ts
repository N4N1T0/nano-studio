import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  contact: defineAction({
    accept: "form",
    input: z.object({
      name: z.string().min(2, "Name must be at least 2 characters long"),
      email: z.string().email("Please enter a valid email address"),
      message: z.string(),
    }),
    handler: async ({ name, email, message }) => {
      try {
        const { data, error } = await resend.emails.send({
          from: "nano studio contact <new-contact@nanostudio.pro>",
          to: ["adrian.alvarezalonso1991@gmail.com", "dayana.abuinr@gmail.com"],
          subject: `New inquiry from ${name} - nano studio`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">New Inquiry - nano studio</h2>

              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #334155; margin-top: 0;">Client Information</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
              </div>

              <div style="background-color: #fff; padding: 20px; border-left: 4px solid #1e40af; margin: 20px 0;">
                <h3 style="color: #334155; margin-top: 0;">Message</h3>
                <p style="line-height: 1.6; color: #475569;">${message.replace(
                  /\n/g,
                  "<br>"
                )}</p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
                <p>This message was sent from the nano studio contact form.</p>
                <p>Date: ${new Date().toLocaleString("en-US")}</p>
              </div>
            </div>
          `,
        });

        if (error) {
          throw new ActionError({
            stack: error.name,
            code: "BAD_REQUEST",
            message: "Error sending the email. Please try again.",
          });
        }

        return {
          success: true,
          message:
            "Thank you for your inquiry! We will get in touch with you soon.",
          emailId: data?.id,
        };
      } catch (error: any) {
        throw new ActionError({
          stack: error.name,
          code: "INTERNAL_SERVER_ERROR",
          message: error,
        });
      }
    },
  }),
};
