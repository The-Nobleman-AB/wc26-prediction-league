let playerId = null;
let playerName = "";

async function login(){

    const name =
    document
    .getElementById(
        "playerName"
    )
    .value;

    const password =
    document
    .getElementById(
        "playerPassword"
    )
    .value;

    const result =
    await apiPost({

        action:"login",

        name,

        password

    });

    if(!result.success){

        alert(
            "Invalid Login"
        );

        return;
    }

    playerId =
    result.playerId;

    playerName =
    result.playerName;

    document
    .getElementById(
        "playerInfo"
    )
    .style.display =
    "block";

    document
    .getElementById(
        "playerInfo"
    )
    .innerHTML = `

        <h2>
            Welcome ${playerName}
        </h2>

        <p>
            Submit or update your predictions.
        </p>

    `;

    loadFixtures();
}

async function loadFixtures(){

    const fixtures =
    await apiGet(
        "getFixtures"
    );

    let html = "";

    if(fixtures.length === 0){

        html = `

        <div class="card">

            <h2>
                No Open Fixtures
            </h2>

        </div>

        `;

    } else {

        fixtures.forEach(f=>{

            html += `

            <div class="card">

                <h2>

                    ${f.home}
                    vs
                    ${f.away}

                </h2>

                <p>

                    Kickoff:
                    ${f.kickoff}

                </p>

                <label>

                    ${f.home}

                </label>

                <input
                    type="number"
                    min="0"
                    id="home_${f.fixtureId}">

                <label>

                    ${f.away}

                </label>

                <input
                    type="number"
                    min="0"
                    id="away_${f.fixtureId}">

                <button

                    onclick="submitPrediction(
                        ${f.fixtureId}
                    )">

                    Save Prediction

                </button>

            </div>

            `;
        });
    }

    document
    .getElementById(
        "fixturesContainer"
    )
    .innerHTML = html;

    document
    .getElementById(
        "fixturesContainer"
    )
    .style.display =
    "block";
}

async function submitPrediction(
    fixtureId
){

    const homePred =
    Number(
        document
        .getElementById(
            `home_${fixtureId}`
        ).value
    );

    const awayPred =
    Number(
        document
        .getElementById(
            `away_${fixtureId}`
        ).value
    );

    if(
        isNaN(homePred) ||
        isNaN(awayPred)
    ){

        alert(
            "Enter both scores"
        );

        return;
    }

    const result =
    await apiPost({

        action:
            "submitPrediction",

        playerId,

        fixtureId,

        homePred,

        awayPred

    });

    if(result.success){

        alert(
            result.message ||
            "Prediction Saved"
        );

    } else {

        alert(
            result.message
        );
    }
}