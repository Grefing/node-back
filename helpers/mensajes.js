const { transporter } = require("./nodemailer");

 const registerUserNodemailer = async (username) => {

  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
      <div style="text-align: center; padding: 30px 0; background: #f8f9fa;">
        <h1 style="color: #333; margin: 0;">🎯 Tu App</h1>
        <p style="color: #666; margin: 10px 0;">Plataforma de servicios</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <h2 style="color: #333;">¡Bienvenido, ${username}!</h2>
        <p style="color: #555; line-height: 1.6;">
          Tu cuenta ha sido creada exitosamente. Ya puedes acceder a todos nuestros servicios.
        </p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 5px 0;"><strong>Usuario:</strong> ${username}</p>
        </div>
        
        <a href="https://tu-app.com/login" 
           style="background: #007bff; color: white; padding: 12px 25px; 
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Acceder a mi cuenta
        </a>
      </div>
      
      <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
        <p>© 2024 Tu App. Todos los derechos reservados.</p>
      </div>
    </div>
  `;

    const info = await transporter.sendMail({
      from: `Bienvenido!!! <${process.env.GMAIL_USER}>`,
      to: 'wajnermantomas@gmail.com',
      subject:"🎉 ¡Bienvenido a Tu App!",
      html: htmlTemplate,
    });
  
    console.log("Message sent:", info.messageId);
  }


  module.exports = {
    registerUserNodemailer,
  }