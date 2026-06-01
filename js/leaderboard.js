async function loadLeaderboard(){

    const data =
    await apiGet(
        "getLeaderboard"
    );

    let html = "";

    data.forEach(player=>{

        html += `

        <tr>

            <td>
                ${player.rank}
            </td>

            <td>
                ${player.player}
            </td>

            <td>
                ${player.points}
            </td>

        </tr>

        `;
    });

    document
        .getElementById(
            "leaderboard"
        )
        .innerHTML = html;
}

loadLeaderboard();