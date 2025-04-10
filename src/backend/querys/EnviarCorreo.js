const nodemailer = require('nodemailer');

/**
 * Función para enviar correos electrónicos usando SMTP
 * @param {string} destinatario - Dirección de correo del destinatario
 * @param {string} titulo - Asunto del correo
 * @param {string} mensaje - Contenido del correo
 * @param {boolean} esHTML - Indica si el mensaje está en formato HTML (opcional)
 * @return {Promise<boolean>} - Promesa que resuelve a true si el envío fue exitoso, false en caso contrario
 */
function EnviarCorreo(destinatario, titulo, mensaje, esHTML = false) {
  return new Promise((resolve, reject) => {
    // Configuración del transportador de correo SMTP
    const transporter = nodemailer.createTransport({
      host: 'mail.zartero.com', // Host del servidor SMTP
      port: 465,               // Puerto para SMTP seguro (también podría ser 587 con starttls)
      secure: true,            // true para puerto 465, false para otros puertos como 587
      auth: {
        user: 'notificaciones@zartero.com',
        pass:'dyS7p3RUAUgu'
        // pass: '~9Q4R?Q4k@;m'
      },
      tls: {
        // No rechazar conexiones si el certificado es autofirmado o inválido
        rejectUnauthorized: false
      }
    });

    // Opciones del correo
    const mailOptions = {
      from: '"Sistema de Notificaciones" <notificaciones@zartero.com>',
      to: destinatario,
      subject: titulo
    };

    // Agregar el contenido del mensaje según el formato
    if (esHTML) {
      mailOptions.html = mensaje;
    } else {
      mailOptions.text = mensaje;
    }

    // Enviar correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo:', error);
        resolve(false);
      } else {
        console.log('Correo enviado exitosamente!');
        console.log('ID del mensaje:', info.messageId);
        resolve(true);
      }
    });
  });
}

/**
 * Ejemplo de cómo utilizar la función
 */
async function ejemploDeUso() {
  try {
    // Ejemplo de correo de texto plano
    const resultadoTexto = await EnviarCorreo(
      'destinatario@ejemplo.com', 
      'Título de prueba', 
      'Este es un mensaje de prueba enviado desde nuestro sistema.'
    );
    console.log(resultadoTexto ? 'Correo de texto enviado' : 'Envío de correo de texto fallido');
    
    // Ejemplo de correo HTML
    const resultadoHTML = await EnviarCorreo(
      'destinatario@ejemplo.com', 
      'Prueba de HTML', 
      '<h1>Título importante</h1><p>Este es un <b>mensaje</b> con formato <i>HTML</i>.</p>', 
      true // Indicamos que es HTML
    );
    console.log(resultadoHTML ? 'Correo HTML enviado' : 'Envío de correo HTML fallido');
  } catch (error) {
    console.error('Error en el ejemplo:', error);
  }
}

// Exportar la función para su uso en otros módulos
module.exports = { EnviarCorreo };