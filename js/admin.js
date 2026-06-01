let adminPassword = "";

function unlockAdmin(){

    adminPassword =
    document
    .getElementById(
        "adminPassword"
    )
    .value;

    if(!adminPassword){

        alert(
            "Enter admin password"
        );

        return;
    }

    document
    .getElementById(
        "adminArea"
    )
    .style.display =
    "block";

    loadFixtures();
}

async function addPlayer(){

    const name =
    document
    .getElementById(
        "playerName"
    )
    .value;

    const password =
    document
    .getElementById(
        "playerPass"
    )
    .value;

    const result =
    await apiPost({

        action:
            "addPlayer",

        adminPassword,

        name,

        password

    });

    if(result.success){

        alert(
            "Player Added"
        );

    }else{

        alert(
            result.message
        );
    }
}

async function addFixture(){

    const home =
    document
    .getElementById(
        "homeTeam"
    )
    .value;

    const away =
    document
    .getElementById(
        "awayTeam"
    )
    .value;

    const kickoff =
    document
    .getElementById(
        "kickoff"
    )
    .value;

    const result =
    await apiPost({

        action:
            "addFixture",

        adminPassword,

        home,

        away,

        kickoff

    });

    if(result.success){

        alert(
            "Fixture Added"
        );

        loadFixtures();

    }else{

        alert(
            result.message
        );
    }
}

async function loadFixtures(){

    const fixtures =
    await apiGet(
        "getFixtures"
    );

    let html = "";

    fixtures.forEach(f=>{

        html += `

        <div class="card">

            <h3>

            ${f.home}
            vs
            ${f.away}

            </h3>

            <input
                type="number"
                id="home_${f.fixtureId}"
                placeholder="${f.home} score">

            <input
                type="number"
                id="away_${f.fixtureId}"
                placeholder="${f.away} score">

            <button
                onclick="saveResult(
                    ${f.fixtureId}
                )">

                Save Result

            </button>

        </div>

        `;
    });

    document
    .getElementById(
        "fixturesContainer"
    )
    .innerHTML = html;
}

async function saveResult(
    fixtureId
){

    const homeScore =
    Number(
        document
        .getElementById(
            `home_${fixtureId}`
        )
        .value
    );

    const awayScore =
    Number(
        document
        .getElementById(
            `away_${fixtureId}`
        )
        .value
    );

    const result =
    await apiPost({

        action:
            "saveResult",

        adminPassword,

        fixtureId,

        homeScore,

        awayScore

    });

    if(result.success){

        alert(
            "Result Saved"
        );

    }else{

        alert(
            result.message
        );
    }
}