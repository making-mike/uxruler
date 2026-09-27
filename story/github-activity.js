// Contribution counter for the hero note. The data comes from
// github-contributions-api.jogruber.de, which needs no token. Private
// contributions only count if the GitHub profile is set to show them.
(() => {
  const card = document.querySelector('[data-github-activity]');
  if (!card) return;

  const user = card.dataset.githubActivity;
  const total = card.querySelector('[data-github-activity-total]');
  const label = card.querySelector('[data-github-activity-label]');

  const showFallback = () => {
    total.textContent = 'GitHub';
    label.textContent = `See what I'm building, @${user}`;
    card.setAttribute('aria-label', `GitHub profile of ${user}`);
  };

  fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`)
    .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
    .then((data) => {
      const days = Array.isArray(data.contributions) ? data.contributions : [];
      const count = data.total && Number.isFinite(data.total.lastYear)
        ? data.total.lastYear
        : days.reduce((sum, day) => sum + (day.count || 0), 0);
      if (!days.length && !count) throw new Error('No contribution data');

      const formatted = count.toLocaleString('en-US');
      total.textContent = formatted;
      label.textContent = `Contributions in the last year, @${user}`;
      card.setAttribute('aria-label', `${formatted} GitHub contributions in the last year by ${user}`);
    })
    .catch(showFallback);
})();
