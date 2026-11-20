
const nodemailer = require("nodemailer");

// Temporary email history (until MongoDB is connected)
let emailHistory = [];

// Send bulk emails
const sendBulkEmail = async (req, res) => {
    try {
        const { subject, body, recipients } = req.body;

        // Validation
        if (!subject || !body || !recipients || !recipients.length) {
            return res.status(400).json({
                success: false,
                message: "Subject, body and recipients are required."
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const results = await Promise.allSettled(
            recipients.map(async (email) => {
                const info = await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject,
                    text: body
                });

                return {
                    email,
                    status: "Sent",
                    messageId: info.messageId
                };
            })
        );

        const recipientResults = results.map((result, index) => {
            if (result.status === "fulfilled") {
                return result.value;
            }

            return {
                email: recipients[index],
                status: "Failed",
                error: result.reason.message
            };
        });

        const sentCount = recipientResults.filter(
            item => item.status === "Sent"
        ).length;

        const record = {
            id: Date.now(),
            subject,
            body,
            recipients: recipientResults,
            sentCount,
            failedCount: recipients.length - sentCount,
            date: new Date()
        };

        emailHistory.unshift(record);

        return res.status(200).json({
            success: true,
            message: "Bulk email process completed.",
            sentCount,
            failedCount: recipients.length - sentCount,
            results: recipientResults
        });

    } catch (error) {
        console.error("Email sending error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to process emails."
        });
    }
};

// Fetch email history
const getEmailHistory = (req, res) => {
    res.status(200).json({
        success: true,
        history: emailHistory
    });
};

module.exports = {
    sendBulkEmail,
    getEmailHistory
};
