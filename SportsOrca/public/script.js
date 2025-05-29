document.addEventListener('DOMContentLoaded', function() {
    fetchUpcomingMatches();
});

async function fetchUpcomingMatches() {
    try {
        const response = await fetch('/api/matches');
        
        if (!response.ok) {
            throw new Error('Failed to fetch matches');
        }
        
        const data = await response.json();
        displayMatches(data.matches);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('matches-container').innerHTML = 
            `<p class="error">Error loading matches. Please try again later.</p>`;
    }
}

function displayMatches(matches) {
    const container = document.getElementById('matches-container');
    
    if (!matches || matches.length === 0) {
        container.innerHTML = '<p>No upcoming matches found.</p>';
        return;
    }
    
    let html = '';
    matches.forEach(match => {
        const date = new Date(match.utcDate).toLocaleString();
        html += `
            <div class="match">
                <div class="teams">
                    ${match.homeTeam.name} vs ${match.awayTeam.name}
                </div>
                <div class="match-date">
                    ${date}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}