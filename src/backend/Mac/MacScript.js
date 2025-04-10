const os = require('os');
const { exec } = require('child_process');
const networkInterfaces = os.networkInterfaces();

function getMacWindows() {
  return new Promise((resolve, reject) => {
    exec('getmac /fo csv /nh', (error, stdout) => {
      if (error) {
        reject(new Error('Error ejecutando getmac: ' + error.message));
        return;
      }
      if (!stdout || !stdout.trim()) {
        reject(new Error('No se obtuvo salida del comando getmac'));
        return;
      }
      const macAddress = stdout.split('\n')[0].split(',')[0].replace(/"/g, '');
      if (!macAddress || !/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(macAddress)) {
        reject(new Error('MAC obtenida no tiene formato válido: ' + macAddress));
        return;
      }
      resolve(macAddress);
    });
  });
}

function getMacLinux() {
  return new Promise((resolve, reject) => {
    // Intentar primero con ip link
    exec("ip link", (error, stdout) => {
      if (!error) {
        const match = stdout.match(/ether\s+([0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2})/);
        if (match && match[1]) {
          resolve(match[1]);
          return;
        }
      }
      
      // Si ip link falla, intentar con ifconfig
      exec("ifconfig", (error2, stdout2) => {
        if (error2) {
          reject(new Error('Fallaron tanto ip link como ifconfig'));
          return;
        }
        const match = stdout2.match(/ether\s+([0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2}:[0-9A-Fa-f]{2})/);
        if (match && match[1]) {
          resolve(match[1]);
        } else {
          reject(new Error('No se encontró dirección MAC en la salida de ifconfig'));
        }
      });
    });
  });
}

function getMacFromInterfaces() {
  try {
    for (const interfaceName in networkInterfaces) {
      const interface = networkInterfaces[interfaceName];
      // Filtrar interfaces físicas (no virtuales) y activas
      const physicalInterface = interface.find(
        (addr) => 
          !addr.internal && 
          addr.mac !== '00:00:00:00:00:00' &&
          addr.mac !== '' &&
          addr.mac !== undefined
      );
      if (physicalInterface && isValidMac(physicalInterface.mac)) {
        return physicalInterface.mac;
      }
    }
    return null;
  } catch (error) {
    console.error('Error al obtener MAC de interfaces:', error);
    return null;
  }
}

function isValidMac(mac) {
  // Verificar formato MAC válido (xx:xx:xx:xx:xx:xx o xx-xx-xx-xx-xx-xx)
  return /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/i.test(mac);
}

function normalizeMac(mac) {
  if (!mac) return null;
  // Convertir a minúsculas y formato con :
  let normalized = mac.toLowerCase().replace(/[^a-f0-9]/g, ':');
  // Eliminar : extra al inicio o final
  normalized = normalized.replace(/^:|:$/g, '');
  // Verificar formato final
  return isValidMac(normalized) ? normalized : null;
}

async function getMacAddress() {
  try {
    let macAddress = null;
    let errors = [];
    
    // Primer intento: usando os.networkInterfaces()
    try {
      const macFromInterfaces = getMacFromInterfaces();
      if (macFromInterfaces) {
        console.log('Dirección MAC encontrada a través de interfaces:', macFromInterfaces);
        macAddress = macFromInterfaces;
      } else {
        errors.push('No se encontró MAC válida en interfaces de red');
      }
    } catch (e) {
      errors.push('Error al buscar en interfaces: ' + e.message);
    }

    // Si no se encontró, intentar con comandos del sistema
    if (!macAddress) {
      const platform = os.platform();
      
      try {
        if (platform === 'win32') {
          macAddress = await getMacWindows();
          console.log('Dirección MAC encontrada en Windows:', macAddress);
        } 
        else if (platform === 'linux') {
          macAddress = await getMacLinux();
          console.log('Dirección MAC encontrada en Linux:', macAddress);
        }
        else {
          errors.push('Sistema operativo no soportado: ' + platform);
        }
      } catch (e) {
        errors.push(`Error al obtener MAC en ${platform}: ${e.message}`);
      }
    }

    // Normalizar y validar la MAC final
    const normalizedMac = normalizeMac(macAddress);
    
    if (normalizedMac) {
      return {
        success: true,
        mac: normalizedMac,
        errors: errors.length > 0 ? errors : undefined
      };
    }
    
    return {
      success: false,
      mac: null,
      errors: errors
    };
    
  } catch (error) {
    return {
      success: false,
      mac: null,
      errors: ['Error crítico: ' + error.message]
    };
  }
}

// Exportar la función para uso en otros módulos
module.exports = getMacAddress;

// Si el script se ejecuta directamente, mostrar la MAC
if (require.main === module) {
  getMacAddress().then(result => {
    console.log('Resultado:', result);
    if (result.success) {
      console.log('Dirección MAC obtenida:', result.mac);
    } else {
      console.error('No se pudo obtener la MAC. Errores:', result.errors);
    }
  });
}

module.exports={getMacAddress}