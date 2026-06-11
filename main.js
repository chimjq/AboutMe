let profileData = null;
function loadExperience(section, workingExperienceData){
  section.innerHTML = `<div class="section-label">Experience</div>` +
	(workingExperienceData).map(exp => `
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

function loadProjects(section, demoProjectData){
  section.innerHTML = `<div class="section-label">Demo Projects</div>` +
	(demoProjectData).map(pjt => `
	  <div class="pjt-item">
		  <h3>${pjt.title}<br/>
				<div class="pjt-meta">
					<div class="pjt-meta-link">
						<a class="pjt-link" href="${pjt.githubLink}" target="_blank"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M9 18l6-6-6-6" /></svg>Preview Project</a>
					</div>
				</div>
			</h3>
		<div class="pjt-body">
		  <div class="pjt-desc">${pjt.summary}</div>
		  <div class="pjt-skill-tags">${(pjt.skills || []).map(s => `<span class="tag">${s}</span>`).join('')}</div>
		</div>
	  </div>`).join('');
	    
  // Scroll-triggered animation for experience items
  const items = document.querySelectorAll('.pjt-item');
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
function lazyLoadSection(targetId) {
	if (!profileData) return;
	if (!targetId) {
		const activeTab = document.querySelector('.tab-btn.active');
		if (activeTab) targetId = activeTab.getAttribute('data-content');
	}

	if (targetId) {
		const theSection = document.getElementById(targetId);
		if (theSection) {
			if (targetId === 'experience-section') loadExperience(theSection, profileData.workingExperience || []);
			else loadProjects(theSection, profileData.demoProject || []);
			theSection.classList.add('active');
		}
	}
}
function initNavbar() {
	const tabs = document.querySelectorAll('.tab-btn');
	const sections = document.querySelectorAll('.tab-content');

	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			// 1. Remove active class from all buttons
			tabs.forEach(t => t.classList.remove('active'));

			// 2. Remove active class from all content sections
			sections.forEach(s => s.classList.remove('active'));

			// 3. Add active class to clicked button
			tab.classList.add('active');

			// 4. Find the target section and show it
			const targetId = tab.getAttribute('data-content');
			if (targetId) lazyLoadSection(targetId);
		});
	});
	document.querySelector('.tab-nav').style.display = '';
}

function toggleView() {
  const isPrint = document.body.classList.toggle('print-view');
	document.getElementById('toggle-label').textContent = isPrint ? 'Web View' : 'Print View';
	const allSections = document.querySelectorAll('.tab-content');
  if(isPrint){
	  allSections.forEach(section => {
		  if (section.innerHTML.length > 0)
			  section.classList.add('active');
		});
  } else {
	  allSections.forEach(section => {
		  if (section.innerHTML.length > 0)
			  section.classList.remove('active');
	  });
	  lazyLoadSection();
  }
}

function render(data) {
	profileData = data;
  // Header
  document.getElementById('full-name').innerHTML = profileData.name
  document.getElementById('tagline').innerHTML = profileData.tagline || '';

  const cb = document.getElementById('contact-block');
  if (profileData.contact) {
	const { email, github, linkedin, location, whatsapp } = profileData.contact;
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
	(profileData.skills || []).map(sg => `
	  <div class="skill-group">
		<h3>${sg.category}</h3>
		<div class="skill-tags">${sg.items.map(s => `<span class="tag">${s}</span>`).join('')}</div>
	  </div>`).join('');

  // Education
  const es = document.getElementById('education-section');
  es.innerHTML = `<div class="section-label">Education</div>` +
	(profileData.education || []).map(ed => `
	  <div class="edu-item">
		<h3>${ed.degree}</h3>
		<div class="meta">${ed.institution}<br>${ed.period}</div>
		<ul class="desc-list">${(ed.descriptions || []).map(d => `<li>${d}</li>`).join('')}</ul>
	  </div>`).join('');
  
	  
  // Show everything
  document.getElementById('header').style.display = '';
  document.getElementById('sidebar').style.display = '';
	document.getElementById('loading').classList.add('hidden');
	lazyLoadSection();
}