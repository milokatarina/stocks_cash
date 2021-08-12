import React, {useState} from 'react';
import DSurvey from "./containers/DSurvey";
import * as api from './api';
import RSSurvey from "./containers/RSSurvey";
import Game from "./containers/Game";
import TrialGame from "./containers/TrialGame";
import RSSurvey2 from "./containers/RSSurvey2";
import {EndGame} from "./containers/EndGame";
import RegretSurvey from "./containers/RegretSurvey";

export const App = ({yearsRevenue}) => {
    console.log({yearsRevenue});
    const [screenNumber, setScreenNumber] = useState(1);
    const [playId, setPlayId] = useState(1);
    const [userId, setUserId] = useState(1);

    const onNextRSSurvey = ({rs1, rs2, rs3, rs4, rs5, rs6, rs7}) => {
        api.sendRSAnswers({
            userId, rs1, rs2, rs3, rs4, rs5, rs6, rs7
        }).then((response) => {
            setScreenNumber(screenNumber + 1);
        })
    }

    const onNextRegretSurvey = ({ks1, ks2, ks3, ks4, ks5, ks6, ks7}) => {
        api.sendKSAnswers({
            userId, ks1, ks2, ks3, ks4, ks5, ks6, ks7
        }).then((response) => {
            setScreenNumber(screenNumber + 1);
        })
    }

    const onNextRSSurvey2 = ({rs8, rs9, rs10, rs11, rs12, rs13, rs14}) => {
        api.sendRSAnswers2({
            userId, rs8, rs9, rs10, rs11, rs12, rs13, rs14
        }).then((response) => {
            setScreenNumber(screenNumber + 1);
        })
    }
    const onScreenChange = () => {
        setScreenNumber(screenNumber + 1);
    }
    switch (screenNumber) {
        // case 1:
        //     return <DSurvey onNextChange={({ds1, ds2, ds3, ds4, ds5, ds6, ds7, ds8, ds9, ds10}) => {
        //         api.initGame({
        //             ds1, ds2, ds3, ds4, ds5, ds6, ds7, ds8, ds9, ds10
        //         }).then((response) => {
        //             setScreenNumber(screenNumber + 1);
        //             setPlayId(response.data.data.playId);
        //             setUserId(response.data.data.userId);
        //         })
        //     }}/>
        // case 2:
        //     return <RSSurvey
        //         onNextChange={onNextRSSurvey}
        //     />
        // case 3:
        //     return <TrialGame
        //         yearsRevenue={yearsRevenue}
        //         userId={userId}
        //         playId={playId}
        //         onScreenChange={onScreenChange}
        //     />
        // case 4: {
        //     return <Game
        //         yearsRevenue={yearsRevenue}
        //         userId={userId}
        //         playId={playId}
        //         onScreenChange={onScreenChange}
        //     />
        // }
        // case 5: {
        //     return <RSSurvey2
        //         onNextChange={onNextRSSurvey2}
        //     />
        // }
        case 1: {
            return <RegretSurvey
                onNextChange={onNextRegretSurvey}
            />
        }
        default: {
            return <EndGame title="Kraj igre. Hvala Vam na izdvojenom vremenu. :)" onNextClick={() => {
            }} hasNextButton={false}/>
        }
    }
}
