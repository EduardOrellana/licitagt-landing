let tipo = 'empresa';

function setTipo(t) {
  tipo = t;
  document.getElementById('flds-empresa').style.display = t === 'empresa' ? 'block' : 'none';
  document.getElementById('flds-prof').style.display = t === 'profesional' ? 'block' : 'none';
  document.getElementById('tbtn-empresa').className = 'type-btn' + (t === 'empresa' ? ' on' : '');
  document.getElementById('tbtn-prof').className = 'type-btn' + (t === 'profesional' ? ' on' : '');
}

async function enviar() {
  const btn = document.getElementById('fsub');
  let err = '';

  if (tipo === 'empresa') {
    if (!document.getElementById('e-nombre').value.trim()) err = 'Falta el nombre de la empresa.';
    else if (!document.getElementById('e-contacto').value.trim()) err = 'Falta el nombre de contacto.';
    else if (!document.getElementById('e-email').value.trim()) err = 'Falta el correo.';
    else if (!document.getElementById('e-sector').value) err = 'Selecciona el sector.';
  } else {
    if (!document.getElementById('p-nombre').value.trim()) err = 'Falta tu nombre.';
    else if (!document.getElementById('p-email').value.trim()) err = 'Falta el correo.';
    else if (!document.getElementById('p-rubro').value) err = 'Selecciona tu rubro.';
  }
  if (!document.getElementById('como-hoy').value.trim()) err = 'Cuéntanos cómo manejas el proceso hoy.';

  if (err) { alert(err); return; }

  btn.disabled = true;
  btn.textContent = 'Enviando...';

  // Armar los datos según el tipo de usuario
  const data = { tipo };

  if (tipo === 'empresa') {
    data['Empresa']   = document.getElementById('e-nombre').value.trim();
    data['Contacto']  = document.getElementById('e-contacto').value.trim();
    data['email']     = document.getElementById('e-email').value.trim();
    data['Teléfono']  = document.getElementById('e-tel').value.trim();
    data['Sector']    = document.getElementById('e-sector').value;
    data['Tamaño']    = document.getElementById('e-tamano').value;
    data['Usos']      = Array.from(document.querySelectorAll('#chips-e .fchip.on')).map(c => c.textContent).join(', ');
  } else {
    data['Nombre']           = document.getElementById('p-nombre').value.trim();
    data['email']            = document.getElementById('p-email').value.trim();
    data['Teléfono']         = document.getElementById('p-tel').value.trim();
    data['Ciudad']           = document.getElementById('p-ciudad').value.trim();
    data['Rubro']            = document.getElementById('p-rubro').value;
    data['Experiencia']      = document.getElementById('p-exp').value;
    data['Tipo de trabajos'] = Array.from(document.querySelectorAll('#chips-p .fchip.on')).map(c => c.textContent).join(', ');
  }

  data['Proceso actual'] = document.getElementById('como-hoy').value.trim();
  data['Qué necesita']   = document.getElementById('debe-tener').value.trim();

  try {
    const res = await fetch('https://formspree.io/f/mnjyarby', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      document.getElementById('form-wrap').style.display = 'none';
      document.getElementById('success-wrap').style.display = 'block';
    } else {
      btn.disabled = false;
      btn.textContent = 'Quiero acceso anticipado';
      alert('Hubo un error al enviar. Intenta de nuevo.');
    }
  } catch (e) {
    btn.disabled = false;
    btn.textContent = 'Quiero acceso anticipado';
    alert('Sin conexión. Verifica tu internet e intenta de nuevo.');
  }
}

// Fade-up on scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));