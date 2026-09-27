// Public contribution calendar for the hero note. The data comes from
// github-contributions-api.jogruber.de, which needs no token. Private
// contributions only count if the GitHub profile is set to show them.
(() => {
  const card = document.querySelector('[data-github-activity]');
  if (!card) return;

  const user = card.dataset.githubActivity;
  const total = card.querySelector('[data-github-activity-total]');
  const label = card.querySelector('[data-github-activity-label]');
  const graph = card.querySelector('[data-github-activity-graph]');

  // Empty calendar while the data loads, so the note keeps its size.
  graph.innerHTML = '<i></i>'.repeat(53 * 7);

  const showFallback = () => {
    card.classList.add('is-fallback');
    total.textContent = 'GitHub';
    label.textContent = `See what I'm building, @${user}`;
    card.setAttribute('aria-label', `GitHub profile of ${user}`);
  };

  const render = (days, count) => {
    // Pad the first week so every column starts on Sunday, like GitHub.
    const firstDay = new Date(`${days[0].date}T00:00:00`).getDay();
    const cells = Array.from({ length: firstDay }, () => '<i class="is-empty"></i>');
    days.forEach((day) => {
      cells.push(`<i data-level="${day.level}" title="${day.count} on ${day.date}"></i>`);
    });
    graph.innerHTML = cells.join('');
    graph.style.setProperty('--weeks', Math.ceil(cells.length / 7));

    const formatted = count.toLocaleString('en-US');
    total.textContent = formatted;
    label.textContent = `Contributions in the last year, @${user}`;
    card.setAttribute('aria-label', `${formatted} GitHub contributions in the last year by ${user}`);
    card.classList.add('is-loaded');
  };

  fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`)
    .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
    .then((data) => {
      const days = Array.isArray(data.contributions) ? data.contributions : [];
      const count = data.total && Number.isFinite(data.total.lastYear)
        ? data.total.lastYear
        : days.reduce((sum, day) => sum + (day.count || 0), 0);
      if (!days.length) throw new Error('No contribution data');
      render(days, count);
    })
    .catch(showFallback);
})();
