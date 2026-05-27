function toggleView() {
  const isPrint = document.body.classList.toggle('print-view');
  document.getElementById('toggle-label').textContent = isPrint ? 'Web View' : 'Print View';
}
function render(data) {

  // Header
  document.getElementById('full-name').innerHTML = data.name;
  document.getElementById('tagline').textContent = data.tagline || '';

  const cb = document.getElementById('contact-block');
  if (data.contact) {
	const { email, github, linkedin, location, whatsapp } = data.contact;
	cb.innerHTML = [
	  location ? `<div>${location}</div>` : '',
	  email    ? `<div><a href="mailto:${email}">${email}</a></div>` : '',
	  github   ? `<div><a href="https://${github}" target="_blank">${github}</a></div>` : '',
	  whatsapp   ? `<div><a href="https://wa.me/${whatsapp.replace(/[-\s]/g, "")}" target="_blank">${whatsapp}</a></div>` : '',
	  linkedin ? `<div><a href="https://${linkedin}" target="_blank">${linkedin}</a></div>` : ''
	].join('');
  }

  // Skills
  const ss = document.getElementById('skills-section');
  ss.innerHTML = `<div class="section-label">Skills</div>` +
	(data.skills || []).map(sg => `
	  <div class="skill-group">
		<h3>${sg.category}</h3>
		<div class="skill-tags">${sg.items.map(s => `<span class="tag">${s}</span>`).join('')}</div>
	  </div>`).join('');

  // Education
  const es = document.getElementById('education-section');
  es.innerHTML = `<div class="section-label">Education</div>` +
	(data.education || []).map(ed => `
	  <div class="edu-item">
		<h3>${ed.degree}</h3>
		<div class="meta">${ed.institution}<br>${ed.period}</div>
		<ul class="desc-list">${(ed.descriptions || []).map(d => `<li>${d}</li>`).join('')}</ul>
	  </div>`).join('');

  // Experience
  const exs = document.getElementById('experience-section');
  exs.innerHTML = `<div class="section-label">Experience</div>` +
	(data.workingExperience || []).map(exp => `
	  <div class="exp-item">
		<div class="exp-meta">
		  <div class="exp-period">
			<span class="year">${exp.yearStart || exp.period.split('–')[0].trim()}</span>
			${exp.period}
		  </div>
		</div>
		<div class="exp-body">
		  <h3>${exp.title}</h3>
		  <div class="company">${exp.company}</div>
		  <ul class="desc-list">${(exp.descriptions || []).map(d => `<li>${d}</li>`).join('')}</ul>
		</div>
	  </div>`).join('');

  // Show everything
  document.getElementById('header').style.display = '';
  document.getElementById('sidebar').style.display = '';
  document.getElementById('experience-section').style.display = '';
  document.getElementById('loading').classList.add('hidden');

  // Scroll-triggered animation for experience items
  const items = document.querySelectorAll('.exp-item');
  const io = new IntersectionObserver((entries) => {
	entries.forEach((e, i) => {
	  if (e.isIntersecting) {
		setTimeout(() => e.target.classList.add('visible'), i * 80);
		io.unobserve(e.target);
	  }
	});
  }, { threshold: 0.1 });
  items.forEach(el => io.observe(el));
}