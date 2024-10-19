import nodemailer from 'nodemailer';

const sendingMail = async (to: string, link: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT as unknown as number,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      from: { name: 'VistaLook', address: process.env.SMTP_USER as unknown as string },
      to: to,
      subject: `Активація акаунту в інтернет-магазині жіночого одягу «VistaLook»`,
      text: '',
      html: `
            <table width="800px">
            <tr>
                <td>
                    <img src="https://vista-look.vercel.app/assets/logo-1YNSEaJn.png" alt="Логотип" width="100">
                </td>
                <td width="180px" style="width:180px; text-align:right"> 
                    <h2>+38 (093) 94-264-23</h2>
                </td>
            </tr>

            <tr>
                <td width="100%" colspan="2" style="border-bottom:3px solid #737373"></td>
            </tr>

            <tr>
              <td colspan="2" style="padding-bottom:25px">
                <h2>Для активації облікового запису в інтернет-магазині жіночого одягу «VistaLook» перейдіть за посиланням:</h2>
                <a href='${link}'>${link}</a>
              </td>
            </tr>

            <tr>
                <td width="100%" colspan="2" style="height:92px;border-top:1px solid #737373;">
                    <p>+38 (093) 94-264-23</p>
                </td>
            </tr>
            </table>
            `
    });
  } catch (error) {
    console.error('Error sending activation mail:', error);
  }
};

export default sendingMail;
