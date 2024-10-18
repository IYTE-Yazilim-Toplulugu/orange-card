import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    service: process.env.SENDER_EMAIL_SERVICE,
    auth: {
        user: process.env.SENDER_EMAIL_ADDRESS,
        pass: process.env.SENDER_EMAIL_PASS
    },
});


export const sendChangePassEmail : ({ receiver, token } : { receiver: string; token: string }) => Promise<boolean> = async ({ receiver, token } : { receiver: string; token: string }) => {
    try {
        await transport.verify();
    } catch (error) {
        console.log(error);
        return false;
    }

    try {
        await transport.sendMail({
            from: process.env.SENDER_EMAIL_SERVICE,
            to: receiver,
            subject: "Change Your İYTE Yazılım Password",
            html: `
            <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Şifre Değiştirme Talebi</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 20px auto;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #FF6600;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            color: #333333;
            line-height: 1.6;
        }
        .cta-button {
            display: block;
            width: 80%;
            max-width: 300px;
            margin: 20px auto;
            padding: 15px;
            background-color: #FF6600; /* Turuncu renk */
            color: #ffffff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
            font-weight: bold;
        }
        .footer {
            background-color: #f4f4f4;
            color: #666666;
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }
        .footer a {
            color: #FF6600;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            Şifrenizi Yenileyin
        </div>
        <div class="content">
            <p>Merhaba,</p>
            <p>Şifrenizi değiştirmek için bir talepte bulundunuz. Şifrenizi yenilemek için lütfen aşağıdaki butona tıklayın:</p>
            <a href="https://orange.iyteyazilim.online/change-password?token=${token}" class="cta-button">Şifrenizi Değiştirin</a>
            <p>Eğer bu talebi siz yapmadıysanız, lütfen bu e-postayı dikkate almayın. Hesabınız güvende kalacaktır.</p>
            <p>Sevgilerle,<br>Turuncu Tik Ekibi</p>
        </div>
        <div class="footer">
            <p>Bu e-posta, şifre değiştirme talebinize istinaden gönderilmiştir.</p>
            <p><a href="https://example.com/unsubscribe">Abonelikten çıkmak için tıklayın</a></p>
        </div>
    </div>
</body>
</html>`,
        });

    } catch {
        return false;
    }

    return true;
}